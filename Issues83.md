- https://ustbhuangyi.github.io/vue-analysis/v2/prepare/

### core/index.js

```javascript
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'

initGlobalAPI(Vue)
```

### core/instance/index.js

```javascript
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'
// 一个用 Function 实现的类，我们只能通过 new Vue 去实例化它。
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
// 后看这里有很多 xxxMixin 的函数调用，并把 Vue 当参数传入，它们的功能都是给 Vue 的 prototype 上扩展一些方法，
// Vue 按功能把这些扩展分散到多个模块中去实现，而不是在一个模块里实现所有，
// 这种方式是用 Class 难以实现的。这么做的好处是非常方便代码的维护和管理。
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

