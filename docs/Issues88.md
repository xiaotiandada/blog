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