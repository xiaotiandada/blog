- https://www.typescriptlang.org/play



---

- https://ts.xcatliu.com/
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

接口可以用来约束对象，函数，以及类的结构和类型，这是一种代码协作的契约

 **对象类型接口**

```ts
interface List {
 readonly id: number; //接口返回的id
 name: string;
 // [x: string]: any;
 age?: number;
}
interface Result {
 data: List[];
}
function render(result: Result){
 result.data.forEach(element => {
  console.log(element.id, element.name)
  if(element.age){ //age?: number;
   console.log(element.age)
  }
 });
}
let result = {
 data: [
  // 不会报错，因为ts采用了鸭式变形发，这是一种动态语言类型风格
  // 我们传入的对象只要满足接口的必要条件，就是被允许的，即使传入多余的字段也可以通过类型检测
  // 但是如果我们传入字面量的话，就会类型检查
  // 绕过类型检查一共三种方法
  // 1，直接传入result
  // 2，使用类型断言
  // 3，使用字符串索引签名 [x: string]: any;
  // (用任意的字符串索引List，可以得到任意的结果，这样List就可以支持多个属性了)          
  { id: 1, name: 'a', sex: 'male' },
  { id: 2, name: 'b', age: 18 }
 ]
}
render(result)

// 建议使用as的类型断言
// render({
// data: [
//  { id: 1, name: 'a', sex: 'male' },
//  { id: 2, name: 'b' }
// ]
// } as Result)
// render(<Result>{
// data: [
//  { id: 1, name: 'a', sex: 'male' },
//  { id: 2, name: 'b' }
// ]
// })

// 用任意的数字去索引StringArray都会得到一个string
// 这就相当于声明了一个字符串的数组
interface StringArray {

[index: number]: string;

}
let chars: StringArray = ['a', 'b']
// 用任意的字符串去索引Names得到的结果都是string
// 这样声明之后，我们就不能声明一个number的成员了
interface Names {

[x: string]: string;

 // y: number // 这样是不被允许的，因为可以使用数字索引
 [y: number]: string; //这样数字和字符串都可以了，数字签名的返回值一定要是string类型的子类型
}
```

  **函数类型接口**

```ts
//add11这两种方式的定义是等价的
let add11: (x: number, y: number) => number
interface Add11 {
 (x: number, y: number): number
}
type Add2 = (x: number, y: number) => number
let add2: Add2 = (a, b) => a + b
//混合类型接口：一个接口既可以定义一个函数，也可以像对象一样拥有属性和方法
interface Lib {
 (): void; //首先Lib是一个函数，没有返回值，没有参数
 version: string;
 doSomething(): void;
}
//这样会暴露一个全局变量lib，需要封装getLib
// let lib: Lib = (() => {}) as Lib
// lib.version = 'v.1.0';
// lib.doSomething = () => {}
function getLib() {
 let lib: Lib = (() => {}) as Lib
 lib.version = 'v.1.0';
 lib.doSomething = () => {}
 return lib
}
let lib1 = getLib();
lib1();
lib1.doSomething();
let lib2 = getLib();
```

> 从 https://www.jianshu.com/p/436aa7112b56 复制

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

### Class

- https://www.typescriptlang.org/docs/handbook/classes.html
- https://www.tutorialsteacher.com/typescript/abstract-class
- https://ts.xcatliu.com/advanced/class.html

**继承和成员修饰符**

注意：类的属性都是实例属性而不是原型属性；方法是原型上的;
类里面的属性都需要有初始值

```ts
class Dog {
  constructor(name: string){
     this.name = name
   }
   name: string
   run() {}
   readonly legs: number = 4;
   static food: string = 'bones';
}
// 类的继承
class Husky extends Dog {
    constructor(name: string, public color: string) {
      super(name)
      this.color = color
    }
    // color: string
}
```

**成员修饰符，这是ts对js的一种扩展**

public：公有成员，类的默认属性都是public，对所有人都是可见的
private：私有成员，只能在类的本身被调用，而不能被类的实例调用，也不能被子类调用
private contructor 给构造函数设置：这个类既不能实例化也不能被继承
protected: 受保护成员，只能在类和子类中访问，而不能在类的实例中访问
protected contructor：这个类不能被实例化，只能被继承，相当于声明了一个基类
readonly: 只读属性也一定要初始化，跟实例属性是一样的
static：类的静态成员，类的静态成员只能通过类名来调用，而不能通过子类来调用，可以被继承

除了类的成员可以添加修饰符之外，构造函数的参数也可以添加修饰符
作用：自动的将参数变成了实例的属性,这样我们就能省略在类中的定义了

**抽象类与多态 （TS对JS的扩展）**

抽象类:

1. 只能被**继承**而不能被**实例化**的类
2. 抽象类定义用**abstract**定义

多态:

1. 抽象类的好处是抽出共性，有利于代码的复用和扩展，
2. 抽象类也可以实现多态，在父类中定义一个抽象方法，在多个子类中对这个方法有不同的实现，在程序运行的时候，会根据不同的对象，执行不同的操作，这样就实现了运行时的绑定

```ts
abstract class Animal {
    eat() {
        console.log('eat')
    }
    //抽象方法的好处：明确的知道子类有自己的实现，父类就不需要实现了
    abstract sleep(): void
}

class Dog extends Animal {
    constructor(name: string) {
        super()
        this.name = name
    }
    name: string
    run() {}
    sleep() {
        console.log('dog sleep')
    }
}
let dog = new Dog('wangwang')
dog.eat();

class Cat extends Animal {
    sleep() {
        console.log('cat sleep')
    }
}
let cat = new Cat();

let animal: Animal[] = [dog, cat]
animal.forEach(i => {
    i.sleep() //这个地方就实现了多态
})
```

**this类型（TS特殊类型）**

1. 方便的实现链式调用
2. 在继承的时候this类型也可以表现出多态，this既可以是父类型也可以是子类型

```ts
class WorkFlow {
    sleep1() {
        return this
    }
    sleep2() {
        return this
    }
}
new WorkFlow().sleep1().sleep2()// 这样就实现了方法的链式调用

class MyFlow extends WorkFlow {
    next() {
        return this
    }
}
new MyFlow().next().sleep1().next().sleep2() // 多态
```



> 从 https://www.jianshu.com/p/55e4b53052d7 复制
