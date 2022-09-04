- https://www.typescriptlang.org/play



---

- https://github.com/mqyqingfeng/Blog/issues/221
- https://www.jianshu.com/u/4653bb9f8dd7



## 映射类型

### 只读 冻结

- https://github.com/remix-run/history/blob/dev/packages/history/index.ts#L320-L322
- https://github.com/Microsoft/TypeScript/blob/0a535f0bf7193741e6b4acf5b7dfea88e2d4beca/lib/lib.d.ts#L1379-L1405
- https://mariusschulz.com/blog/mapped-types-in-typescript
- https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
- https://www.fullstackbb.com/typescript/readonly-in-typescript/


```ts
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

const readOnly: <T>(obj: T) => Readonly<T> = __DEV__
  ? (obj) => Object.freeze(obj)
  : (obj) => obj;

readOnly<Location>({ })
```



![image-20220901023402916](https://i.imgur.com/a1JN7TK.png)

![image-20220902031053641](https://i.imgur.com/CwXsYj5.png)

### enum

```ts
// 数字枚举
enum Role {
    Reporter,
    Developer,
    Owner,
    Guest
}

// 字符串枚举
enum Message {
    Success = "成功",
    Fail = "失败"
}

// 异构枚举
enum Answer {
    N,
    Y = "YES"
}

// 数字枚举
enum Char {
  	// const 常量枚举
  	// 1. 没有初始值的情况
  	// 2. 对已有枚举成员的引用
  	// 3. 常量的表达式
  	// 常量枚举成员会在编译时计算出结果，已常量的形式出现在运行环境
    a,
    b = Char.a,
    c = 1 + 3,
  	// computed 需要被计算的枚举成员，非常量的表达式。不会在编译阶段计算，保留在执行阶段
  	// computed 枚举成员后面一定需要被赋予一个初始值，不然报错 "Enum member must have initializer.(1061)"
    d = Math.random(),
    e = '123'.length
}

console.log(Role)
console.log(Message)
console.log(Answer)

// 常量枚举
// 编译阶段会被移除
// 当我们不需要一个对象而需要对象值的时候
const enum Month {
    Jan,
    Feb,
    Mar
}
```



**数字枚举**

![image-20220902032102718](https://i.imgur.com/4twVIPa.png)

>  “反向映射 枚举的实现原理”



字符串枚举

![image-20220902032515206](https://i.imgur.com/vnYaz4k.png)

> "字符串枚举不可以反向映射"

![image-20220902034253956](https://i.imgur.com/TOnycOl.png)

**枚举类型**

1. 枚举成员没有初始值
2. 枚举成员都是数字枚举
3. 枚举成员都是字符串枚举
4. E F 可以吧任意 number 赋值给枚举类型，取值可以超出枚举成员定义
5. 两种不同枚举类型不可以比较
6. 字符串枚举取值只能是枚举成员类型



### Interface

- https://www.jianshu.com/p/436aa7112b56
- https://www.jianshu.com/p/63169c463500

**函数重载**(要把最容易匹配的写在最前面)

```ts
function add8(...rest: number[]): number
function add8(...rest: string[]): string
function add8(...rest: any[]): any {
  let first = rest[0];
  if (typeof first === 'string'){
    return rest.join('')
  }
  if (typeof first === 'number') {
    return rest.reduce((pre, cur) => pre + cur)
  }
}
console.log(add8(1, 2, 3))// 6
console.log(add8('a', 'b', 'c'))// abc
```

