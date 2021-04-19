---
title: dfs 深度优先搜索【js】
date: 2019-08-19 12:32:52
tags:
categories: 算法
---

# 资料

题目: https://www.spoj.com/problems/PT07Z/


https://zh.wikipedia.org/wiki/%E6%A0%91_(%E5%9B%BE%E8%AE%BA)

谢谢岛老师的教学

[岛娘blog](http://www.shuizilong.com/house/)

[岛娘Github](https://github.com/lychees)

[岛娘Youtube](https://www.youtube.com/channel/UCkGmTVYI7xNW-ffuh5oV71Q)

[code source](https://github.com/xiaotiandada/algorithm)


# Go

下面根据上面资料的wiki图来生成的点和边 看不见可能需要科学上网

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Tree_graph.svg/360px-Tree_graph.svg.png">

点: 1 2 3 4 5 6

边: 14 24 34 45 56

## 设置顶点

使用 Map https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map

```js
let vertexLen = 6; // 顶点数
let vertex = new Map(); // 顶点数据集合 map 可以设置键对值 0 1 2 3 4 5 or 1 2 3 4 5 6 or A B C D E F G ... ...
```

## 设置顶点和边

```js
/**
 * 设置顶点
 * @param {String || Number} v 顶点
 */
const setVertex = v => vertex.set(v, []);
/**
 * 设置边
 * @param {String || Number} v1 点
 * @param {String || Number} v2 点
 */
const setVertexEdge = (v1, v2) => {
  vertex.get(v1).push(v2);
  vertex.get(v2).push(v1);
};

// 设置点
for (let i = 1; i <= vertexLen; i++) setVertex(i);

// 定义边
let vertexEdge = [[1, 4], [2, 4], [3, 4], [4, 5], [5, 6]];

// 设置边
for (let i = 0; i < vertexEdge.length; i++)
  setVertexEdge(vertexEdge[i][0], vertexEdge[i][1]);

```

得到的集合

```js
Map {
  1 => [ 4 ],
  2 => [ 4 ],
  3 => [ 4 ],
  4 => [ 1, 2, 3, 5 ],
  5 => [ 4, 6 ],
  6 => [ 5 ] }
```

## dfs

vertex 结构目前是这样点 ⬆️️️️️️️️️️ ⬆️️️️️️️️️️ ⬆️️️️️️️️️️


这个方法主要通过存放一个map保存访问状态

参考地址 https://www.geeksforgeeks.org/implementation-graph-javascript/

``` js
/**
 * dfs
 * @param {String || Number} startNode 开始点
 */
const dfs = startNode => {
  let visited = new Map(); // 保持和顶点结构一样
  for (let i = 1; i <= vertexLen; i++) visited.set(i, false); // 设置访问状态

  // dfs 方法
  const dfsFunc = (startNode, visited) => {
    let z = 0; // 长度
    visited.set(startNode, true); // 第一个点设置已访问
    let get_next = vertex.get(startNode); // 获得顶点的所有临接点
    for (let i = 0; i < get_next.length; i++) {
      // 循环临接点
      let get_elem = get_next[i]; // 得到元素
      if (!visited.get(get_elem)) {
        // 是否访问
        z = Math.max(z, dfsFunc(get_elem, visited) + 1); // 增加边数
      }
    }
    return z;
  };
  return dfsFunc(startNode, visited);
};
```

## dfs

下面这个是岛老师👨‍🏫教我方法

主要通过存父节点来判断

``` js
/**
 * dfs
 * @param {String || Number} startNode 开始点
 */
const dfs1 = startNode => {
  // 记录开始点和父级节点
  const dfsFunc = (startNode, parentNode = -1) => {
    let z = 0; // 记录长度
    let get_next = vertex.get(startNode); // 得到相邻节点
    for (let i = 0; i < get_next.length; i++) { // 循环点
      let get_elem = get_next[i]; // 得到点
      if (get_elem === parentNode) continue; // 如果是父节点 跳过
      z = Math.max(z, dfsFunc(get_elem, startNode) + 1); // 递归添加长度
    }
    return z;
  };
  return dfsFunc(startNode);
};

```


<details>
<summary>查看所有代码</summary>

``` js
let vertexLen = 6; // 顶点数
let vertex = new Map(); // 顶点数据集合 map 可以设置键对值 0 1 2 3 4 5 or 1 2 3 4 5 6 or A B C D E F G ... ...

/**
 * 设置顶点
 * @param {String || Number} v 顶点
 */
const setVertex = v => vertex.set(v, []);
/**
 * 设置边
 * @param {String || Number} v1 点
 * @param {String || Number} v2 点
 */
const setVertexEdge = (v1, v2) => {
  vertex.get(v1).push(v2);
  vertex.get(v2).push(v1);
};

// 设置点
for (let i = 1; i <= vertexLen; i++) setVertex(i);

// 定义边
let vertexEdge = [[1, 4], [2, 4], [3, 4], [4, 5], [5, 6]];

// 设置边
for (let i = 0; i < vertexEdge.length; i++)
  setVertexEdge(vertexEdge[i][0], vertexEdge[i][1]);

/**
 * dfs
 * @param {String || Number} startNode 开始点
 */
const dfs = startNode => {
  let visited = new Map(); // 保持和顶点结构一样
  for (let i = 1; i <= vertexLen; i++) visited.set(i, false); // 设置访问状态

  // dfs 方法
  const dfsFunc = (startNode, visited) => {
    let z = 0; // 长度
    visited.set(startNode, true); // 第一个点设置已访问
    let get_next = vertex.get(startNode); // 获得顶点的所有临接点
    for (let i = 0; i < get_next.length; i++) {
      // 循环临接点
      let get_elem = get_next[i]; // 得到元素
      if (!visited.get(get_elem)) {
        // 是否访问
        z = Math.max(z, dfsFunc(get_elem, visited) + 1); // 增加边数
      }
    }
    return z;
  };
  return dfsFunc(startNode, visited);
};

/**
 * dfs
 * @param {String || Number} startNode 开始点
 */
const dfs1 = startNode => {
  // 记录开始点和父级节点
  const dfsFunc = (startNode, parentNode = -1) => {
    let z = 0; // 记录长度
    let get_next = vertex.get(startNode); // 得到相邻节点
    for (let i = 0; i < get_next.length; i++) { // 循环点
      let get_elem = get_next[i]; // 得到点
      if (get_elem === parentNode) continue; // 如果是父节点 跳过
      z = Math.max(z, dfsFunc(get_elem, startNode) + 1); // 递归添加长度
    }
    return z;
  };
  return dfsFunc(startNode);
};

let z = dfs(1);
console.log(z);

let z1 = dfs1(1);
console.log(z1);

console.log(vertex);

```
</details>

------


--- 分割线 ---

很遗憾上面的是有问题的

[岛老师的作业批改](http://www.shuizilong.com/house/archives/pt07z/)

- 数据没有从 IO 读入读出。

- 第一个 dfs 求出的不是最远的端点。


正确的解法应该是先求最深的一个端点,然后用从这个端点再搜索一次.

>   因为 js 在 https://www.spoj.com 跑不过, 在http://codeforces.com 可以跑但是没找到题目,然后就选用了c++ 

在codeforces js输入输出

http://codeforces.com/blog/entry/10594

http://codeforces.com/blog/entry/64707


---

``` c++
// u 开始点 p 父节点
pair<int, int> dfs(int u, int p = -1) {
  // z first 长度 z second 最深点
  // first += 1 second 为 u
  pair<int, int> z = {0, u};
  // for edge u 的 边
  for(auto v: edge[u]) {
    // 如果是父级点 跳过
    if (v == p) continue;
    z = max(z, dfs(v, u));
  }
  // 边+1
  z.first += 1;
  return z;
}
```

<details>
<summary>查看所有代码</summary>

``` c++
#include <iostream>
#include <vector>
using namespace std;

const int N = 1e6;
vector<int> edge[N];

// u 开始点 p 父节点
pair<int, int> dfs(int u, int p = -1) {
  // z first 长度 z second 最深点
  // first += 1 second 为 u
  pair<int, int> z = {0, u};
  // for edge u 的 边
  for(auto v: edge[u]) {
    // 如果是父级点 跳过
    if (v == p) continue;
    z = max(z, dfs(v, u));
  }
  // 边+1
  z.first += 1;
  return z;
}


int main() {
  int n;
  // 输入
  cin >> n;
  
  // 输入端点循环下面的边
  for(int i = 0; i < n - 1; i++) {
    int v, u;
    cin >> v >> u;
    edge[v].push_back(u);
    edge[u].push_back(v);
  }
  
  // 得到最深的端点
  pair<int, int> z = dfs(1);
  // 从最深的端点搜索
  z = dfs(z.second);

  // 边-1
  cout << z.first-1 << endl;
}

```
</details>


希望看到的大佬可以多多指点迷津!!! 右边有我的联系方式💗💗
