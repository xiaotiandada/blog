## 栈

- [codesandbox demo code](https://codesandbox.io/s/data-structures-and-algorithms-hbw4wf?file=/src/index.js)
- https://leetcode.cn/u/xiaotiandada/

<iframe src="https://codesandbox.io/embed/data-structures-and-algorithms-hbw4wf?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Data Structures and Algorithms"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

![栈的定义及实现- Crystal_Guang - 博客园](https://i.imgur.com/7fd9IEm.png)

![数据结构之栈和队列- 归斯君- 博客园](https://i.imgur.com/dVdl97R.png)

```js
class Stack {
  constructor() {
    // 存储栈的数据
    this.data = []; // {}
    // 记录栈的数据个数（相当于数组的 length）
    this.count = 0;
  }

  // push() 出栈方法
  push(item) {
    // 1. 数组方法 push 添加
    // this.data.push(item);
    // 2. 利用数组长度
    // this.data[this.data.length] = item;
    // 3. 计数方式
    this.data[this.count] = item;
    // 入栈后 count 自增
    this.count++;
  }

  // pop() 出栈方法
  pop() {
    // 出栈的前提是栈中存在元素，应先行检测
    if (this.isEmpty()) {
      console.log("栈为空");
      return;
    }
    // 移除栈顶数据
    // 1. 数组方法 pop 移除
    // this.data.pop();
    // 2. 计数方式
    const temp = this.data[this.count - 1];
    delete this.data[--this.count];
    return temp;
  }

  // isEmpty() 检测栈是否为空
  isEmpty() {
    return this.count === 0;
  }

  // top() 用于获取栈顶值
  top() {
    if (this.isEmpty()) {
      console.log("栈为空");
      return;
    }
    return this.data[this.count - 1];
  }

  // size() 获取元素个数
  size() {
    return this.count;
  }

  // clear() 清空栈
  clear() {
    this.data = [];
    this.count = 0;
  }
}

const s = new Stack();
s.push("x");
s.push("y");
s.push("z");

// console.log(s.pop());

console.log(s.top());
console.log(s.size());

// s.clear();

console.log(s);
```



### [剑指 Offer 30. 包含min函数的栈](https://leetcode.cn/problems/bao-han-minhan-shu-de-zhan-lcof/)

解题思路：

1. 在存储数据的栈外，再新建一个栈，用于存储最小值
2. 入栈的时候正常存储值到 stackA 栈，如果存储值小于等于 stackB 栈顶值，stackB 也入栈
3. 出栈的时候判断 stackA 栈顶值，如果 stackA 栈顶值全等 stackB 栈顶值，stackA stackB 一起出栈，否则仅 stackA 出栈

阶段一

stackA: [2]

stackB: [2]

阶段二

stackA: [2, 1]

stackB: [2, 1]

阶段二

stackA: [2, 1, 4, 5, 6]

stackB: [2, 1]

阶段三

stackA: [2, 1, 4, 5, 6, 1]

stackB: [2, 1, 1]



阶段性存储最小值到 stackB 栈，在出现新的小于等于最小值之前为一个阶段

解题思路:

- https://leetcode.cn/problems/bao-han-minhan-shu-de-zhan-lcof/solution/offer30bao-han-minhan-shu-de-zhan-by-log-a6vx/
- https://leetcode.cn/problems/bao-han-minhan-shu-de-zhan-lcof/solution/yi-xia-jiu-neng-du-dong-de-ti-jie-fu-zhu-yhbx/

![GIF 2021-8-6 18-17-13.gif](https://i.imgur.com/14toKT6.gif)

![GIF 2021-8-6 18-23-10.gif](https://i.imgur.com/Tf6Lvg9.gif)

```js
// 在存储数据的栈外，再新建一个栈，用于存储最小值
class MinStack {
  constructor() {
    // stackA 用于存储数据
    this.stackA = [];
    this.countA = 0;

    // stackB 用于将数据降序存储（栈顶值为最小值）
    this.stackB = [];
    this.countB = 0;
  }

  // 入栈
  push(item) {
    // stackA 正常入栈
    this.stackA[this.countA++] = item;

    // stackB 如果没有数据 直接入栈
    // 如果 item 的值 <= stackB 的最小值，入栈
    if (this.countB === 0 || item <= this.min()) {
      this.stackB[this.countB++] = item;
    }
  }
  // 出栈
  pop() {
    // 先进行 stackB 的检测
    if (this.top() === this.min()) {
      // 如果 stackA 的栈顶值 === stackB 的栈顶值，stackB 出栈
      delete this.stackB[--this.countB];
    }

    // stackA 出栈
    delete this.stackA[--this.countA];
  }
  // 获取栈顶值
  top() {
    return this.stackA[this.countA - 1];
  }
  // 最小值函数
  min() {
    return this.stackB[this.countB - 1];
  }
}
```

```ts
class MinStack {
  constructor() {
    this.stack = [];
  }

  push(item) {
    this.stack.push(item);
  }

  pop() {
    return this.stack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  min() {
    return Math.min.apply(null, this.stack);
  }
}
```

```ts
// 在存储数据的栈外，再新建一个栈，用于存储最小值
class MinStack {
  constructor() {
    // stackA 用于存储数据
    this.stackA = [];

    // stackB 用于将数据降序存储（栈顶值为最小值）
    this.stackB = [];
  }

  // 入栈
  push(item) {
    // stackA 正常入栈
    this.stackA.push(item);

    // stackB 如果没有数据 直接入栈
    // 如果 item 的值 <= stackB 的最小值，入栈
    if (this.stackB.length === 0 || item <= this.min()) {
      this.stackB.push(item);
    }
  }
  // 出栈
  pop() {
    // 先进行 stackB 的检测
    if (this.top() === this.min()) {
      // 如果 stackA 的栈顶值 === stackB 的栈顶值，stackB 出栈
      this.stackB.splice(this.stackB.length - 1, 1);
    }

    // stackA 出栈
    this.stackA.splice(this.stackA.length - 1, 1);
  }
  // 获取栈顶值
  top() {
    return this.stackA[this.stackA.length - 1];
  }
  // 最小值函数
  min() {
    return this.stackB[this.stackB.length - 1];
  }
}
```

### [739. 每日温度](https://leetcode.cn/problems/daily-temperatures/)

通过维护[单调栈](https://www.cnblogs.com/liang24/p/14200734.html) 递减来计算

- https://leetcode.cn/problems/daily-temperatures/solution/mei-ri-wen-du-by-leetcode-solution/
- https://leetcode.cn/problems/daily-temperatures/solution/leetcode-tu-jie-739mei-ri-wen-du-by-misterbooo/

```ts
/**
 * @param {number[]} temperatures [73,74,75,71,69,72,76,73]
 * @return {number[]} [1,1,4,2,1,1,0,0]
 */
var dailyTemperatures = function (temperatures) {
  // 单调栈 递减
  // 默认第一个索引会入栈，for 直接从 1 开始
  const stack = [0];

  const len = temperatures.length;
  const ans = new Array(temperatures.length).fill(0);

  for (let i = 1; i < len; i++) {
    while (
      stack.length &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const previousIndex = stack[stack.length - 1];
      ans[previousIndex] = i - previousIndex;
      stack.pop();
    }
    stack.push(i);
  }

  return ans;
};
```

## 队列

先进先出

![img](https://i.imgur.com/QPwbzZe.png)

```js
class Queue {
  constructor() {
    // 用于储存队列数据
    this.queue = [];
    this.count = 0;
  }

  // 入队方法
  enQueue(item) {
    this.queue[this.count++] = item;
  }

  // 出队方法
  deQueue() {
    if (this.isEmpty()) {
      return;
    }
    this.count--;
    return this.queue.shift();
  }

  // 空判断
  isEmpty() {
    return this.count === 0;
  }

  // size 大小 
  size() {
    return this.count;
  }

  // 获取队首元素
  top() {
    if (this.isEmpty()) {
      return;
    }
    return this.queue[0];
  }

  // 清空
  clear() {
    this.queue = [];
    this.count = 0;
  }
}
```

```js
class Queue {
  constructor() {
    // 用于储存队列数据
    this.queue = {};
    this.count = 0;
    // 用于记录队首的键
    this.head = 0;
  }

  // 入队方法
  enQueue(item) {
    this.queue[this.count++] = item;
  }

  // 出队方法
  deQueue() {
    if (this.isEmpty()) {
      return;
    }

    const headData = this.queue[this.head];
    delete this.queue[this.head];

    this.head++;
    this.count--;
    return headData;
  }

  // 空判断
  isEmpty() {
    return this.count === 0;
  }

  // size 大小
  size() {
    return this.count;
  }

  // 获取队首元素
  top() {
    if (this.isEmpty()) {
      return;
    }
    return this.queue[this.head];
  }

  // 清空
  clear() {
    this.queue = {};
    this.count = 0;
    this.head = 0;
  }
}
```

## 双端队列

![双端队列Deque | Kenve's Blog](https://i.imgur.com/WbmN9rk.png)

- [双端队列输出合法性](https://blog.csdn.net/pikaqiu_JBR99/article/details/107730429)

![img](https://i.imgur.com/X0rfPJH.png)

```js
class Deque {
  constructor() {
    this.queue = {};
    this.count = 0;
    this.head = 0;
  }

  // 队首添加
  addFront(item) {
    this.queue[--this.head] = item;
  }

  // 队尾添加
  addBack(item) {
    this.queue[this.count++] = item;
  }

  // 队首删除
  removeFront() {
    const headData = this.queue[this.head];
    delete this.queue[this.head++];
    return headData;
  }

  // 队尾删除
  removeBack() {
    const backData = this.queue[this.count - 1];
    delete this.queue[--this.count];
    // this.count - 1 与 上一步 this.count - 1 合并
    return backData;
  }

  // 获取队首值
  frontTop() {
    if (this.isEmpty()) {
      return;
    }
    return this.queue[this.head];
  }

  // 获取队尾值
  backTop() {
    if (this.isEmpty()) {
      return;
    }
    return this.queue[this.count - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count - this.head;
  }
}
```





---

- http://www.conardli.top/docs/
- https://juejin.cn/post/6844903682455109640#heading-87

## 排序

算法学习 📒 [repo](https://github.com/xiaotiandada/algorithm)

### 快速排序

这个方法比较简单也很好理解

**方法一**

```javascript
let list = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];
// 自定义个数
let ageLists = []
for(let i = 0; i <=100; i++) {
    let id = Math.floor(Math.random() * 100 + 1)
    ageLists.push({
        id: id,
        age: Math.floor(Math.random() * 40 + 1),
        name: `学号${i}`,
        type: 'student'
    })
}

console.log(ageLists)

// 排数组
function quickSort(array) {
    if (array.length <= 1) {
        return array
    }

    let target = array[0]
    let left = []
    let right = []

    for (let i = 1; i < array.length; i++) {
        if (array[i] < target) {
            left.push(array[i])
        } else {
            right.push(array[i])
        }
    }

    return quickSort(left).concat([target], quickSort(right))
}

console.log(quickSort(list))

// 排对象
function quickSortObj(array, key) {
    if (array.length <= 1) {
        return array
    }

    let target = array[0]
    let left = []
    let right = []

    for (let i = 1; i < array.length; i++) {
        if (array[i][key] < target[key]) {
            left.push(array[i])
        } else {
            right.push(array[i])
        }
    }

    return quickSortObj(left, key).concat([target], quickSortObj(right, key))
}

console.time('quickSortObj')
console.log(quickSortObj(ageLists, 'id'))
console.timeEnd('quickSortObj')
```

**方法二**

```javascript
// 排序数组
function quickSort(array, start, end) {
    if (end - start < 1) return

    let target = array[start]
    let l = start
    let r = end

    while (l < r) {
        while (l < r && array[r] >= target) {
            r--
        }
        array[l] = array[r]
        while (l < r && array[l] < target) {
            l++
        }
        array[r] = array[l]
    }

    array[l] = target

    quickSort22(array, start, l - 1)
    quickSort22(array, l + 1, end)
    return array
}

console.time('quickSort')
console.log(quickSort(list, 0, list.length - 1))
console.timeEnd('quickSort')

// 拍对象
function quickSort2Obj(array, start, end, key) {
    if (end - start < 1) return

    let target = array[start]
    let l = start
    let r = end

    while(l < r) {
        while(l < r && array[r][key] >= target[key]) {
            r--
        }
        array[l] = array[r]

        while(l < r && array[l][key] < target[key]) [
            l++
        ]
        array[r] = array[l]
    }

    array[l] = target

    quickSort2Obj(array, start, l - 1, key)
    quickSort2Obj(array, l + 1, end, key)

    return array
}

console.time('quickSort2Obj')
console.log(quickSort2Obj(ageLists, 0, ageLists.length - 1, 'id'))
console.timeEnd('quickSort2Obj')
```

这个对比方法一难点, 一下不容易理解

经过测试 少量的数据 方法二有时候比方法一要慢(10 - 100), 但是数据足够大的时候 方法二比方法一就要快很多(10000左右)

## 归并排序

```javascript
let list = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];

function mergeSort(array) {
  if (array.length < 2) {
    return array
  }

  let mid = Math.floor(array.length / 2)
  let front = array.slice(0, mid)
  let end = array.slice(mid)

  return merge(mergeSort(front), mergeSort(end))
}

function merge(front, end) {
  let temp = []

  while (front.length && end.length) {
    if (front[0] < end[0] ){
      temp.push(front.shift())
    } else {
      temp.push(end.shift())
    }
  }

  while(front.length) {
    temp.push(front.shift())
  }
  while(end.length) {
    temp.push(end.shift())
  }
  return temp
}

console.time()
console.log(mergeSort(list))
console.timeEnd()
```

## 选择排序

```javascript
let list = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];

function selectionSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j
      }
    }
    [array[minIndex], array[i]] = [array[i], array[minIndex]]
  }
  return array
}

console.time()
console.log(selectionSort(list))
console.timeEnd()
```

## 插入排序

```javascript
let list = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];


function insertSort(array) {
  for (let i = 1; i < array.length; i++) {
    let target = i
    for (let j = i - 1; j >= 0; j--) {
      if (array[target] < array[j]) {
        [array[target], array[j]] = [array[j], array[target]]
        target = j
      } else {
        break
      }
    }
  }
  return array
}


console.time()
console.log(insertSort(list))
console.timeEnd()
```

## 冒泡排序

```javascript
let list = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];

function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    let complate = true
    for (let j = 0; j < array.length - 1 - i; j++) {
      console.log(1, array.length - 1 - i)
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]
        complate = false
      }
    }
    if (complate) {
      break
    }
  }
  return array
}

console.time()
console.log(bubbleSort(list))
console.timeEnd()
```

## 堆排序

```javascript
let list = [6, 1, 2, 7, 9, 3, 4, 5, 10, 8];

function heapSort(array) {
  createHeap(array)
  console.log('array', array)
  // 交换第一个和最后一个元素，然后重新调整大顶堆
  for (let i = array.length - 1; i > 0; i--) {
    [array[i], array[0]] = [array[0], array[i]]
    adJust(array, 0, i)
  }
  return array
}

// 构建大顶堆，从第一个非叶子节点开始，进行下沉操作
function createHeap(array) {
  const len = array.length
  const start = parseInt(len / 2) - 1
  for (let i = start; i >= 0; i--) {
    adJust(array, i, len)
  }
}
// 将第target个元素进行下沉，孩子节点有比他大的就下沉
function adJust(array, target, len) {
  for (let i = 2 * target + 1; i < len; i= 2 * i + 1) {
    // 找到孩子节点中最大的
    if (i + 1 < len && array[i + 1] > array[i]) {
      i = i + 1
    }
    // 下沉
    if (array[i] > array[target]) {
      [array[i] ,array[target]] = [array[target], array[i]]
      target = i
    } else {
      break
    }
  }
}

console.time()
console.log(heapSort(list))
console.timeEnd()
```

### shuffle

https://oldj.net/article/2017/01/23/shuffle-an-array-in-javascript/

https://github.com/lodash/lodash/blob/b0980a90fc83bc92e040f905ebed8196f895949c/.internal/shuffleSelf.js

https://bost.ocks.org/mike/shuffle/compare.html

```
-- To shuffle an array a of n elements (indices 0..n-1):
for i from n−1 downto 1 do
    j ← random integer such that 0 ≤ j ≤ i
    exchange a[j] and a[i]
```

```javascript
let arr = [1,2,3,4,5,6,7,8,9,11]

const shuffle = (arr) => {
  let i = arr.length
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [ arr[j], arr[i] ] = [ arr[i], arr[j] ]
  }
}

shuffle(arr)
console.log(arr)

// [4, 9, 1, 2, 7, 6, 5, 3, 8, 11]
```

**Lodash**

```javascript
_.shuffle([1,2,3,4,5,6,7,8,9,0,10,11])

// (12) [5, 0, 3, 6, 11, 7, 8, 4, 9, 10, 1, 2]
```



