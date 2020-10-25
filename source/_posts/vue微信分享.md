---
title: vue微信分享
date: 2019-11-02 00:30:30
tags:
categories: vue
---

[上文 配置环境](https://xiaotiandada.github.io/2019/10/23/%E6%9C%AC%E5%9C%B0%E8%B0%83%E8%AF%95%E5%BE%AE%E4%BF%A1SDK/)

这篇主要是分享vue做微信分享

<!-- more -->

假设本地的开发环境已经准备好了!!! 👍 并且你有一个好的同事为你写好了接口😊


npm的地址

[sdk](https://www.npmjs.com/package/weixin-js-sdk)
[axios](https://www.npmjs.com/package/axios)

```bash
npm install weixin-js-sdk #微信官方js-sdk

npm install axios #基于Promise的HTTP客户端，用于浏览器和node.js
```

新建一个js文件(假如他叫wechat_share.js)

```js
import wx from 'weixin-js-sdk'
import axios from 'axios'

export default ({ title, desc, link, imgUrl }) => {
  let defaultTitle = '默认标题'
  let defaultDesc = '默认描述'
  let defaultLink = window.location.href
  let defaultimgUrl ='默认图片'
  // 通过接口获取签名信息, 传递url过去, url 需要 encodeURIComponent
  axios
    .get(`/xxx/sign?url=${encodeURIComponent(defaultLink)}`)
    .then(res => {
      if (res.status === 200 && '其他判断') {
        let { hash, timestamp, nonce } = res.data.data
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'xxxxxx', // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr: nonce, // 必填，生成签名的随机串
          signature: hash, // 必填，签名
          jsApiList: [
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'onMenuShareAppMessage'
          ]
        })
        wx.error(function(res) {
          console.log('wechat error', res)
        })
        wx.ready(function() {
          wx.updateAppMessageShareData({
            title: title || defaultTitle,
            desc: desc || defaultDesc,
            link: link || defaultLink,
            imgUrl: imgUrl || defaultimgUrl,
            success: function() {
              console.log('wechat share success updateAppMessageShareData')
            }
          })
          wx.updateTimelineShareData({
            title: title || desc || defaultTitle,
            link: link || defaultLink,
            imgUrl: imgUrl || defaultimgUrl,
            success: function() {
              console.log('wechat share success updateTimelineShareData')
            }
          })
          // 即将废弃，适配电脑版微信，参考：https://mp.weixin.qq.com/wiki?action=doc&id=mp1421141115#10
          wx.onMenuShareAppMessage({
            title: title || defaultTitle,
            desc: desc || defaultDesc,
            link: link || defaultLink,
            imgUrl: imgUrl || defaultimgUrl,
            success: function() {
              console.log('wechat share success onMenuShareAppMessage')
            }
          })
        })
      }
    })
}
```

封装了一个简单的方法, 用户做微信分享 我们只需要调用方法, 并且传递信息即可, 里面的标题信息可以根据自己的实际情况修改!!!

接下来只需要在使用的地方调用即可(我在全局写了一个)

```js
// main.js
import wechatShare from 'wechat_share'
Vue.prototype.$wechatShare = wechatShare

// other.vue xxx used

this.$wechatShare({})
```

如果每个页面都调用一次那就太麻烦了, 利用router的钩子函数, 然后把方法放入router.js 里面, 使用 router.afterEach 方法([全局后置钩子](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%90%8E%E7%BD%AE%E9%92%A9%E5%AD%90))

```js
// router.js
import wechatShare from 'wechat_share'

router.afterEach((to, from) => {
  wechatShare({})
})
```
然后每个页面都会拥有分享功能(😄😄😄😄)

---

但是这里有一个问题⚠️️️️️⚠️️️️️⚠️️️️️, 切换页面 然后去签名的时候, 微信报错说是无效签名!!!!

原因是因为传递的localhost.href与当前页面不符合!!!

因为router.afterEach是异步的(别人这样说的)然后需要通过this.$nextTick来解决(用setTimeout也可以 但是不太好 你懂的233)
```js
// router.js
import wechatShare from 'wechat_share'
import Vue from 'vue'

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    wechatShare({})
  })
})
```

在router里面使用讲this.$nextTick修改为Vue.nextTick(这样就可以解决, router.afterEach获取的localhost.href与当前页面不符合的问题

然后就是一个个别页面, 需要定制化内容分享, 调用方法即可

```js
// 异步
async xx() {
  await xx().then(() => {
      this.$wechatShare({
        title,
        desc,
        imgUrl
      })
  })
}

// 同步
this.$wechatShare({
  title,
  desc,
  imgUrl
})
```

如果是异步的只需要在调用完方法之后, 调用写入内容即可(🚀🚀🚀)

---

如果每个页面都想设置怎么办???

解决方案 在router的meta里面配置一些简单的信息即可

```js
...
router: [
     {
      path: '/',
      name: 'index',
      component: () => import(/* webpackChunkName: "index" */ 'index.vue'),
      meta: {
        title: 'xxxxxxxxxx'
        ....
      }
    },
]
...

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    wechatShare({
      title: to.meta.title
    })
  })
})
```

在钩子函数afterEach里面设置默认的title: to.meta.title 👍 🚀 🔥

效果图

[体验地址](https://matataki.io/) 微信打开会自动跳转的

https://matataki.io/

![效果图](vue微信分享/1.png)

