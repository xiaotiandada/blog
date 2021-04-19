---
title: compose javascript
date: 2020-02-26 22:54:15
tags:
---

在阅读某段代码的时候,了解到了``compose`` 但是似乎不止``redux`` 很多工具库都用到了这个``function``

**code**

```js
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

以前的写法:

```js
fn1(fn2(fn3(fn4(fnN(...)))))
```

现在的写法:

```js
compose(fn1, fn2, fn3, fn4, fnN)(...)
```

相关链接:

[redux](https://github.com/reactjs/redux/blob/v3.7.2/src/compose.js)

[Use function composition in JavaScript](https://www.codementor.io/@michelre/use-function-composition-in-javascript-gkmxos5mj)

[redux之compose](https://segmentfault.com/a/1190000015801987)

[redux compose 详解](https://cnodejs.org/topic/5995a7abee602e88524b435e)