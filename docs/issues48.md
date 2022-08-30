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

### [剑指 Offer 59 - II. 队列的最大值](https://leetcode.cn/problems/dui-lie-de-zui-da-zhi-lcof/)

解题思路：

- https://leetcode.cn/problems/dui-lie-de-zui-da-zhi-lcof/solution/mian-shi-ti-59-ii-dui-lie-de-zui-da-zhi-by-leetcod/
- https://leetcode.cn/problems/dui-lie-de-zui-da-zhi-lcof/solution/ru-he-jie-jue-o1-fu-za-du-de-api-she-ji-ti-by-z1m/

```js
var MaxQueue = function () {
  // 存储队列数据
  this.queue = {};
  // 双端队列维护最大值（每个阶段的最大值）
  // 单调递减队列
  this.deque = {};
  // 准备队列相关的数据
  this.countQ = this.countD = this.headQ = this.headD = 0;
};

/**
 * 获取队列最大值
 * @return {number}
 */
MaxQueue.prototype.max_value = function () {
  if (this.isEmptyDeque()) {
    return -1;
  }

  // 返回 deque 队首值即可
  return this.deque[this.headD];
};

/**
 * 队尾入队
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function (value) {
  // 数据在 queue 入队
  this.queue[this.countQ++] = value;

  // 检测是否可以将数据添加到双端队列
  // - 队列不能为空
  // - value 大于队尾值
  while (!this.isEmptyDeque() && value > this.deque[this.countD - 1]) {
    // 删除当前队尾值
    delete this.deque[--this.countD];
  }

  // 将 value 入队
  this.deque[this.countD++] = value;
};

/**
 * 队首出队
 * @return {number}
 */
MaxQueue.prototype.pop_front = function () {
  if (this.isEmptyQueue()) {
    return -1;
  }

  // 比较 deque 与 queue 的队首值，如果相同，deque 出队，否则 deque 不操作
  if (this.queue[this.headQ] === this.deque[this.headD]) {
    delete this.deque[this.headD++];
  }

  // 给 queue 出队，并返回
  const frontData = this.queue[this.headQ];
  delete this.queue[this.headQ++];
  return frontData;
};

/**
 * 检测队列 deque 是否为空
 */
MaxQueue.prototype.isEmptyDeque = function () {
  return this.countD - this.headD === 0;
};
/**
 * 检测队列 queue 是否为空
 */
MaxQueue.prototype.isEmptyQueue = function () {
  return this.countQ - this.headQ === 0;
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */
```

### [剑指 Offer 59 - I. 滑动窗口的最大值](https://leetcode.cn/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/)

- https://leetcode.cn/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/solution/hua-dong-chuang-kou-de-zui-da-zhi-by-lee-ymyo/
- https://leetcode.cn/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/solution/mian-shi-ti-59-i-hua-dong-chuang-kou-de-zui-da-1-6/

```js
/**
 * @param {number[]} nums 传入的数组
 * @param {number} k 滑动窗口宽度
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  if (nums.length <= 1) {
    return nums;
  }

  const result = [];
  const deque = [];

  // 1 将窗口第一个位置的数据添加到 deque 中，保持递减
  deque.push(nums[0]);

  let i = 1;
  for (; i < k; i++) {
    // - 存在数据
    // - 在当前数据大于队尾值
    //   - 出队，再重复比较
    while (deque.length && nums[i] > deque[deque.length - 1]) {
      deque.pop();
    }
    deque.push(nums[i]);
  }

  // 将第一个位置的最大值添加到 result
  result.push(deque[0]);

  // 2 遍历后续的数据
  const len = nums.length;
  for (; i < len; i++) {
    // 同上进行比较
    while (deque.length && nums[i] > deque[deque.length - 1]) {
      deque.pop();
    }
    deque.push(nums[i]);

    // 检测当前最大值是否位于窗口外
    if (deque[0] === nums[i - k]) {
      deque.shift();
    }

    // 添加最大值到 result
    result.push(deque[0]);
  }

  return result;
};

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
```

## 链表

- [看动画轻松理解「链表」实现「LRU缓存淘汰算法」](https://bbs.huaweicloud.com/blogs/127297)

![640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1](https://i.imgur.com/aBvRldK.jpg)

![image-20220715174643065](https://i.imgur.com/SG8sSmm.png)

![image-20220715175110416](https://i.imgur.com/5iPMCRQ.png)

![image-20220715183211623](https://i.imgur.com/YMJcrIH.png)

![image-20220715183922335](https://i.imgur.com/EVvtZLo.png)

![image-20220715183956174](https://i.imgur.com/5R5SP6e.png)

![image-20220715183904278](https://i.imgur.com/ZWu0Z1u.png)

![image-20220715184007103](https://i.imgur.com/kE5mAe7.png)

```js
class LinkedNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.count = 0;
    this.head = null;
  }

  // 添加节点（尾）
  addAtTail(value) {
    // 创建新节点
    const node = new LinkedNode(value);
    // 检测链表是否存在数据
    if (this.count === 0) {
      this.head = node;
    } else {
      // 找到链表尾部节点，将最厚一个节点的 next 设置为 node
      let cur = this.head;
      while (cur.next) {
        cur = cur.next;
      }
      cur.next = node;
    }
    this.count++;
  }

  // 添加节点（首）
  addAtHead(value) {
    const node = new LinkedNode(value);
    if (this.count === 0) {
      this.head = node;
    } else {
      // 将 node 添加到 head 的前面
      node.next = this.head;
      this.head = node;
    }
    this.count++;
  }
  // 获取节点（根据索引）
  get(index) {
    if (this.count === 0 || index < 0 || index >= this.count) {
      return;
    }

    // 迭代链表，找到对应节点
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current;
  }

  // 添加节点（根据索引）
  addAtIndex(value, index) {
    if (this.count === 0 || index >= this.count) {
      return;
    }

    // 如果 index <= 0 都添加到头部即可
    if (index <= 0) {
      return this.addAtHead(value);
    }

    // 后面为正常区间处理
    const prev = this.get(index - 1);
    const next = prev.next;

    const node = new LinkedNode(value);

    prev.next = node;
    node.next = next;

    this.count++;
  }

  // 删除（根据索引）
  removeAtIndex(index) {
    if (this.count === 0 || index < 0 || index >= this.count) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
    } else {
      const prev = this.get(index - 1);
      prev.next = prev.next.next;
    }
    this.count--;
  }
}

const linkedList = new LinkedList();

linkedList.addAtTail("a");
linkedList.addAtTail("b");
linkedList.addAtTail("c");

linkedList.addAtHead("x");
linkedList.addAtHead("y");

linkedList.addAtIndex("z", 2);
```

#### [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)

- https://leetcode.cn/problems/reverse-linked-list/solution/fan-zhuan-lian-biao-by-leetcode-solution-d1k2/

**迭代**

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  // 保存 prev cur
  let prev = null;
  let cur = head;

  // 当 cur 是节点时进行迭代
  while (cur) {
    // 保存当前节点的下一个节点
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }

  return prev;
};

const ans = reverseList({
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: null
    }
  }
});

console.log("ans", ans);
```

**递归**

```js
var reverseList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }

  const newHead = reverseList1(head.next);
  // 能够第一次执行到这里的节点为倒数第二个节点
  head.next.next = head;
  // head 的 next 需要在下一次递归时设置。当前设置为 null 不影响
  // - 可以让最好一次（1） 的时候设置为 null
  head.next = null;

  return newHead;
};

const ans = reverseList({
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: null
    }
  }
});

console.log("ans", ans);
```

#### [面试题 02.08. 环路检测](https://leetcode.cn/problems/linked-list-cycle-lcci/)

- https://leetcode.cn/problems/linked-list-cycle-lcci/solution/huan-lu-jian-ce-by-leetcode-solution-s2la/

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  if (head === null) {
    return null;
  }

  // 声明快慢指针
  let slow = head;
  let fast = head;

  while (fast !== null) {
    // 慢指针每次移动一位
    slow = slow.next;

    // 如果不满足条件，说明 fast 为尾部节点，不存在环
    if (fast.next !== null) {
      // 快指针每次移动两位
      fast = fast.next.next;
    } else {
      return null;
    }

    // 检测是否有环
    if (fast === slow) {
      // 找到环的起点
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }

      // ptr 和 slow 的交点就是环的起始节点
      return ptr;
    }
  }

  // while 结束，说明 fast 为 null，说明链表没有环
  return null;
};

const vala = {
  val: "a",
  next: null
};
const valb = {
  val: "b",
  next: null
};
const valc = {
  val: "c",
  next: null
};

vala.next = valb;
valb.next = valc;
valc.next = valb;

console.log("detectCycle1", vala);
console.log("detectCycle", detectCycle(vala));
```

## 二叉树

#### [144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)

- https://leetcode.cn/problems/binary-tree-preorder-traversal/solution/er-cha-shu-de-qian-xu-bian-li-by-leetcode-solution/

**方法一：递归**

```js
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  // 用于储存遍历的结果
  const res = [];
  // 设置函数用于进行递归遍历
  const preorder = (root) => {
    // 当前节点为空时，无需进行递归
    if (!root) {
      return;
    }

    // 记录根节点值
    res.push(root.val);
    // 前序遍历左子树
    preorder(root.left);
    // 前序遍历右子树
    preorder(root.right);
  };

  preorder(root);
  return res;
};

const A = new TreeNode("A");
const B = new TreeNode("B");
const C = new TreeNode("C");
const D = new TreeNode("D");
const E = new TreeNode("E");
const F = new TreeNode("F");

A.left = B;
A.right = C;

B.right = D;

C.left = E;
C.right = F;

console.log(preorderTraversal(A));


const one = new TreeNode(1);
const two = new TreeNode(2);
const three = new TreeNode(3);

one.right = two

two.left = three

console.log(preorderTraversal(one));
```

**方法二：迭代**

```js
var preorderTraversal = function (root) {
  const res = [];
  const stk = [];

  while (root || stk.length) {
    while (root) {
      // 右子节点入栈
      stk.push(root.right);
      // 记录根节点
      res.push(root.val);

      // 下一步处理左子节点
      root = root.left;
    }
    // 左子树处理完毕，将 stk 出栈，处理右子树
    root = stk.pop();
  }
  return res;
};

console.log(preorderTraversal(one));
```

```
// 测试用例
[1,2,3,4,5,null,6,7,8,null,null,9]
```

#### [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

- https://leetcode.cn/problems/maximum-depth-of-binary-tree/solution/er-cha-shu-de-zui-da-shen-du-by-leetcode-solution/

**方法一：深度优先搜索**  **递归 DFS**

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }

  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

const A = new TreeNode("A");
const B = new TreeNode("B");
const C = new TreeNode("C");
const D = new TreeNode("D");
const E = new TreeNode("E");

A.left = B;
A.right = C;

C.left = D;

C.right = E;

console.log(maxDepth(A));
```

**方法二：广度优先搜索**  **迭代 BFS**

```js

```

#### [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

- https://leetcode.cn/problems/binary-tree-level-order-traversal/solution/er-cha-shu-de-ceng-xu-bian-li-by-leetcode-solution/
- https://leetcode.cn/problems/binary-tree-level-order-traversal/solution/bfs-de-shi-yong-chang-jing-zong-jie-ceng-xu-bian-l/

```js
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

const Node3 = new TreeNode('3')
const Node9 = new TreeNode('9')
const Node20 = new TreeNode('20')
const Node15 = new TreeNode('15')
const Node7 = new TreeNode('7')

Node3.left = Node9
Node3.right = Node20

Node20.left = Node15
Node20.right = Node7

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const ret = []
  if (!root) {
    return ret
  }

  // 存储队列数据
  const q = []
  q.push(root)

  // 遍历队列
  while (q.length !== 0) {
    const currentLevelSize = q.length
    // 针对本轮操作，创建一个新的二维数组
    ret.push([])
    for (let i = 0; i < currentLevelSize; i++) {
      // 将本次操作的结点出队
      const node = q.shift()
      ret[ret.length - 1].push(node.val)
      // 检测是否存在左右子结点，如果有入队即可
      if (node.left) {
        q.push(node.left)
      }
      if (node.right) {
        q.push(node.right)
      }
    }
  }

  return ret
}

console.log('levelOrder', levelOrder(Node3))


//  [ [ '3' ], [ '9', '20' ], [ '15', '7' ] ]
```

#### [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)

- https://leetcode.cn/problems/validate-binary-search-tree/solution/yan-zheng-er-cha-sou-suo-shu-by-leetcode-solution/

![image-20220831014409986](https://i.imgur.com/47FH7dT.png)

#### 方法一: 递归

```js
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

const Node1 = new TreeNode('1')
const Node3 = new TreeNode('3')
const Node4 = new TreeNode('4')
const Node5 = new TreeNode('5')
const Node6 = new TreeNode('6')

Node5.left = Node1
Node5.right = Node4

Node4.left = Node3
Node4.right = Node6

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

const helper = (root, lower, upper) => {
  if (root === null) {
    return true
  }
  // console.log(root.val, lower, upper)
  // 5 -Infinity Infinity
  // 1 -Infinity 5
  // 4 5 Infinity

  // 检测当前节点值是否超出边界
  if (root.val <= lower || root.val >= upper) {
    return false
  }

  // 当前节点通过检测，再检测左右子节点
  return (
    helper(root.left, lower, root.val) && helper(root.right, root.val, upper)
  )
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  return helper(root, -Infinity, +Infinity)
}

console.log('isValidBST', isValidBST(Node5))
```

#### 中序遍历

```js
let isValidBST = function (root) {
  let stack = []
  let inorder = -Infinity

  while (stack.length || root !== null) {
    while (root !== null) {
      stack.push(root)
      root = root.left
    }

    root = stack.pop()

    // 如果中序遍历得到的节点值小于等于前一个 inorder，说明不是二叉搜索树
    if (root.val <= inorder) {
      return false
    }
    inorder = root.val
    root = root.right
  }
  return true
}

console.log('isValidBST', isValidBST(Node5))
```

#### [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)

- https://leetcode.cn/problems/binary-tree-inorder-traversal/solution/er-cha-shu-de-zhong-xu-bian-li-by-leetcode-solutio/

#### 递归

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const res = []
  const inorder = (root) => {
    if (!root) {
      return
    }

    inorder(root.left)
    res.push(root.val)
    inorder(root.right)
  }

  inorder(root)

  return res
}
```

#### 迭代

```js
var inorderTraversal = function (root) {
  const res = []
  const stack = []

  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }

    root = stack.pop()
    res.push(root.val)
    root = root.right
  }
  return res
}
```

#### Morris 中序遍历

```js
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



