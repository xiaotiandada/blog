- https://github.com/peng-yin/note/issues/55

> 1. 将完全不相关的 state 拆分为多组 state。
> 2. 如果某些 state 是相互关联的，或者需要一起发生改变，就可以把它们合并为一组 state。
> 3. 依赖数组依赖的值最好不要超过 3 个，否则会导致代码会难以维护。
> 4. 如果发现依赖数组依赖的值过多，应该采取一些方法来减少它。
>
> - 去掉不必要的依赖。
> - 将 Hook 拆分为更小的单元，每个 Hook 依赖于各自的依赖数组。
> - 通过合并相关的 state，将多个依赖值聚合为一个。
> - 通过 setState 回调函数获取最新的 state，以减少外部依赖。
> - 通过 ref 来读取可变变量的值，不过需要注意控制修改它的途径。
>
> 1. 应该使用 useMemo 的场景：
>
> - 保持引用相等
> - 成本很高的计算
>
> 1. 无需使用 useMemo 的场景：
>
> - 如果返回的值是原始值： string, boolean, null, undefined, number, symbol（不包括动态声明的 Symbol），一般不需要使用 useMemo。
> - 仅在组件内部用到的 object、array、函数等（没有作为 props 传递给子组件），且没有用到其他 Hook 的依赖数组中，一般不需要使用 useMemo。
>
> 1. Hooks、Render Props 和高阶组件都有各自的使用场景，具体使用哪一种要看实际情况。
> 2. 若 Hook 类型相同，且依赖数组一致时，应该合并成一个 Hook。
> 3. 自定义 Hooks 的返回值可以使用 Tuple 类型，更易于在外部重命名。如果返回的值过多，则不建议使用。
> 4. ref 不要直接暴露给外部使用，而是提供一个修改值的方法。
> 5. 在使用 useMemo 或者 useCallback 时，可以借助 ref 或者 setState callback，确保返回的函数只创建一次。也就是说，函数不会根据依赖数组的变化而二次创建。



---



- https://segmentfault.com/a/1190000021057476
- https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e
- https://zhuanlan.zhihu.com/p/48293710
- https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/

```tsx
import { useEffect, useState } from "react";
import { render } from "react-dom";

let _state: any;
let _deps: any;
let memorizedState: any[] = [];
let cursor: number = 0;

function useStateCustom(initialValue: any) {
  _state = _state || initialValue;
  function setState(newState: any) {
    console.log("setState", newState);
    _state = newState;
    renderFn();
  }
  return [_state, setState];
}

function useStateCustomMemo(initialValue: any) {
  memorizedState[cursor] = memorizedState[cursor] || initialValue;
  const currentCursor = cursor;
  function setState(newState: any) {
    // console.log("setState memo", newState, currentCursor, memorizedState);
    memorizedState[currentCursor] = newState;
    renderFn();
  }

  return [memorizedState[cursor++], setState];
}

function useEffectCustom(callback: Function, depArray: any[]) {
  const hasNoDeps = !depArray; // not dependencies
  const hasChangeDeps = _deps
    ? !depArray.every((el, i) => el === _deps[i])
    : true; // 两次的 dependencies 是否完全相等
  if (hasNoDeps || hasChangeDeps) {
    callback();
    _deps = depArray;
  }
}

function useEffectCustomMemo(callback: Function, depArray: any[]) {
  const hasNoDeps = !depArray;
  const deps = memorizedState[cursor];
  const hasChangeDeps = deps
    ? !depArray.every((el, i) => el === deps[i])
    : true;

  if (hasNoDeps || hasChangeDeps) {
    callback();
    memorizedState[cursor] = depArray;
  }

  cursor++;
}

export default function App() {
  const [count, setCount] = useStateCustom(0);
  const [count1, setCount1] = useState(0);

  const [countMemo, setCountMemo] = useStateCustomMemo(0);
  const [countMemo1, setCountMemo1] = useStateCustomMemo(0);

  // useEffect(() => {
  //   console.log("test useCallback");
  // }, []);

  // useEffectCustom(() => {
  //   console.log("useEffectCustom");
  // }, []);

  // useEffectCustom(() => {
  //   console.log("useEffectCustom count");
  // }, [count]);

  useEffectCustomMemo(() => {
    console.log("useEffectCustom countMemo");
  }, [countMemo]);

  useEffectCustomMemo(() => {
    console.log("useEffectCustom countMemo1");
  }, [countMemo1]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <span>custom: {count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
      <hr />
      <span>custom memo: {countMemo}</span>
      <button onClick={() => setCountMemo(countMemo + 1)}>+</button>
      <span>custom memo: {countMemo1}</span>
      <button onClick={() => setCountMemo1(countMemo1 + 1)}>+</button>
      <hr />
      <span>default: {count1}</span>
      <button onClick={() => setCount1(count1 + 1)}>+</button>
    </div>
  );
}

const rootElement = document.getElementById("root");

function renderFn() {
  cursor = 0;
  render(<App />, rootElement);
}

renderFn();
```

https://codesandbox.io/s/react-hooks-ytbtb?file=/src/index.tsx

依靠 memorizedState 数组来存放数据