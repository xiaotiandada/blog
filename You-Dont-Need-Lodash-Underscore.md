---
title: You-Dont-Need-Lodash-Underscore
date: 2020-07-12 16:56:33
tags:
updated: 2020-07-28 23:33
---

You-Dont-Need-Lodash-Underscore 学习

[repo](https://github.com/xiaotiandada/You-Dont-Need-Lodash-Underscore) 可以根据 **fork** 的地址找到原库

这是一个非常优秀的开源项目 自己阅读 **Code** 来学习 遇到无法一下就看明白的 **Code** 在 ``main.js`` 里面运行了一次 有 ``debounce`` ``throttle`` 用到了 **Browser** 环境 代码在 ``index.html``里面 🎉🎉🎉

<!-- more -->

```javascript
// https://github.com/xiaotiandada/You-Dont-Need-Lodash-Underscore

// Array

{
  const chunk = (input, size) => {
    return input.reduce((arr, item, idx) => {
      return idx % size === 0
        ? [...arr, [item]]
        : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
    }, []);
  };
  
  console.log(chunk(['a', 'b', 'c', 'd', 'e', 'f'], 3))
}

{
  let arrays = [[1, 2, 3, 4, 5], [5, 2, 10]];
  const difference = array => array.reduce((a, b) => a.filter(i => !b.includes(i)))

  console.log(difference(arrays))
}


{
  const flattenDeep = arr => Array.isArray(arr) ? arr.reduce((a, b) => a.concat(flattenDeep(b)), []) : [arr]

  console.log(flattenDeep([1, [[2], [3, 4]], 5]))
}

{
  // flat

  const flattenDeep = arr => arr.flatMap(subArray => Array.isArray(subArray) ? flattenDeep(subArray) : subArray)

  console.log(flattenDeep([1, [[2], [3, 4]], 5]))

}

{
  let arrays = [[1, 2, 3], [101, 2, 1, 10], [2, 1]];
  
  const intersection = array => array.reduce((a, b) => a.filter((c => b.includes(c))))

  console.log(intersection(arrays))
}

{
  let array = ['one', 'two', 'three']
  const grouped = arrary => arrary.reduce((r, v, i, a, k = v.length) => ((r[k] || (r[k] = [])).push(v), r), {})

  console.log(grouped(array))
}


{
  const keyBy = (array, key) => (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x] : x}), {})
  console.log(keyBy([{ id: 'a1', title: 'abc' }, { id: 'b2', title: 'def' }], 'id'))
}

{
  const fruits = [
    {name:"banana", amount: 2},
    {name:"apple", amount: 4},
    {name:"pineapple", amount: 2},
    {name:"mango", amount: 1}
  ];

  const sortBy = key => (a, b) => (a[key] > b[key] ? 1 : ((b[key] > a[key]) ? -1 : 0))
  let sortArr = fruits.concat().sort(sortBy('name'))
  console.log('sortArr', sortArr)

  console.log('sortArr', fruits.concat().sort(sortBy('amount')))
}


{
  function debounce(func, wait, immediate) {
    let timeout = null
    return function() {
    let args = arguments
      let context = this
      clearTimeout(timeout)
      timeout = null
      timeout = setTimeout(function() {
        if (!immediate) {
          func.apply(context, args)
        }
      }, wait)
      if (immediate && !timeout) {
        func.apply(context, args)
      }
    }
  }

  const show = () => console.log('scrollTop', document.body.scrollTop || document.documentElement.scrollTop)

  // window.addEventListener('scroll', debounce(show, 150))
}

{
  function throttle (func, timeFrame) {
    let lastTime = 0
    return function() {
      let now = Date.now()
      if (now - lastTime >= timeFrame) {
        func()
        lastTime = now
      }
    }
  }
  const show = () => console.log('scrollTop', document.body.scrollTop || document.documentElement.scrollTop)

  // window.addEventListener('scroll', throttle(show, 150))

}

{
  const isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length

  console.log(isEmpty(null))
  // output: true
  console.log(isEmpty(''))
  // output: true
  console.log(isEmpty({}))
  // output: true
  console.log(isEmpty([]))
  // output: true
  console.log(isEmpty({a: '1'}))
  // output: false
  console.log(isEmpty(undefined))

}

{
  const get = (obj, path, defaultValue = undefined) => {
    const traval = regexp => String.prototype.split
        .call(path, regexp)
        .filter(Boolean)
        .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj)

    const result = traval(/[,[\]]+?/) || traval(/[,[\].]+?/)
    return result === undefined || result === obj ? defaultValue : result
  }
  var object = { a: [{ b: { c: 3 } }] };
  var result = get(object, 'a[0].b.c', 1);
  console.log('result', result)
}

```

