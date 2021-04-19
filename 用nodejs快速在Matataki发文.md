---
title: 用nodejs快速在Matataki发文
date: 2020-01-27 20:52:26
tags: 
categories:
	- [node]
---

如何用nodejs快速在Matataki发文, 利用node爬虫来获取网页的内容然后转发到[matataki](https://www.matataki.io/)上面

这里就自己的[blog](https://xiaotiandada.github.io/)做一个简单的**example** 这是可能需要用的[接口文档](https://xiaotiandada.github.io/matatakiApi)⬇️⬇️⬇️ (docsify真香)

<!-- more -->

![](https://i.loli.net/2020/01/27/V5oPbDI9QANXcGJ.png)

### 开始

1. 首先我们先初始一个项目

   ```bash
   mkdir matataki-post
   npm init -y
   touch index.js
   ```

2. 理清思路

   就像怎么把大象🐘装进冰箱一样 1.... 2... 3... 首先我们需要在[matataki](https://www.matataki.io/article)上面注册一个账号, 我选择了邮箱 因为很简单也很方便 注册也挺快的, 然后去发布一篇文章 看看接口是如何调用的

   **编辑**

   ![](https://i.loli.net/2020/01/27/Lp29OskI6whtKdx.png)

   **发布**

   ![](https://i.loli.net/2020/01/27/KzcSsa6kIovujWE.png)

   分析Networ 

   编辑: 我们在编辑文章的时候可以看出上传图片调用接口是 /post/uploadImage, 于是我们可以忽略其他接口调用

   发布: 发布的时候, 可以看出我们一共调用了两个核心的接口, 一个是ipfs上传, 一个是文章上传

   

   **思路**

   ```tex
   // 1、获取内容
   	// 1、获取html
   	// 2、解析dom获取内容
   // 2、发布文章
   	// 1、转存文章封面 因为文章的图片是外站的 我们需要转存到matataki上面才行
   	// 2、上传ipfs
   	// 3、上传文章
   ```

   

3. 获取网页内容并解析dom

   因为我的blog是静态页面 所以用[superagent](https://www.npmjs.com/package/superagent)就可以抓取到内容了, 如果是客户端渲染抓去内容可能有问题, 可以考虑用[puppetter](https://www.npmjs.com/package/puppeteer)做爬虫, 然后用[cheerio](https://www.npmjs.com/package/cheerio)来解析dom 回味jq,  请求用[axios](https://www.npmjs.com/package/axios)因为做前端习惯了🍑

   ```bash
   npm i superagent cheerio axios
   ```

   ```javascript
   const superagent = require("superagent");
   const cheerio = require("cheerio");
   const axios = require("axios");
   // ...
   // 获取内容
   const getHtml = async url => {
     try {
       // 根据url获取内容
       const res = await superagent.get(url);
       return res.text;
     } catch (err) {
       console.error(err);
       return false;
     }
   };
   
   // 拆dom 这块根据自己页面自定义
   const getDom = html => {
     if (!html) return false; // 没html返回
     const $ = cheerio.load(html);
     // 我的标题
     let title = $("#main #posts .post-header .post-title");
     // 描述
     let desc = $("#main #posts .post-body").text();
     // 内容
     let content = $("#main #posts .post-body").html();
     // 文章封面
     let cover = $("#main #posts .post-body img");
   	
     // 如果有标题
     let titleRes = title.length >= 1 ? $(title[0]).text() : "";
     // 如果有图片
     let coverRes = cover.length >= 1 ? $(cover[0]).attr("src") : "";
   	
     // 把数据返回出去
     return {
       title: titleRes,
       desc,
       content,
       cover: coverRes
     };
   };
   ```

   这块还是挺简单的233~~~

   ```bash
   # 然后我们可以调用方法 启动
   node index
   
   # 如果不出意外的话, 数据就能正常返回了 懒得截图了
   ```

4. 发布文章

   首先我们需要一些平台需要的信息, 

   - **TOKEN**, 可以去控制台的**Cookies**里面寻找, 找到一个**key**为 **ACCESS_TOKEN** 然后复制信息
   -  **URL** 就是需要转发的文章 
   - **AUTHOR**是你这个账号在平台的用户名
   -  **PLATFORM** 是你这个账号的类型, 比如我是邮箱账号 我就是为 **email**

   ```javascript
   const TOKEN = ""; // 身份证明
   const URL = ""; // 需要发的文章
   const AUTHOR = ""; // 用户名
   const PLATFORM = "email"; // 账号类型 邮箱账号
   ```

   然后我们需要一个**config**文件 我也这种做法对不对 反正能用🍑 如果你觉得直接写在index.js要方便 可以简化这步

   ```javascript
   // config.js
   module.exports = {
     // 接口地址
     api: {
       development: "",
       production: "https://api.smartsignature.io"
     },
     // 页面地址
     webUrl: {
       development: "",
       production: "https://www.matataki.io"
     }
   }
   
   // index.js
   const config = require('./config') // config
   const mode = process.env.NODE_ENV || 'production'; // 模式
   const API = config.api[mode]; // 接口
   const webUrl = config.webUrl[mode]; // 页面地址
   ```

   增加两个命令  **dev**  **start** 来区分  **development** 和 **production**

   ```javascript
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "dev": "NODE_ENV=development node index",
       "start": "NODE_ENV=production node index"
     },
   ```

   把内容发布到**ipfs**

   ```javascript
   const qs = require("qs");
   // ...
   
   console.log('开始获取Html...');
   let resHtml = await getHtml(URL);
   console.log('获取Dom...');
   let resDom = await getDom(resHtml);
   
   let data = {
       title: resDom.title.trim(),
       author: AUTHOR,
       desc: resDom.desc.trim(),
       content: resDom.content.trim()
     };
     data.desc = data.desc.replace(/[\r\n]/g, ""); // 去除回撤换行
     data.content = data.content.replace(/[\r\n]/g, ""); // 去除回撤换行
     let hash = await postIpfs(data);
     if (!hash) return console.log("not hash", hash);
   
   // 发布到ipfs
   const postIpfs = async ({ title, author, desc, content }) => {
     try {
       if (!TOKEN) throw new Error("没有token");
       const stringifyData = qs.stringify({
         "data[title]": title,
         "data[author]": author,
         "data[desc]": desc,
         "data[content]": content
       });
       let res = await axios({
         method: "post",
         url: `${API}/post/ipfs`,
         data: stringifyData,
         headers: { "x-access-token": TOKEN }
       });
       // console.log(res.data);
       if (res.status === 200 && res.data.code === 0) {
         return res.data.hash;
       } else return false;
     } catch (error) {
       console.log(error);
       return false;
     }
   };
   ```

   需要的 **x-access-token** 已经在前面定义过了, 成功请求后会返回**hash**地址

   然后转存图片

   > 下载图片这块, 按照**search**到的**code**没有修改, 使用**request**请求图片, 并且写入文件, 当然我也发现一个不错的第三方库, [image-downloader](https://www.npmjs.com/package/image-downloader) 这个可以很轻松的下载图片

   ```javascript
   const FormData = require('form-data');
   const fs = require('fs')
   const request = require('request')
   const path = require('path')
   // ...
   // 图片转存
   const downloadImage = async url => {
     if (!url) {
       console.log('没有url地址')
       return false
     }
     // https://github.com/Kerminate/douban-movies/blob/9119c276b2785b329f62cca684bc6d6459a7c57e/server/tasks/smms.js
   
     // 下载图片
     const downResources = (url, imgPath) => {
       return new Promise((resolve, reject) => {
         request
           .get(url)
           .pipe(fs.createWriteStream(imgPath))
           .on('finish', () => {
             resolve()
           })
       })
     }
   
     const fileName = 'photo.png'
     const imgPath = path.resolve(__dirname, './photo.jpg')
     try {
       await downResources(url, imgPath)
       // fix Callback must be a function
       const buffer = await fs.readFileSync(imgPath)
       const base64Image = Buffer.from(buffer).toString('base64')
   
       const form = new FormData()
       form.append('smfile', Buffer.from(base64Image, 'base64'), {
         filename: fileName
       })
       let headers = form.getHeaders()
       headers['x-access-token'] = TOKEN
       const res = await axios({
           method: 'POST',
           url: `${API}/post/uploadImage`,
           headers: headers,
           data: form
         })
       // console.log(res.data)
       if (res.status === 200 && res.data.code === 0) {
         return res.data.data.cover
       } else {
         console.log('fail, status: ', res.status)
         return false
       }
     } catch (err) {
       console.log('update error', err)
       return false
     }
   };
   ```

   图片上传的核心我是从**github**里面**search**的

   ```javascript
   // ...
   // 这里的一些转换我没有弄明白, 前端一般直接一个file或者一个blob就上去了
   // 在node里面这个Buffer我还没有理解 希望大佬们看到了能教我一手👋!!!
   const base64Image = Buffer.from(buffer).toString('base64')
   const form = new FormData()
   form.append('smfile', Buffer.from(base64Image, 'base64'), {
     filename: fileName
   })
   // ...
   ```

   上传成功后会返回一个**url**地址, 如果是**smms**之类的图床上传记得多写一些判断他会判断**重复**的图片

   图片也有了之后就是上传文章了

   ```javascript
   // 发布文章
   const post = async data => {
     try {
       let res = await axios({
         method: "post",
         url: `${API}/post/publish`,
         data: data,
         headers: { "x-access-token": TOKEN }
       });
       // console.log(data, res.data);
       if (res.status === 200 && res.data.code === 0) {
         return res.data;
       } else {
         console.log('fail', res.data)
         return false;
       }
     } catch (error) {
       console.log('error', error)
       return false;
     }
   };
   
     console.log('发送到Matataki...');
   	// 大部分的参数按照我这个默认就好了
     let resPost = await post({
       author: AUTHOR,
       cover,
       fissionFactor: 2000,
       hash: hash,
       platform: PLATFORM,
       publickey: null,
       sign: null,
       msgParams: null,
       signId: null,
       title: resDom.title,
       is_original: 0,
       tags: "",
       cc_license: null,
       commentPayPoint: 1,
       shortContent: ""
     });
     if (resPost) {
       console.log(`发送成功, 您的文章地址: ${webUrl}/p/${resPost.data}`)
     } else {
       console.log('发送失败!!!')
     }
   ```

   成功后会返回一个文章**id**然后我们去访问`` console.log(`发送成功, 您的文章地址: ${webUrl}/p/${resPost.data}`)``



到此流程就完全结束了!!! 归纳调用

```javascript
// 开始
const init = async () => {
  console.log('开始获取Html...');
  let resHtml = await getHtml(URL);
  console.log('获取Dom...');
  let resDom = await getDom(resHtml);

  console.log('开始发送到ipfs...');
  let data = {
    title: resDom.title.trim(),
    author: AUTHOR,
    desc: resDom.desc.trim(),
    content: resDom.content.trim()
  };
  data.desc = data.desc.replace(/[\r\n]/g, ""); // 去除回撤换行
  data.content = data.content.replace(/[\r\n]/g, ""); // 去除回撤换行
  let hash = await postIpfs(data);
  if (!hash) return console.log("not hash", hash);

  console.log('转存下载图片...');
  let cover = await downloadImage(resDom.cover);
  if (!cover) return console.log('下载图片失败')
  console.log('发送到Matataki...');
  let resPost = await post({
    author: AUTHOR,
    cover,
    fissionFactor: 2000,
    hash: hash,
    platform: PLATFORM,
    publickey: null,
    sign: null,
    msgParams: null,
    signId: null,
    title: resDom.title,
    is_original: 0,
    tags: "",
    cc_license: null,
    commentPayPoint: 1,
    shortContent: ""
  });
  if (resPost) {
    console.log(`发送成功, 您的文章地址: ${webUrl}/p/${resPost.data}`)
  } else {
    console.log('发送失败!!!')
  }
};

init()
```

![](https://i.loli.net/2020/01/28/u24DUxmbzJMjAkK.png)

调用结果 看起来还不错🍑

 [预览地址 1991](https://www.matataki.io/p/1991)

[仓库地址](https://github.com/xiaotiandada/matataki-post)

[我的Github](https://github.com/xiaotiandada)

---

由于这是一个简单的**example** 所以不会弄得太复杂 简单的爬虫加上调用接口即可。

因为不太会node 全完自己瞎鼓捣, 如果写的不对或者不好的地方希望大佬们多多指点 指点

也欢迎加入QQ Group ID:718639024 来吐槽我🤮🤮🤮