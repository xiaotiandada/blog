---
title: ShuffleanArray
date: 2019-06-13 00:06:35
tags: 
categories: 算法
---


Shuffle an Array (carry)
[Shuffle an Array](http://www.jstips.co/en/javascript/shuffle-an-array/)

This snippet here uses Fisher-Yates Shuffling Algorithm to shuffle a given array.

[Fisher-Yates Shuffling](https://www.wikiwand.com/en/Fisher%E2%80%93Yates_shuffle)
[Fisher-Yates Shuffling](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)

<!-- more -->

## example

```js

function shuffle(arr) {
    var i,
        j,
        temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;    
};

var a = [1, 2, 3, 4, 5, 6, 7, 8];
var b = shuffle(a);
console.log(b);
// [2, 7, 8, 6, 5, 3, 1, 4]

```

## self

```js

let arr = [1,2,3,4,5,6,7,8]
const shuffle = arr => {
  // 7 6 5 4 ... 2 1
  for(let i = arr.length - 1; i > 0; i--) {
    let temp = null
    let j = null
    // 0-7 0-6 0-5 ... ... 0-1
    j = Math.floor(Math.random() * (i + 1))
    temp = arr[j]
    arr[j] = arr[i]
    arr[i] = temp
  }
  return arr
}

console.log(shuffle(arr))

// [8, 4, 2, 3, 6, 1, 5, 7]
// [5, 4, 7, 3, 1, 6, 8, 2]
// [4, 5, 6, 8, 1, 2, 3, 7]
// [7, 5, 3, 4, 6, 8, 1, 2]
// [5, 7, 6, 3, 2, 1, 8, 4]
// [7, 6, 5, 3, 1, 8, 2, 4]
// [5, 6, 7, 8, 3, 1, 4, 2]
// [8, 3, 1, 7, 4, 5, 6, 2]
// [5, 8, 1, 4, 6, 7, 3, 2]
// [6, 5, 4, 2, 8, 3, 7, 1]

```
