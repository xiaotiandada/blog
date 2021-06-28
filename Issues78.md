[解析 snabbdom 源码，教你实现精简的 Virtual DOM 库](https://github.com/creeperyang/blog/issues/33)

[snabbdom 源码阅读分析](https://juejin.cn/post/6844903671906435080#heading-1)

https://juejin.cn/post/6844903831717806087

https://gzg.me/posts/2021/snabbdom_source/

https://www.cnblogs.com/xuntu/p/6800547.html

>通常情况下，找到两棵任意的树之间最小修改的时间复杂度是 **O(n^3)**，这不可接受。幸好，我们可以对 Virtual DOM 树有这样的假设：
>
>如果 oldVnode 和 vnode 不同（如 type 从 `div` 变到 `p`，或者 `key` 改变），意味着整个 vnode 被替换（因为我们通常不会去跨层移动 vnode ），所以我们没有必要去比较 vnode 的 子 vnode（children） 了。基于这个假设，我们可以 **按照层级分解** 树，这大大简化了复杂度，大到接近 **O(n)** 的复杂度：
>
>![](https://user-images.githubusercontent.com/8046480/27190439-0a875688-5227-11e7-9015-eb34142de8ce.png)
>
>此外，对于 children （数组）的比较，因为同层是很可能有移动的，顺
>序比较会无法最大化复用已有的 DOM。所以我们通过为每个 vnode 加上 key 来追踪这种顺序变动。
>
>![](https://user-images.githubusercontent.com/8046480/27191679-28085118-522b-11e7-92e9-fa0ed047f7cd.png)
>
>



>- 用 js 对象来描述 dom 树结构，然后用这个 js 对象来创建一棵真正的 dom 树，插入到文档中
>- 当状态更新时，将新的 js 对象和旧的 js 对象进行比较，得到两个对象之间的差异
>- 将差异应用到真正的 dom 上



### vnode

```typescript
// https://github.com/snabbdom/snabbdom/blob/master/src/vnode.ts
// ...
export type Key = string | number | symbol;

export interface VNode {
  sel: string | undefined;
  data: VNodeData | undefined;
  children: Array<VNode | string> | undefined;
  elm: Node | undefined;
  text: string | undefined;
  key: Key | undefined;
}

export interface VNodeData {
  props?: Props;
  attrs?: Attrs;
  class?: Classes;
  style?: VNodeStyle;
  dataset?: Dataset;
  on?: On;
  attachData?: AttachData;
  hook?: Hooks;
  key?: Key;
  ns?: string; // for SVGs
  fn?: () => VNode; // for thunks
  args?: any[]; // for thunks
  is?: string; // for custom elements v1
  [key: string]: any; // for any other 3rd party module
}

export function vnode(
  sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | Text | undefined
): VNode {
  const key = data === undefined ? undefined : data.key;
  return { sel, data, children, text, elm, key };
}
```

### init

```typescript
// https://github.com/snabbdom/snabbdom/blob/master/src/init.ts
import { Module } from "./modules/module";
import { vnode, VNode } from "./vnode";
import * as is from "./is";
import { htmlDomApi, DOMAPI } from "./htmldomapi";

type NonUndefined<T> = T extends undefined ? never : T;

function isUndef(s: any): boolean {
  return s === undefined;
}
function isDef<A>(s: A): s is NonUndefined<A> {
  return s !== undefined;
}

type VNodeQueue = VNode[];

const emptyNode = vnode("", {}, [], undefined, undefined);

function sameVnode(vnode1: VNode, vnode2: VNode): boolean {
  const isSameKey = vnode1.key === vnode2.key;
  const isSameIs = vnode1.data?.is === vnode2.data?.is;
  const isSameSel = vnode1.sel === vnode2.sel;

  return isSameSel && isSameKey && isSameIs;
}

function isVnode(vnode: any): vnode is VNode {
  return vnode.sel !== undefined;
}

type KeyToIndexMap = { [key: string]: number };

type ArraysOf<T> = {
  [K in keyof T]: Array<T[K]>;
};

type ModuleHooks = ArraysOf<Required<Module>>;

function createKeyToOldIdx(
  children: VNode[],
  beginIdx: number,
  endIdx: number
): KeyToIndexMap {
  const map: KeyToIndexMap = {};
  for (let i = beginIdx; i <= endIdx; ++i) {
    const key = children[i]?.key;
    if (key !== undefined) {
      map[key as string] = i;
    }
  }
  return map;
}

const hooks: Array<keyof Module> = [
  "create",
  "update",
  "remove",
  "destroy",
  "pre",
  "post",
];

export function init(modules: Array<Partial<Module>>, domApi?: DOMAPI) {
  let i: number;
  let j: number;
  // 收集 module in the hook
  const cbs: ModuleHooks = {
    create: [],
    update: [],
    remove: [],
    destroy: [],
    pre: [],
    post: [],
  };
	
  // 如果没有传递 domApi 使用浏览器中和 dom 相关的 api 
  // https://github.com/snabbdom/snabbdom/blob/master/src/htmldomapi.ts
  const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi;
	
  // 收集 module in the hook
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      const hook = modules[j][hooks[i]];
      if (hook !== undefined) {
        (cbs[hooks[i]] as any[]).push(hook);
      }
    }
  }

  function emptyNodeAt(elm: Element) {
    const id = elm.id ? "#" + elm.id : "";

    // elm.className doesn't return a string when elm is an SVG element inside a shadowRoot.
    // https://stackoverflow.com/questions/29454340/detecting-classname-of-svganimatedstring
    // weex https://github.com/vuejs/vue/blob/dev/src/platforms/weex/runtime/node-ops.js
    const classes = elm.getAttribute("class");

    const c = classes ? "." + classes.split(" ").join(".") : "";
    return vnode(
      api.tagName(elm).toLowerCase() + id + c,
      {},
      [],
      undefined,
      elm
    );
  }

  function createRmCb(childElm: Node, listeners: number) {
    return function rmCb() {
      if (--listeners === 0) {
        const parent = api.parentNode(childElm) as Node;
        api.removeChild(parent, childElm);
      }
    };
  }

  function createElm(vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
    let i: any;
    let data = vnode.data;
    if (data !== undefined) {
      const init = data.hook?.init;
      if (isDef(init)) {
        init(vnode);
        data = vnode.data;
      }
    }
    const children = vnode.children;
    const sel = vnode.sel;
    if (sel === "!") {
      if (isUndef(vnode.text)) {
        vnode.text = "";
      }
      vnode.elm = api.createComment(vnode.text!);
    } else if (sel !== undefined) {
      // Parse selector
      const hashIdx = sel.indexOf("#");
      const dotIdx = sel.indexOf(".", hashIdx);
      const hash = hashIdx > 0 ? hashIdx : sel.length;
      const dot = dotIdx > 0 ? dotIdx : sel.length;
      const tag =
        hashIdx !== -1 || dotIdx !== -1
          ? sel.slice(0, Math.min(hash, dot))
          : sel;
      const elm = (vnode.elm =
        isDef(data) && isDef((i = data.ns))
          ? api.createElementNS(i, tag, data)
          : api.createElement(tag, data));
      if (hash < dot) elm.setAttribute("id", sel.slice(hash + 1, dot));
      if (dotIdx > 0)
        elm.setAttribute("class", sel.slice(dot + 1).replace(/\./g, " "));
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
      if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
          const ch = children[i];
          if (ch != null) {
            api.appendChild(elm, createElm(ch as VNode, insertedVnodeQueue));
          }
        }
      } else if (is.primitive(vnode.text)) {
        api.appendChild(elm, api.createTextNode(vnode.text));
      }
      const hook = vnode.data!.hook;
      if (isDef(hook)) {
        hook.create?.(emptyNode, vnode);
        if (hook.insert) {
          insertedVnodeQueue.push(vnode);
        }
      }
    } else {
      vnode.elm = api.createTextNode(vnode.text!);
    }
    return vnode.elm;
  }

  function addVnodes(
    parentElm: Node,
    before: Node | null,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number,
    insertedVnodeQueue: VNodeQueue
  ) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx];
      if (ch != null) {
        api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
      }
    }
  }

  function invokeDestroyHook(vnode: VNode) {
    const data = vnode.data;
    if (data !== undefined) {
      data?.hook?.destroy?.(vnode);
      for (let i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
      if (vnode.children !== undefined) {
        for (let j = 0; j < vnode.children.length; ++j) {
          const child = vnode.children[j];
          if (child != null && typeof child !== "string") {
            invokeDestroyHook(child);
          }
        }
      }
    }
  }

  function removeVnodes(
    parentElm: Node,
    vnodes: VNode[],
    startIdx: number,
    endIdx: number
  ): void {
    for (; startIdx <= endIdx; ++startIdx) {
      let listeners: number;
      let rm: () => void;
      const ch = vnodes[startIdx];
      if (ch != null) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch);
          listeners = cbs.remove.length + 1;
          rm = createRmCb(ch.elm!, listeners);
          for (let i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
          const removeHook = ch?.data?.hook?.remove;
          if (isDef(removeHook)) {
            removeHook(ch, rm);
          } else {
            rm();
          }
        } else {
          // Text node
          api.removeChild(parentElm, ch.elm!);
        }
      }
    }
  }

  function updateChildren(
    parentElm: Node,
    oldCh: VNode[],
    newCh: VNode[],
    insertedVnodeQueue: VNodeQueue
  ) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx: KeyToIndexMap | undefined;
    let idxInOld: number;
    let elmToMove: VNode;
    let before: any;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (oldStartVnode == null) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx];
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(
          parentElm,
          oldStartVnode.elm!,
          api.nextSibling(oldEndVnode.elm!)
        );
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = oldKeyToIdx[newStartVnode.key as string];
        if (isUndef(idxInOld)) {
          // New element
          api.insertBefore(
            parentElm,
            createElm(newStartVnode, insertedVnodeQueue),
            oldStartVnode.elm!
          );
        } else {
          elmToMove = oldCh[idxInOld];
          if (elmToMove.sel !== newStartVnode.sel) {
            api.insertBefore(
              parentElm,
              createElm(newStartVnode, insertedVnodeQueue),
              oldStartVnode.elm!
            );
          } else {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined as any;
            api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
        addVnodes(
          parentElm,
          before,
          newCh,
          newStartIdx,
          newEndIdx,
          insertedVnodeQueue
        );
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
  }

  function patchVnode(
    oldVnode: VNode,
    vnode: VNode,
    insertedVnodeQueue: VNodeQueue
  ) {
    const hook = vnode.data?.hook;
    hook?.prepatch?.(oldVnode, vnode);
    const elm = (vnode.elm = oldVnode.elm)!;
    const oldCh = oldVnode.children as VNode[];
    const ch = vnode.children as VNode[];
    if (oldVnode === vnode) return;
    if (vnode.data !== undefined) {
      for (let i = 0; i < cbs.update.length; ++i)
        cbs.update[i](oldVnode, vnode);
      vnode.data.hook?.update?.(oldVnode, vnode);
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) api.setTextContent(elm, "");
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        api.setTextContent(elm, "");
      }
    } else if (oldVnode.text !== vnode.text) {
      if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
      api.setTextContent(elm, vnode.text!);
    }
    hook?.postpatch?.(oldVnode, vnode);
  }

  return function patch(oldVnode: VNode | Element, vnode: VNode): VNode {
    let i: number, elm: Node, parent: Node;
    const insertedVnodeQueue: VNodeQueue = [];
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

    if (!isVnode(oldVnode)) {
      oldVnode = emptyNodeAt(oldVnode);
    }

    if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    } else {
      elm = oldVnode.elm!;
      parent = api.parentNode(elm) as Node;

      createElm(vnode, insertedVnodeQueue);

      if (parent !== null) {
        api.insertBefore(parent, vnode.elm!, api.nextSibling(elm));
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }

    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i]);
    }
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    return vnode;
  };
}

```

### h

```typescript
import { vnode, VNode, VNodeData } from "./vnode";
import * as is from "./is";

export type VNodes = VNode[];
export type VNodeChildElement = VNode | string | number | undefined | null;
export type ArrayOrElement<T> = T | T[];
export type VNodeChildren = ArrayOrElement<VNodeChildElement>;

function addNS(
  data: any,
  children: VNodes | undefined,
  sel: string | undefined
): void {
  data.ns = "http://www.w3.org/2000/svg";
  if (sel !== "foreignObject" && children !== undefined) {
    for (let i = 0; i < children.length; ++i) {
      const childData = children[i].data;
      if (childData !== undefined) {
        addNS(childData, children[i].children as VNodes, children[i].sel);
      }
    }
  }
}

export function h(sel: string): VNode;
export function h(sel: string, data: VNodeData | null): VNode;
export function h(sel: string, children: VNodeChildren): VNode;
export function h(
  sel: string,
  data: VNodeData | null,
  children: VNodeChildren
): VNode;
export function h(sel: any, b?: any, c?: any): VNode {
  let data: VNodeData = {};
  let children: any;
  let text: any;
  let i: number;
  // c 不为空 可能是 [] / string
  if (c !== undefined) {
    // b 不为空 有 {} options (认为是 VNodeData)
    if (b !== null) {
      data = b;
    }
    // 如果 c 是 []
    if (is.array(c)) {
      children = c;
    } else if (is.primitive(c)) { // c 是 string / number 应该认为是 text node
      text = c;
    } else if (c && c.sel) { // TODO: 应该是 h 拥有 sel, 然后认为是 [ c ]
      children = [c];
    }
  } else if (b !== undefined && b !== null) { // 如果是 b 不为空
    // 如果是 array 说明是 VNodeChildren
    if (is.array(b)) {
      children = b;
    } else if (is.primitive(b)) { // 如果是 string/number 应该认为是 text node
      text = b;
    } else if (b && b.sel) { // TODO: 应该是 h 拥有 sel, 然后认为是 [ b ]
      children = [b];
    } else { // 认为 b 是 VNodeData
      data = b;
    }
  }
  // 如果存在 children
  if (children !== undefined) {
    for (i = 0; i < children.length; ++i) {
      // 如果每个 children 是 string/number 转换成 vnode
      if (is.primitive(children[i]))
        children[i] = vnode(
          undefined,
          undefined,
          undefined,
          children[i],
          undefined
        );
    }
  }
  // 如果是 svg 添加 namespace
  if (
    sel[0] === "s" &&
    sel[1] === "v" &&
    sel[2] === "g" &&
    (sel.length === 3 || sel[3] === "." || sel[3] === "#")
  ) {
    addNS(data, children, sel);
  }
  return vnode(sel, data, children, text, undefined);
}
```

### patch

```typescript
// 调用 init 返回 patch  

  function emptyNodeAt(elm: Element) {
    const id = elm.id ? "#" + elm.id : "";

    // elm.className doesn't return a string when elm is an SVG element inside a shadowRoot.
    // https://stackoverflow.com/questions/29454340/detecting-classname-of-svganimatedstring
    const classes = elm.getAttribute("class");

    const c = classes ? "." + classes.split(" ").join(".") : "";
    // document.querySelector('div').tagName => DIV
    // div#id.classa.classb / div#id / div.class / div
    return vnode(
      api.tagName(elm).toLowerCase() + id + c,
      {},
      [],
      undefined,
      elm
    );
  }

return function patch(oldVnode: VNode | Element, vnode: VNode): VNode {
    let i: number, elm: Node, parent: Node;
    const insertedVnodeQueue: VNodeQueue = [];
	  // 调用 module 中的 pre hook 
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();
		
	  // 如果 oldVnode 是 Element 转换为空的 vnode
    if (!isVnode(oldVnode)) {
      oldVnode = emptyNodeAt(oldVnode);
    }
			
   	// > 如果相同，调用 patchVnode，如果不相同，会调用 createElm 来创建一个新的 dom 节点，然后如果存在父节点，便将其插入到 dom 上，然后移除旧的 dom 节点来完成更新。
  
	  // oldVnode vnode sel key is 相同
    if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    } else {
      elm = oldVnode.elm!;
      // ele parentNode
      parent = api.parentNode(elm) as Node;
			// 创建
      createElm(vnode, insertedVnodeQueue);
			
      // 有父节点
      if (parent !== null) {
        // insert dom
        api.insertBefore(parent, vnode.elm!, api.nextSibling(elm));
        // remove vnode
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }
		
  // 调用元素上的 insert hook，insert  hook 在 module 上不支持
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i]);
    }
	  // 调用 module post hook
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    return vnode;
  };
```

>The following hooks are available for modules: `pre`, `create`, `update`, `destroy`, `remove`, `post`
>
>The following hooks are available in the `hook` property of individual elements: `init`, `create`, `insert`, `prepatch`, `update`, `postpatch`, `destroy`, `remove`.

### createElm

```typescript
  function createElm(vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
    let i: any;
    let data = vnode.data;
    // 调用元素的 init hook
    if (data !== undefined) {
      const init = data.hook?.init;
      if (isDef(init)) {
        init(vnode);
        data = vnode.data;
      }
    }
    const children = vnode.children;
    
    // 创建注释节点
    const sel = vnode.sel;
    if (sel === "!") {
      if (isUndef(vnode.text)) {
        vnode.text = "";
      }
      vnode.elm = api.createComment(vnode.text!);
    } else if (sel !== undefined) {
      // Parse selector
      const hashIdx = sel.indexOf("#");
      const dotIdx = sel.indexOf(".", hashIdx);
      // div#box
      const hash = hashIdx > 0 ? hashIdx : sel.length;
      // div.boxclass
      const dot = dotIdx > 0 ? dotIdx : sel.length;
      const tag =
        hashIdx !== -1 || dotIdx !== -1
          ? sel.slice(0, Math.min(hash, dot))
          : sel;
      const elm = (vnode.elm =
        isDef(data) && isDef((i = data.ns))
          ? api.createElementNS(i, tag, data)
          : api.createElement(tag, data));
      if (hash < dot) elm.setAttribute("id", sel.slice(hash + 1, dot));
      if (dotIdx > 0)
        elm.setAttribute("class", sel.slice(dot + 1).replace(/\./g, " "));
      // 调用 module 的 create hook
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
      // 挂在子节点
      if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
          const ch = children[i];
          if (ch != null) {
            api.appendChild(elm, createElm(ch as VNode, insertedVnodeQueue));
          }
        }
      } else if (is.primitive(vnode.text)) {
        // 插入 文本节点
        api.appendChild(elm, api.createTextNode(vnode.text));
      }
      // 执行 vnode data hook
      const hook = vnode.data!.hook;
      if (isDef(hook)) {
        // 执行 hook create
        hook.create?.(emptyNode, vnode);
        if (hook.insert) {
          // insert hook 存储起来 等 dom 插入后才会调用，这里用个数组来保存能避免调用时再次对 vnode 树做遍历
          insertedVnodeQueue.push(vnode);
        }
      }
    } else {
      // 文本节点
      vnode.elm = api.createTextNode(vnode.text!);
    }
    return vnode.elm;
  }
```



### patchVnode

```typescript
function patchVnode(
    oldVnode: VNode,
    vnode: VNode,
    insertedVnodeQueue: VNodeQueue
  ) {
    const hook = vnode.data?.hook;
    // 执行 prepatch hook
    hook?.prepatch?.(oldVnode, vnode);
    const elm = (vnode.elm = oldVnode.elm)!;
    const oldCh = oldVnode.children as VNode[];
    const ch = vnode.children as VNode[];
     // 新 旧 vnode 相同
    if (oldVnode === vnode) return;
    // 执行 cbs update hook，vnode update hook
    if (vnode.data !== undefined) {
      for (let i = 0; i < cbs.update.length; ++i)
        cbs.update[i](oldVnode, vnode);
      vnode.data.hook?.update?.(oldVnode, vnode);
    }
    // 是没有定义的
    if (isUndef(vnode.text)) {
      // 均存在 children 且不相同，调用 updateChildren
    
      // 定义过 children
      if (isDef(oldCh) && isDef(ch)) {
        // old children 不等于 new children
        // 更新 updateChildren
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      } else if (isDef(ch)) { // 只定义了 new children
        // 新 vnode 存在 children，旧 vnode 不存在 children，如果旧 vnode 存在 text 先清空，然后调用 addVnodes
        
        // 如果是 text，设置内容
        if (isDef(oldVnode.text)) api.setTextContent(elm, "");
        // 添加 vnode
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) { // 只定义 old children
        // 新 vnode 不存在 children，旧 vnode 存在 children，调用 removeVnodes 移除 children
        
        // 移除 vnode
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) { // 只定义了 old vnode text
        // 设置内容
        api.setTextContent(elm, "");
      }
    } else if (oldVnode.text !== vnode.text) { // old vnode text 和 new vnode text 不一样
      // 均不存在 children，新 vnode 不存在 text，移除旧 vnode 的 text
      
      // 如果定义了 old children
      if (isDef(oldCh)) {
        // 移除
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
      // 均存在 text，更新 text
      
      // 设置新内容
      api.setTextContent(elm, vnode.text!);
    }
    // 执行 postpatch hook
    hook?.postpatch?.(oldVnode, vnode);
  }
```

### updateChildren

```typescript
  function updateChildren(
    parentElm: Node,
    oldCh: VNode[],
    newCh: VNode[],
    insertedVnodeQueue: VNodeQueue
  ) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx: KeyToIndexMap | undefined;
    let idxInOld: number;
    let elmToMove: VNode;
    let before: any;

    // old 0 - 9    new 0 - 8
    // 9 8 7 6 5 4 3 2 1 0
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      // 
      if (oldStartVnode == null) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx];
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(
          parentElm,
          oldStartVnode.elm!,
          api.nextSibling(oldEndVnode.elm!)
        );
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInOld = oldKeyToIdx[newStartVnode.key as string];
        if (isUndef(idxInOld)) {
          // New element
          api.insertBefore(
            parentElm,
            createElm(newStartVnode, insertedVnodeQueue),
            oldStartVnode.elm!
          );
        } else {
          elmToMove = oldCh[idxInOld];
          if (elmToMove.sel !== newStartVnode.sel) {
            api.insertBefore(
              parentElm,
              createElm(newStartVnode, insertedVnodeQueue),
              oldStartVnode.elm!
            );
          } else {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined as any;
            api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
        addVnodes(
          parentElm,
          before,
          newCh,
          newStartIdx,
          newEndIdx,
          insertedVnodeQueue
        );
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
  }
```

