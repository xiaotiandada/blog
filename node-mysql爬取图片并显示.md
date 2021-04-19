---
title: node-mysql爬取图片并显示
date: 2019-11-03 23:11:39
tags:
categories:
 - [node]
 - [mysql]
---


[node爬虫 简易版【站酷】](https://xiaotiandada.github.io/2019/08/29/node%E7%88%AC%E8%99%AB-%E7%AE%80%E6%98%93%E7%89%88%E3%80%90%E7%AB%99%E9%85%B7%E3%80%91/)

[node mysql 增删改查【简易版】](https://xiaotiandada.github.io/2019/09/02/node-mysql-%E5%A2%9E%E5%88%A0%E6%94%B9%E6%9F%A5%E3%80%90%E7%AE%80%E6%98%93%E7%89%88%E3%80%91/)

结合上面的文章做了一个图片展示

<!-- more -->

![node-mysql爬取图片并显示](node-mysql爬取图片并显示/client.png)

## start

启动node服务, 使用express

```js

const express = require('express')
const app = express()
const router = require('./router')

app.use(router)
app.listen(3000, () => console.log('port in 3000'))

// router
const router = express.Router()
router.get('/', (req, res) => {
  res.send(`hello world`)
})
module.exports = router
```

```bash
node index.js
# 或者利用nodemon监听
nodemon index  # 写入配置文件
```

```js
  "scripts": {
    "dev": "nodemon index.js"
  },
```

```bash
yarn dev

#or

npm run dev
```

在屏幕看见 hello world 就算是成功了

### 修改crawler.js

```js
// 在之前下载图片逻辑后面写入插入数据库逻辑

// ...
const mysql = require('./mysql')
// ...

  // 下载图片
  const download = (item, id) => {
    try {
      let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
      // 通过 superagent 保存图片
      const req =  superagent.get(item.url)
      .set({ 'User-Agent': userAgent })
      // 增加 url title
      let url = `/image/page${id}/${item.title}.png`
      let title = item.title
      // 使用了stream(流)
      req.pipe(fs.createWriteStream(`./static/image/page${id}/${item.title}.png`))
      // 写入数据库
      mysql.sqlAdd(url, title)
      return `下载${item.title}done`
    } catch (error) {
      return console.log(`下载图片失败${item.title}`, error)
    }
  }

// mysql 文件
  // 插入数据 id自增
  sqlAdd  (url, title)  {
    let sqlAdd = 'INSERT INTO image SET ?';
    let sqlAddJson = {
      url,
      title
    }
    connection.query(sqlAdd, sqlAddJson, (err,res) => {
      if(err) return console.log('INSERT INFO ERROR:',err.message);
      console.log('INSERT INFO', res.insertId);
    });
  }

  // 没有做一些错误等预防(2333)
```

插入成功后, 打开数据库查一下

记得启动数据库!!!

```bash
mysql.server start
```

![db](node-mysql爬取图片并显示/db.png)

建表的过程就省略了...

### 查数据

数据有了之后, 开始查询数据

```js
const express = require('express')
const router = express.Router()
const controller = require('./controller')
router.get('/', (req, res) => {
  res.send(`hello world 11qq`)
})

router.get('/allimg', async (req, res) => {
  // 调用controller.js
  let allImg = await controller.getAllImg()
  res.send(allImg)
})

module.exports = router
```

调用controller.getAllImg()并返回

```js
const mysql = require('./mysql')

module.exports = {
  async getAllImg() {
    try {
      // 调用mysql方法
      let res = await mysql.getAllImg()
      return {
        code: 0,
        data: res,
        message: 'success'
      }
    } catch (error) {
      console.log('mysql getAllImg error', error)
      return {
        code: -1,
        data: {},
        message: 'fail'
      }
    }
  }
}
```

调用mysql.getAllImg()并返回


```js
// mysql.js
// 查询所有数据并且返回
  getAllImg() {
    let sql = 'SELECT * FROM image'
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
    })
  }
```

![data](node-mysql爬取图片并显示/data.png)

访问http://localhost:3000/allimg路由之后可能是这样

### 展示

数据有了之后就可以展示了

这里用了[parcel](https://parceljs.org/)打包工具

```bash
# 快速

yarn init -y

touch index.html
touch index.ts
touch index.less

yarn add --dev typescript
yarn add --dev parcel-bundler

// package.json
"scripts": {
  "start": "parcel index.html"
}

yarn start # 启动一个服务, 会有一个新页面
```

```html
<!-- ... -->
  <div id="app"></div>
  <script src="./index.ts"></script>
  <!-- ... -->
```
内容很简单

```ts
// 使用axios
import axios from 'axios'
// 导入 less
import './index.less'
const APP_URL = 'http://127.0.0.1:3000'
const API = axios.create({
  baseURL: APP_URL,
  timeout: 1000
});

API.get('/allimg')
  .then( (res) => {
    console.log(res)
    if (res.status === 200 && res.data.code === 0)
    setList(res.data.data)
  })
  .catch( (error) => {
    console.log(error);
  })


// 写入html结构
const setList = (arr: object[]) => {
  let app = document.querySelector('#app')
  let ulDom = document.createElement('ul')
  ulDom.classList.add('list')
  ulDom.setAttribute('role', 'list')
  let dom: string = ``

  interface Img {
    url: string,
    title: string
  }

  arr.map((i: Img) => {
    dom += `<li>
      <img src="${APP_URL}${i.url}">
      <div>
      <span>url: ${i.url}</span>
      <span>title: ${i.title}</span>
      </div>
    </li>`
  })

  ulDom.innerHTML = dom
  app.append(ulDom)
}
```

然后查看, 发现有问题,接口请求 Network Error (这里是跨域问题)

我们使用cors来解决

```js

// yarn add cors
const express = require('express')
const router = express.Router()
const cors = require('cors') // 导入
const controller = require('./controller')

router.use(cors()) // 全局允许 如果需要单独配置, 看官方文档
router.get('/', (req, res) => {
  res.send(`hello world 11qq`)
})

router.get('/allimg', async (req, res) => {
  let allImg = await controller.getAllImg()
  res.send(allImg)
})

module.exports = router
```

解决跨域之后就出现数据了, 然后把样式美化一下, 到这里上面的图片还没有加上!!!

```less
.list {
  li {
    display: flex;
    align-items: center;
    margin: 6px 0;
    &:hover {
      background-color: #eee;
      img {
        width: 300px;
      }
    }
    & > span {
      font-size: 14px;
      color: #333;
      list-style: 1.5;
    }
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 20px;
    }
  }
  img {
    width: 100px;
    transition: width .3s;
  }
}
```

为了假如图片, 我设置了node静态资源(也不知道做法对不对 反正是跑起来了)

[在 Express 中提供静态文件](https://expressjs.com/zh-cn/starter/static-files.html)

```js

const express = require('express')
const app = express()
// 设置static
app.use(express.static('static'));
const mysql = require('./mysql')
mysql.init()

const router = require('./router')
app.use(router)
// 这里是爬虫的方法
// const crawler = require('./crawler')
// crawler.init()


app.listen(3000, () => console.log('port in 3000'))

```
然后访问接口数据的路径加上http://localhost:3000/就可以了

效果展示

![node-mysql爬取图片并显示](node-mysql爬取图片并显示/client.png)

还有很多优化点可以做, 分页什么什么吧啦吧啦, 代码优化 错误处理 emmmmm