## `React.memo`

```react
const MyComponent = React.memo(function MyComponent(props) {
  /* 使用 props 渲染 */
});
```

https://zh-hans.reactjs.org/docs/react-api.html#reactmemo

>如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 `React.memo` 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。
>
>`React.memo` 仅检查 props 变更。如果函数组件被 `React.memo` 包裹，且其实现中拥有 [`useState`](https://zh-hans.reactjs.org/docs/hooks-state.html)，[`useReducer`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer) 或 [`useContext`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext) 的 Hook，当 state 或 context 发生变化时，它仍会重新渲染。
>
>...

[demo](https://codesandbox.io/s/react-memo-qknj7?file=/src/App.tsx) 代码都在这儿



### 默认情况

```tsx
console.log("App Parent");

const [time, setTime] = useState<string>("");
const [time1, setTime1] = useState<string>("");

<div>
  <div>Parent</div>
  <ul>
    <li>time: {time}</li>
    <li>time1: {time1}</li>
  </ul>
  <button onClick={() => setTime("1111")}>toggle</button>
  <button onClick={() => setTime1(String(Date.now()))}>toggle1</button>
  <button onClick={() => setTime1("0000000000")}>toggle1</button>
</div>
```

1. 默认执行 输出 ``App Parent`` 一次
2. 组件内 useState 变动则会重新渲染一次



### 默认组件 在组件内

```tsx
  const child1: React.FC = () => {
    console.log("child1");
    return (
      <div>
        <div>child1</div>
        <button onClick={() => setTime1("child1")}>toggle</button>
        <button onClick={() => setTime1(String(Date.now()))}>toggle</button>
      </div>
    );
  };
```

1. 父组件渲染一次 child1 也渲染一次
2. 父组件 useState 改动 父组件和 child1 渲染一次
3. child1 组件 useState 改动 父组件和 child1 渲染一次



### 默认组件 使用方式

```tsx
<div>{Child1()}</div>
<Child2 />
```

```
App Parent 
Child1 
Child2 

App Parent 
Child1 
```

1. 表现基本与上面一致
2. 第一次 都渲染，后面 修改相同 useState 执行 Child1，修改不相同 useState 执行  Child1 Child2



### Memo 在组件内

```tsx
const Child3: React.FC = React.memo(function Child3() {
  console.log("Child3");
  return (
    <div>
      <div>Child2</div>
      <div>{time}</div>
      <div>{time1}</div>
    </div>
  );
});
```

1. 无效 表现和默认一致



### 在组件内 无依赖 修改 useState

```tsx
  const Child4: React.FC = () => {
    console.log("Child4");
    const [state, setstate] = useState("");

    return (
      <div>
        <div>{state}</div>
        <button onClick={() => setstate(String(Date.now()))}>toggle</button>
      </div>
    );
  };
```

1. 只渲染当前组件

### 在组件外 默认组件 无依赖

```tsx
const Outer1 = () => {
  console.log("Outer1");
  return <div>Outer1</div>;
};
```

1. 表现和默认一致

```
App Parent 
Outer1 
```



### 在组件外 Momo 无依赖

```tsx
const Outer2 = React.memo(function Outer2() {
  console.log("Outer2");
  return <div>Outer2</div>;
});
```

```

App Parent 
Outer1 
Outer2 
App Parent 
Outer1
App Parent 
Outer1 
```

1. 只会渲染一次 父级 useState 改变不受影响

### 在组件外 Memo useState 依赖

```tsx
const Outer3: React.FC<{ time1: string }> = React.memo(function Outer3({
  time1
}) {
  console.log("Outer3 time1", time1);
  return <div>Outer3 {time1}</div>;
});
```

```

App Parent 
Outer1 
Outer2 
Outer3 time1 "" 
App Parent 
Outer1 
Outer3 time1 1630983888577 
App Parent 
Outer1 
Outer3 time1 1630983892146 
```

1. 默认执行一次
2. 依赖外 useState 变动不渲染
3. 依赖 useState 变动渲染一次

### 在组件外 Memo useState 依赖 ， 内部拥有 useState

```tsx
const Outer4: React.FC<{ time1: string }> = React.memo(function Outer4({
  time1
}) {
  const [state, setstate] = useState("");

  console.log("Outer4");
  return (
    <div>
      <div>Outer4 state {state}</div>
      <div>Outer4 time1 {time1}</div>
      <button onClick={() => setstate(String(Date.now()))}>Toggle</button>
    </div>
  );
});
```

```
App Parent 
Outer1 
Outer2 
Outer3 time1 "" 
Outer4 
App Parent 
Outer1 
App Parent 
Outer1 
Outer3 time1 1630984999782 
Outer4 
Outer4 
```

1. 同上
2. 内部 useState 变动渲染一次

### 在组件外 Memo function 依赖 (在父级组件内定义)

```tsx
const Outer5: React.FC<{ fn: () => void }> = React.memo(function Outer5({
  fn
}) {
  const [state, setstate] = useState("");

  console.log("Outer5");
  return (
    <div>
      <div>Outer5 state {state}</div>
      <button onClick={() => setstate(String(Date.now()))}>Toggle</button>
      <button onClick={() => fn()}>Fn</button>
    </div>
  );
});

const Outer4Fn = () => {
  console.log("Outer4Fn");
};
```

```

App Parent 
Outer1 
Outer2 
Outer3 time1 "" 
Outer4 
Outer5 

App Parent 
Outer1 
Outer5 

App Parent 
Outer1 
Outer3 time1 1630985278410 
Outer4 
Outer5 

App Parent 
Outer1 
Outer3 time1 1630985281298 
Outer4 
Outer5 

Outer4Fn 
Outer4Fn 
```

1. 默认渲染一次
2. 修改父级组件 useState 渲染一次
3. 执行 fn 不渲染

应该是父级渲染导致方法重新更新/定义返回了新的方法 导致渲染（这里是猜测 但是大概应该就是这样），解决这个问题需要用 useCallback 包裹方法即可, 在依赖没有变动的情况下返回相同的方法

```tsx
const Outer4FnCallback = useCallback(() => {
  console.log("Outer4FnCallback");
}, []);
```

### 在组件外 Memo 变量依赖(在父级组件内定义)

```tsx
const Outer6V = "var";
const Outer6V = [1,2,3]


const Outer6: React.FC<{ v: string }> = React.memo(function Outer6({ v }) {
  console.log("Outer6", v);
  return (
    <div>
      <div>Outer6 {v}</div>
    </div>
  );
});
```

1. 字符变量 和默认 Memo 无依赖表现一致
2. 数组/对象 每次父组件更新会重新渲染，返回了新的引用

如果想定义对象变量又不想触发重新渲染用 useMemo包裹即可

```tsx
const Outer6V = useMemo(() => {
	return { a: 1 };
}, []);
```



### 在组件外 Memo 无依赖 调用外部 方法

```tsx
const Outer7Outer = () => {
  console.log("c4Test");
};

const Outer7: React.FC = React.memo(function Outer7({}) {
  const [state, setstate] = useState("");

  console.log("Outer7");
  return (
    <div>
      <div>Outer7 state {state}</div>
      <button onClick={() => setstate(String(Date.now()))}>C4</button>
      <button onClick={() => Outer7Outer()}>Fn</button>
    </div>
  );
});
```

1. 父级渲染不影响组件
2. 方法固定引用不重新渲染

### 在组件外 Memo 依赖传入外部方法

```tsx
const Outer7Outer = () => {
  console.log("Outer7Outer");
};

const Outer8: React.FC<{ fn: () => void }> = React.memo(function Outer8({
  fn
}) {
  console.log("Outer8");
  return (
    <div>
      <button onClick={() => fn()}>Fn</button>
    </div>
  );
});
```

1. 同上 没有影响

### 在组件外 Memo 依赖传入 Object 数据

```tsx
const Outer9: React.FC<{ list: object }> = React.memo(function Outer9({
  list
}) {
  console.log("Outer9");
  return (
    <div>
      <div>Outer9 {JSON.stringify(list)}</div>
    </div>
  );
});
```

1. 表现和默认 Memo 行为一样

###  在组件外 无 Memo 无依赖 内部 useState 变动

```tsx
const Outer10: React.FC = () => {
  console.log("Outer10");
  const [state, setstate] = useState("");

  return (
    <div>
      <div>Outer10 {state}</div>
      <button onClick={() => setstate(String(Date.now()))}>toggle</button>
    </div>
  );
};
```

1. 表现和默认一致

### 在组件外 无 Memo 依赖 useState，内部 useMemo

```tsx
const Outer11: React.FC<{time1: string}> = ({ time1 }) => {
  console.log("Outer11");

  const timeMemo = useMemo(() => {
    console.log("Outer11 useMemo");

    return time1 + "-----";
  }, [time1]);

  return <div>Outer11 {timeMemo}</div>;
};
```

1. 表现默认一致
2. useMemo 默认执行

### 在组件外 使用 ahooks useEventEmitter 测试

```tsx
// Parent
const focus$ = useEventEmitter();
<button onClick={() => focus$.emit()}>Event</button>
```

```tsx
const Outer12: React.FC<{ focus$: EventEmitter<void> }> = React.memo(
  function Outer12({ focus$ }) {
    console.log("Outer12", focus$);

    focus$.useSubscription(() => {
      console.log("Outer12 emit", focus$);
    });
    return <div>Outer12</div>;
  }
);

const Outer13: React.FC<{ focus$: EventEmitter<void> }> = ({ focus$ }) => {
  console.log("Outer13", focus$);

  focus$.useSubscription(() => {
    console.log("Outer13 emit", focus$);
  });
  return <div>Outer13</div>;
};
```

```
// 默认
App Parent 
focus$ 
EventEmitter {subscriptions: Set, emit: ƒ (), useSubscription: ƒ (), constructor: Object}
Outer12 
EventEmitter {subscriptions: Set, emit: ƒ (), useSubscription: ƒ (), constructor: Object}
Outer13 
EventEmitter {subscriptions: Set, emit: ƒ (), useSubscription: ƒ (), constructor: Object}

// 改变 useState
App Parent 
focus$ 
EventEmitter {subscriptions: Set, emit: ƒ (), useSubscription: ƒ (), constructor: Object}
Outer13 
EventEmitter {subscriptions: Set, emit: ƒ (), useSubscription: ƒ (), constructor: Object}

// 发送事件 emit
Outer12 emit 
EventEmitter {subscriptions: Set, emit: ƒ (), useSubscription: ƒ (), constructor: Object}
Outer13 emit 
EventEmitter {subscriptions: Set, emit: ƒ (), useSubscription: ƒ (), constructor: Object}

```

1. 默认执行机制
2. useEventEmitter 事件不会触发渲染机制

### PureComponent

```tsx
type PureProps = {
  time1: string;
};
class Pure extends React.PureComponent<PureProps> {

  componentDidMount() {
    console.log('Pure')
  }

  componentDidUpdate() {
    console.log("PureCp---componentDidUpdate");
  }

  render() {
    return <h3>PureCp: {this.props.time1}</h3>;
  }
}
```

https://zh-hans.reactjs.org/docs/react-api.html#reactpurecomponent

>`React.PureComponent` 与 [`React.Component`](https://zh-hans.reactjs.org/docs/react-api.html#reactcomponent) 很相似。两者的区别在于 [`React.Component`](https://zh-hans.reactjs.org/docs/react-api.html#reactcomponent) 并未实现 [`shouldComponentUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)，而 `React.PureComponent` 中以浅层对比 prop 和 state 的方式来实现了该函数。
>
>如果赋予 React 组件相同的 props 和 state，`render()` 函数会渲染相同的内容，那么在某些情况下使用 `React.PureComponent` 可提高性能。