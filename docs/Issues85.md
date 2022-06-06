

- https://tech.meituan.com/2017/04/27/vuex-code-analysis.htm
- https://github.com/answershuto/learnVue/blob/master/docs/Vuex%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.MarkDown


- https://github.com/xiaotiandada/Case/tree/master/vuex-learn



## Index.js

```javascript
import { Store, install } from './store'
```

导入/导出各个模块功能

### Store.js

```javascript
if (!Vue && typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}
```

在 Vue 环境中安装

```javascript
if (__DEV__) {
  assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`)
  assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
  assert(this instanceof Store, `store must be called with the new operator.`)
}
```

开发模式断言

```javascript
    const {
      // 一个数组，包含应用在 store 上的插件方法。
      plugins = [],
      // 使 Vuex store 进入严格模式，在严格模式下，任何 mutation 处理函数以外修改 Vuex state 都会抛出错误。
      strict = false
    } = options
```

