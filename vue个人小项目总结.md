---
title: vue个人小项目总结
date: 2018-06-22 13:14:50
tags:
categories: Vue
---

## 简介

自己写了一个vue小项目总结总结(为了节省篇幅和大家阅读的时间直接进入正题 认真脸！)

---

> 项目详情可以查看的我Github仓库[地址](https://github.com/xiaotiandada/My-music)

> [项目预览地址](http://123.207.60.132:8081/)

- 用户登录帐号密码都是11
- 后台管理登录也是11 
- (其实还有别的帐号密码,如果您有心情可以查看api自己用Postman注册,用户注册自己可以直接在页面上注册)

> github描述文档写了使用了写技术栈 和 界面截图

<!-- more -->

## 功能总结

> ### 前端api调用

``` bash

# api
import axios from 'axios'
import store from '@/store/store'

export default () => {
  return axios.create({
    baseURL: `http://123.207.60.132:8081/`,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}

import Api from '@/services/Api'

export default {
  userLogin(credentials) {
    return Api().post('/userLogin', credentials)
  }
}

# music api

import axios from 'axios'
export default () => {
  return axios.create({
    baseURL: `http://123.207.60.132:3000/`
  })
}

import Api from '@/services/musicApi'

export default {
  getTopList() {
    return Api().get('/top/list?idx=3')
  }
}
```
- 更多内容[地址](https://github.com/xiaotiandada/My-music/tree/master/client/src/services)

> ### 前端vuex状态管理

``` bash
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },

  mutations: {
    setToken(state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser(state, user) {
      state.user = user
    }
  },

  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setUser({ commit }, user) {
      commit('setUser', user)
    }
  }
})
```

- 更多内容[地址](https://github.com/xiaotiandada/My-music/tree/master/client/src/store)

> ### 前端界面

``` bash
# 组件使用
<v-slider :sliderImg="sliderImg"></v-slider>

# 组件引入
 import VSlider from './Slider/Index'

export default {
    # 声明组件
    components: {
        VSlider
    },
    data() {
        return {
            sliderImg: [
                {
                src: 'item1'
                },
                {
                src: 'item2'
                },
                {
                src: 'item3'
                },
                {
                src: 'item4'
                }
            ]
        }
    }
}
```
- 前端页面基本都是按照这样的方式写的 更多内容[地址](https://github.com/xiaotiandada/My-music/tree/master/client/src/views)

> ### 后台界面

- 后台界面除了按照前端页面写的以外还用了[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)后台界面的写法

- 其中侧边栏是根据 router.js 配置的路由并且根据权限动态生成的，这样就省去了写一遍路由还要手动再写一次侧边栏这种麻烦事，但也遇到了一个问题，路由可能会有多层嵌套，很多人反馈自己的侧边栏会有三级，甚至还有五级的。所以重构了一下侧边栏，使用了递归组件，这样不管你多少级，都能愉快的显示了。[文章地址](https://juejin.im/post/593121aa0ce4630057f70d35#heading-3) 复制的hhhh

- 页面还用了icon[文章地址](https://juejin.im/post/59bb864b5188257e7a427c09)

- 主页显示用了[v-charts图表组件](https://github.com/ElemeFE/v-charts) 这个基本的使用挺简单的看看文档就ok了 不用另外写文章了

- 更多内容[地址](https://github.com/xiaotiandada/My-music/tree/master/client/src/views)


> ### 前端router

``` bash
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const constantRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
```

- 更多内容[地址](https://github.com/xiaotiandada/My-music/tree/master/client/src/router)


> ### 后端基本服务

``` bash
const express = require('express')
const app = express()
const config = require('./config/config')

const fs = require('fs')
const path = require('path')
require('./router/index.js')(app)
app.use(express.static(path.resolve(__dirname, './dist')))

app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
    res.send(html)
})

app.listen(config.port, function () {
  console.log(`server run ${config.port} port`)
})
```

- 后台主要使用nodejs express mongodb提供服务

- 功能 用户登录注册

- 功能 管理员登录注册

- 用户的密码加密

- 更多内容[地址](https://github.com/xiaotiandada/My-music/blob/master/service/app.js)



> ### 后端model

``` bash
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt =require('bcryptjs')  // 密码加密
let SALT_WORK_FACTOR = 10
const config = require('../config/config')
mongoose.connect(config.database)


var UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,  // 不重复
    require: true  // 不为空
  }
})

// 在保存密码之前用bcrypt加密保证密码只有用户知道
UserSchema.pre('save', function (next){
  // 保存this指向
  let _this = this
  // 判断是否为最新
  if(!_this.isModified('password')){
      return next()
  }
  // 加密EMMM 产生一个salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt){
    if(err){
      return next(err)
    }

    // 结合salt 生成 hash
    bcrypt.hash(_this.password, salt, function (err, hash) {
      if(err){
        return next(err)
      }

      // 用hash覆盖明文密码
      _this.password = hash
      next()
    })
  })
})

// 通过bcrypt的compare方法，对再次传入的密码和数据库中保存的加密后的密码进行比较，如果匹配，则登录成功 isMatch 为布尔值
// mongoose 模型扩展 在 methods 对象上扩展
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};
module.exports = mongoose.model('User', UserSchema)
```
- 使用mongoose Schema定义数据模型

- 通过bcrypt密码加密

- 扩展方法 对密码加密

- 更多内容[地址](https://github.com/xiaotiandada/My-music/tree/master/service/model)




> ### 后端controllers

``` bash
const User = require('../model/User')
const AdminUser = require('../model/AdminUser')
const jwt = require('jsonwebtoken')
const config = require('../config/config')


// token
function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async userLogin(req, res) {
    try {
      await User.findOne({
        userName: req.body.userName
      }, function (err, user) {
        .........
      })
    }
  }
}
```

- 登录成功返回
```bash
success: true,
message: '登录成功',
token: 'token值'
```

- 登录成功返回
```bash
success: false,
message: '登录失败', (或其他信息详情看文件)
token: ''
```
- 对用户的密码判断
```bash
 user.comparePassword(req.body.pass, (err, isMatch) => {
     ...
 }
```

- 更多内容[地址](https://github.com/xiaotiandada/My-music/tree/master/service/controllers)

---

> ### 总结

- 通过上面的练习学习了更多新知识

- 更加理解前后端的交互

- 加强了技术掌握程度

- 还有很多不符合现在开发的规范

- 代码不够精简干练

- 基础知识掌握不牢固

- 设计审美水平需要提升

- ......

大概就是这么多吧, 项目还有很多部规范的地方以后会慢慢改正, 虽然是个人里练习的项目, 自己还是话了很多时间和心血

最后 最后 最后 说一个厚脸皮的话 小哥哥小姐姐如果觉得不错的话可以给小生点一个 [Star](https://github.com/xiaotiandada/My-music) 嘛 谢谢哇QAQ~~

自己马上就要实习了 有大佬看上带走的吗！QAQ