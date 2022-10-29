<!-- 前端监控 Sentry -->



### Sentry

- https://sentry.io/welcome/



为了更好定位用户的错误，可以通过关键字搜索标签来判断用户的错误是什么 🤔

### 关键词搜索

- 搜索用户浏览器

`browser.name:"Chrome" `

- 搜索平台

`browser.name:"Chrome" os.name:Windows `

![image-20221030004455543](https://i.imgur.com/sANkt0u.png)

![image-20221030004609487](https://i.imgur.com/OkgYQI3.png)

### 错误排查

#### TypeError

```
Invalid input, address can't be parsed
```

暂时看不到源码（待研究），通过编译后的错误信息查询问题所在。

>123.{snip} unction mVe(e){try{const t=Gi(e);return gVe(t)}catch{throw new TypeError("Invalid input, address can't be parsed")}}function zp(e){return ty {snip}

继续向下查看调用方法

> return typeof e=="string"&&e.length>0

> r==null?void 0:r.username)&&r.username.startsWith("0x")?zp(r==null?void 0:r.username

通过内容找到定义的方法。自己写的方法并没有定义 “Invalid input, address can't be parsed” 所以可能出现在包里面。

通过寻找 node_modules 和 GitHub Repo 寻找源码方法，一直找到错误输出所在判断 Bug 原因。

```ts
throw new TypeError("Invalid input, address can't be parsed")
```

![image-20221030004654391](https://i.imgur.com/Mee1Yv9.png)