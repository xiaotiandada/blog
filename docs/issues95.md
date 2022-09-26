<!-- TypeScript -->

- https://www.typescriptlang.org/play

---

- https://ts.xcatliu.com/
- https://github.com/mqyqingfeng/Blog/issues/221
- https://www.jianshu.com/u/4653bb9f8dd7
- https://pro.ant.design/zh-CN/docs/type-script
- https://github.com/Jayee-Jiayi-Fu/gitbook-typescript-notes

### 映射类型

#### 只读 冻结

- https://github.com/remix-run/history/blob/dev/packages/history/index.ts#L320-L322
- https://github.com/Microsoft/TypeScript/blob/0a535f0bf7193741e6b4acf5b7dfea88e2d4beca/lib/lib.d.ts#L1379-L1405
- https://mariusschulz.com/blog/mapped-types-in-typescript
- https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
- https://www.fullstackbb.com/typescript/readonly-in-typescript/
- https://github.com/pillarliang/study-blog/blob/6998f00ebe/typescript/TypeScript.md

```ts
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

const readOnly: <T>(obj: T) => Readonly<T> = __DEV__
  ? (obj) => Object.freeze(obj)
  : (obj) => obj

readOnly<Location>({})
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
  Guest,
}

// 字符串枚举
enum Message {
  Success = '成功',
  Fail = '失败',
}

// 异构枚举
enum Answer {
  N,
  Y = 'YES',
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
  e = '123'.length,
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
  Mar,
}
```

**数字枚举**

![image-20220902032102718](https://i.imgur.com/4twVIPa.png)

> “反向映射 枚举的实现原理”

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
  readonly id: number //接口返回的id
  name: string
  // [x: string]: any;
  age?: number
}
interface Result {
  data: List[]
}
function render(result: Result) {
  result.data.forEach((element) => {
    console.log(element.id, element.name)
    if (element.age) {
      //age?: number;
      console.log(element.age)
    }
  })
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
    { id: 2, name: 'b', age: 18 },
  ],
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
  [index: number]: string
}
let chars: StringArray = ['a', 'b']
// 用任意的字符串去索引Names得到的结果都是string
// 这样声明之后，我们就不能声明一个number的成员了
interface Names {
  [x: string]: string

  // y: number // 这样是不被允许的，因为可以使用数字索引
  [y: number]: string //这样数字和字符串都可以了，数字签名的返回值一定要是string类型的子类型
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
  (): void //首先Lib是一个函数，没有返回值，没有参数
  version: string
  doSomething(): void
}
//这样会暴露一个全局变量lib，需要封装getLib
// let lib: Lib = (() => {}) as Lib
// lib.version = 'v.1.0';
// lib.doSomething = () => {}
function getLib() {
  let lib: Lib = (() => {}) as Lib
  lib.version = 'v.1.0'
  lib.doSomething = () => {}
  return lib
}
let lib1 = getLib()
lib1()
lib1.doSomething()
let lib2 = getLib()
```

> 从 https://www.jianshu.com/p/436aa7112b56 复制

**函数重载**(要把最容易匹配的写在最前面)

```ts
function add8(...rest: number[]): number
function add8(...rest: string[]): string
function add8(...rest: any[]): any {
  let first = rest[0]
  if (typeof first === 'string') {
    return rest.join('')
  }
  if (typeof first === 'number') {
    return rest.reduce((pre, cur) => pre + cur)
  }
}
console.log(add8(1, 2, 3)) // 6
console.log(add8('a', 'b', 'c')) // abc
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
  constructor(name: string) {
    this.name = name
  }
  name: string
  run() {}
  readonly legs: number = 4
  static food: string = 'bones'
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

**成员修饰符，这是 ts 对 js 的一种扩展**

public：公有成员，类的默认属性都是 public，对所有人都是可见的
private：私有成员，只能在类的本身被调用，而不能被类的实例调用，也不能被子类调用
private contructor 给构造函数设置：这个类既不能实例化也不能被继承
protected: 受保护成员，只能在类和子类中访问，而不能在类的实例中访问
protected contructor：这个类不能被实例化，只能被继承，相当于声明了一个基类
readonly: 只读属性也一定要初始化，跟实例属性是一样的
static：类的静态成员，类的静态成员只能通过类名来调用，而不能通过子类来调用，可以被继承

除了类的成员可以添加修饰符之外，构造函数的参数也可以添加修饰符
作用：自动的将参数变成了实例的属性,这样我们就能省略在类中的定义了

**抽象类与多态 （TS 对 JS 的扩展）**

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
dog.eat()

class Cat extends Animal {
  sleep() {
    console.log('cat sleep')
  }
}
let cat = new Cat()

let animal: Animal[] = [dog, cat]
animal.forEach((i) => {
  i.sleep() //这个地方就实现了多态
})
```

**this 类型（TS 特殊类型）**

1. 方便的实现链式调用
2. 在继承的时候 this 类型也可以表现出多态，this 既可以是父类型也可以是子类型

```ts
class WorkFlow {
  sleep1() {
    return this
  }
  sleep2() {
    return this
  }
}
new WorkFlow().sleep1().sleep2() // 这样就实现了方法的链式调用

class MyFlow extends WorkFlow {
  next() {
    return this
  }
}
new MyFlow().next().sleep1().next().sleep2() // 多态
```

> 从 https://www.jianshu.com/p/55e4b53052d7 复制



### Interface

- https://juejin.cn/post/6914213447169376263
- https://1991421.cn/2020/01/30/9b18a5df/

![image-20220921005035236](https://i.imgur.com/4AzqsXY.png)

### 泛型

- https://www.jianshu.com/p/43017c646b74

泛型：不预先确定的数据类型，具体的类型在使用的时候才能确定。

![image-20220921010549577](https://i.imgur.com/thUBFGT.png)



**1. 很多时候我们希望一个函数或者一个类可以支持多种数据类型，有很大的灵活性**
**2.泛型：不预先确定的数据类型，具体的类型在使用的时候才能确定**
**3.泛型好处**
a. 函数和类可以支持多种类型，增强程序的扩展性；
b. 不必写多条函数重载，冗余的联合类型声明，增强代码可读性；
c. 灵活的控制了类型之间的约束；

#### 一 泛型函数与泛型接口

```ts
// 一个打印函数
function log(value: string) {
    console.log(value);
    return value;
}
// 希望上面的打印函数可以接收一个字符串数组
// 函数重载
function log(value: string): string;
function log(value: string[]): string[];
function log(value: any) {
    console.log(value);
    return value;
}
// 联合类型
function log(value: string | string[]) {
    console.log(value);
    return value;
}
// 希望log可以接收任意类型
// any类型（问题：丢失了类型之间的关系，它忽略了输入的类型和返回的类型必须是一致的）
function log(value: any) {
    console.log(value);
    return value;
}
```

使用泛型改造log函数

```ts
// 泛型函数
// 类型T不需要预先指定，就相当于any类型
// 可以保存输入参数和返回值类型是一致的
function log<T>(value: T): T {
    console.log(value);
    return value;
}
// 两种调用方式
log<string[]>(['1','2']);
// 利用TS的类型推断，省略类型的参数
//推荐这种方式
log(['1','2']);

// 利用泛型定义一个函数类型
// type 类型别名
type Log = <T>(value: T) => T;
// 泛型函数的实现
let myLog: Log = log

// 泛型接口 (和类型别名的定义是完全等价的)
// 泛型紧紧约束了一个函数，也可以约束接口的其它成员
interface Log1 {
    <T>(value: T): T
}
// 这样接口的所有成员都受到了泛型的约束了
// 当泛型约束了整个接口之后，在实现的时候必须指定一个类型
interface Log2<T> {
    (value: T): T
}
// 必须指定类型，mylog2的参数只能是number
let myLog2: Log2<number> = log
// 设置默认值了，实现的时候就不需要必须指定一个类型了
interface Log2<T = string> {
    (value: T): T
}
let myLog3: Log2 = log
log('2')
```

#### 二 泛型类与泛型约束

```ts
// 定义一个泛型类（<T>放在Log后面，约束类的所有成员）
// 泛型不能应用于类的静态成员
class Log<T> {
    run(value: T) {
        console.log(value);
        return value;
    }
}
// 实例化Log类,实例的方法将会受到泛型的约束
let log = new Log<number>()
log.run(1)
// 实例化的时候也可以不传入参数,不指定参数的时候value就可以是任意值
let log1 = new Log()
log1.run({a:1})


// 泛型约束，
// 希望打印出参数和参数的属性
interface LogLength {
    length: number;
}
function log3<T extends LogLength>(value: T): T {
    // 不存在length属性，需要预定义一个接口,T继承LogLength就好使了
    // 现在T就受到了一定的约束，就不是任意类型都可以传入了，输入的参数必须具有length属性
    console.log(value, value.length);
    return value;
}
log3([1])
```

### 类型检查机制

- https://www.tslang.cn/docs/handbook/type-compatibility.html

![image-20220921010847495](https://i.imgur.com/PJnKu7L.png)

![image-20220921010911801](https://i.imgur.com/Io9jXGZ.png)

```ts
// "strictNullChecks": false
let b = [1, null]
```

![image-20220921011310563](https://i.imgur.com/oyEFPyN.png)

<img src="https://i.imgur.com/NNdN1js.png" alt="image-20220921011507892" style="zoom:50%;" />

<img src="https://i.imgur.com/UK25Cst.png" alt="image-20220921011846702" style="zoom:50%;" />

<img src="https://i.imgur.com/M2A2FWT.jpg" alt="image-20220921011959680" style="zoom:33%;" />

<img src="https://i.imgur.com/bwrnq6k.png" alt="image-20220921012047650" style="zoom: 50%;" />

<img src="https://i.imgur.com/1ffZD1U.png" alt="image-20220921012145329" style="zoom:50%;" />

<img src="https://i.imgur.com/07yM7Cy.jpg" alt="image-20220921012300481" style="zoom:33%;" />

<img src="https://i.imgur.com/kr2RxEe.png" alt="image-20220921012338064" style="zoom: 50%;" />

```ts
"strictFunctionTypes": false
```

![image-20220921012406429](https://i.imgur.com/bhA1Doe.jpg)

![image-20220921012543954](https://i.imgur.com/rdLiv6Q.png)

<img src="https://i.imgur.com/Opz0rCq.png" alt="image-20220921012657153" style="zoom: 50%;" />

<img src="https://i.imgur.com/e9NYgsB.png" alt="image-20220921012931085" style="zoom: 50%;" />

<img src="https://i.imgur.com/u5CIbz1.png" alt="image-20220921012908231" style="zoom: 50%;" />

<img src="https://i.imgur.com/8qJz7gZ.png" alt="image-20220921013030736" style="zoom: 50%;" />

### 高级类型

#### 交叉类型

#### 联合类型

![image-20220922004300785](https://i.imgur.com/GfwGWTb.png)

![image-20220922004326972](https://i.imgur.com/ITtU7Sq.png)

#### 索引类型

![image-20220922005142106](https://i.imgur.com/ZirDGvW.png)

#### 映射类型

- https://zhuanlan.zhihu.com/p/45249773

Readonly， Partial和 Pick是同态的，但 Record不是。 因为 Record并不需要输入类型来拷贝属性，所以它不属于同态：

非同态类型本质上会创建新的属性，因此它们不会从它处拷贝属性修饰符。

![image-20220922010138598](https://i.imgur.com/ELsfsVo.png)

##### Readonly

##### Partial

##### Pick

##### Record

##### Omit

#### 条件类型

- https://zhuanlan.zhihu.com/p/40311981
- https://juejin.cn/post/6844903977461514254#heading-4
- https://zhuanlan.zhihu.com/p/20862787
- https://www.jiyik.com/tm/xwzj/web_1201.html

![image-20220922012001540](https://i.imgur.com/tX4ozZc.png)

![image-20220922011844661](https://i.imgur.com/6QtvIkl.png)

### tsconfig 

- https://github.com/pillarliang/study-blog/blob/6998f00ebe/typescript/demo/2-project/src/0502tsconfig/tsconfig.json

```json
{
  "compilerOptions": {
    // "incremental": true,                // 增量编译：第一次编译生成一个存储编译结果的文件，第二次编译
    // "tsBuildInfoFile": "./buildFile",   // 增量编译文件的存储位置
    // "diagnostics": true,                // 打印诊断信息
    // "target": "es5",           // 目标语言的版本
    // "module": "commonjs",      // 生成代码的模块标准
    "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在 AMD 模块中
    // "lib": [],                 // TS 需要引用的库，即声明文件，es5 默认 "dom", "es5", "scripthost"
    // "allowJs": true,           // 允许编译 JS 文件（js、jsx）
    // "checkJs": true,           // 允许在 JS 文件中报错，通常与 allowJS 一起使用
    // "outDir": "./out",         // 指定输出目录
    // "rootDir": "./",           // 指定输入文件目录（用于输出）
    // "declaration": true,         // 生成声明文件
    // "declarationDir": "./d",     // 声明文件的路径
    // "emitDeclarationOnly": true, // 只生成声明文件
    // "sourceMap": true,           // 生成目标文件的 sourceMap
    // "inlineSourceMap": true,     // 生成目标文件的 inline sourceMap
    // "declarationMap": true,      // 生成声明文件的 sourceMap
    // "typeRoots": [],             // 声明文件目录，默认 node_modules/@types
    // "types": [],                 // 声明文件包
    // "removeComments": true,    // 删除注释
    // "noEmit": true,            // 不输出文件
    // "noEmitOnError": true,     // 发生错误时不输出文件
    // "noEmitHelpers": true,     // 不生成 helper 函数，需额外安装 ts-helpers
    // "importHelpers": true,     // 通过 tslib 引入 helper 函数，文件必须是模块
    // "downlevelIteration": true,    // 降级遍历器的实现（es3/5）
    // "strict": true,                        // 开启所有严格的类型检查
    // "alwaysStrict": false,                 // 在代码中注入 "use strict";
    // "noImplicitAny": false,                // 不允许隐式的 any 类型
    // "strictNullChecks": false,             // 不允许把 null、undefined 赋值给其他类型变量
    // "strictFunctionTypes": false           // 不允许函数参数双向协变
    // "strictPropertyInitialization": false, // 类的实例属性必须初始化
    // "strictBindCallApply": false,          // 严格的 bind/call/apply 检查
    // "noImplicitThis": true,               // 不允许 this 有隐式的 any 类型


    // 只会提示错误，不会阻碍编译。
    // "noUnusedLocals": true,                // 检查只声明，未使用的局部变量
    // "noUnusedParameters": true,            // 检查未使用的函数参数
    // "noFallthroughCasesInSwitch": true,    // 防止 switch 语句贯穿。在switch中，如果一个分支没有break语句，下面的一系列语句都会依次执行。
    // "noImplicitReturns": true,             // 每个分支都要有返回值：如：if-else 分支中都要有返回值。

    
    // "esModuleInterop": true,               // 允许 export = 导出，既可以用 import from 导入，也可以用 import = 的方式导入。
    // "allowUmdGlobalAccess": true,          // 允许在模块中访问 UMD 全局变量
    // "moduleResolution": "node",            // 模块解析策略
    // "baseUrl": "./",                       // 解析非相对模块的基地址
    // "paths": {                             // 路径映射，相对于 baseUrl
    //   "jquery": ["node_modules/jquery/dist/jquery.slim.min.js"]
    // },
    // "rootDirs": ["src", "out"],            // 将多个目录放在一个虚拟目录下，用于运行时
    // "listEmittedFiles": true,        // 打印输出的文件
    // "listFiles": true,               // 打印编译的文件（包括引用的声明文件）
  }
}
```



#### 模块解析策略

```json
{
	"moduleResolution": "node"  // 模块解析策略
}
```



![image-20220926021326785](https://i.imgur.com/8N4mJjZ.jpg)

![image-20220926021553691](https://i.imgur.com/MgEGHv3.jpg)

### 编译工具

- https://www.npmjs.com/package/ts-loader

- https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#readme
- https://www.npmjs.com/package/awesome-typescript-loader

```js
// ts-loader
options: {
  transpileOnly: true
}


plugins: [new ForkTsCheckerWebpackPlugin()]
```

![image-20220926123531165](https://i.imgur.com/fTnNKt5.jpg)

![image-20220926123607222](https://i.imgur.com/DYtD0ur.png)

![image-20220926123747141](https://i.imgur.com/iLMtilS.png)

>  四种语法在 babel 编译中会报错

![image-20220926124256451](https://i.imgur.com/9xa19sm.png)

![image-20220926124353706](https://i.imgur.com/3gobVpz.jpg)

### 代码检测工具

![image-20220926145401226](https://i.imgur.com/rVmNhe6.jpg)

![image-20220926145433391](https://i.imgur.com/vk4tlnT.jpg)

![image-20220926145539655](https://i.imgur.com/Vd7BN1x.jpg)

![](https://i.imgur.com/IBv2Z26.jpg)

![image-20220926151018383](https://i.imgur.com/yZ2mQ0n.jpg)

### Jest 单元测试

![image-20220926151152845](https://i.imgur.com/XfiLq0W.png)
