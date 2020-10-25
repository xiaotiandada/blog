---
title: node爬虫 简易版【站酷】
date: 2019-08-29 13:35:12
tags:
categories: node
---

## node爬虫 简易版【站酷】
简单的学习一下node爬虫, 抓取站酷(本来想抓花瓣的,但是因为花瓣是接口调用的 而我想抓dom所以选择了站酷 :)

<!-- more -->

## Result

<img width="400" src="node爬虫-简易版【站酷】/1.png">
<img width="400" src="node爬虫-简易版【站酷】/2.png">


## 资料

https://github.com/liuxing/mm-spider

站酷: https://www.zcool.com.cn

## 库

```js
const superagent = require('superagent');
const cheerio = require('cheerio')
const fs = require('fs-extra')
```

https://www.npmjs.com/ 搜索

## Go

### 获取HTML

```js
const getUrlHtml = async () => {
  try {
    // 外层定义的id
    const res = await superagent.get(`https://www.zcool.com.cn/?p=${id}`);
    return res.text
  } catch (err) {
    console.error(err);
    return false
  }
}
```

使用 superagent 获取html

文档: https://www.npmjs.com/package/superagent

### 拆Dom

```js
const getDom = (html) => {
  if (!html) return // 没html返回
  const $ = cheerio.load(html)
  let arr = [] // 储存需要下载的数据
  // 获取dom 循环写入数据
  $('.all-work-list .work-list-box .card-box').each((i, el) => {
    let img = $(el).find('.card-img a img').attr('src')
    let title = $(el).find('.card-info .card-info-title a').text()
    arr.push({
      title: title.replace(/\//g, ''), // 去掉 / 因为 / 会认为是路径, 根据实际情况来操作
      url: img.replace('@260w_195h_1c_1e_1o_100sh.jpg', '') // 去掉后缀 不使用缩略图 根据实际情况来操作
    })
  })
  return arr
}
```

使用 cheerio 操作html

文档: https://www.npmjs.com/package/cheerio


### 下载图片

``` js
// 睡眠
const sleep = async time => new Promise(resolve => setTimeout(resolve, time))
```

```js
const downloadImg = async arr => {
  // 先删除文件夹 可以不用这步 因为开始写的时候会重复创建 我又懒得删
  try {
    await fs.remove(path.join(__dirname, `/page${id}`))
  } catch (error) {
    console.log('删除文件夹失败')
  }
  // 创建文件夹 根据id命名
  try {
    await fs.mkdir(path.join(__dirname, `/page${id}` ))
  } catch (error) {
    return console.log('创建文件夹失败')
  }
  // 下载图片
  const download = async item => {
    await sleep(100) // 睡眠 降低爬虫的速度
    try {
      // 通过 superagent 保存图片
      const req =  superagent.get(item.url)
      // 使用了stream(流)
      req.pipe(fs.createWriteStream(`./page${id}/${item.title}.png`))
      console.log(`下载${item.title}done`)
    } catch (error) {
      return console.log(`下载图片失败${item.title}`, error)
    }
  }

  // 循环arr数据下载图片
  for (const item of arr) await download(item)
}
```
使用fs下载图片

文档:

https://www.npmjs.com/package/fs-extra

https://nodejs.org/api/fs.html

> 遇到的问题:
>
> 下载图片不能使用async await 好像会提前结束 导致下载图片无法使用(具体可以大佬实验的时候打印Error)(可能是我打开方式不对 请大佬赐教)
>
> 文件名不能带有 / 会认为是路径


### All Code

<details>
<summary>查看所有代码</summary>

```js
const superagent = require('superagent');
const cheerio = require('cheerio')
const fs = require('fs-extra')
const path = require('path')

let id = 1
let maxPage = 10

const sleep = async time => new Promise(resolve => setTimeout(resolve, time))

const getUrlHtml = async () => {
  try {
    // 外层定义的id
    const res = await superagent.get(`https://www.zcool.com.cn/?p=${id}`);
    return res.text
  } catch (err) {
    console.error(err);
    return false
  }
}

const getDom = (html) => {
  if (!html) return // 没html返回
  const $ = cheerio.load(html)
  let arr = [] // 储存需要下载的数据
  // 获取dom 循环写入数据
  $('.all-work-list .work-list-box .card-box').each((i, el) => {
    let img = $(el).find('.card-img a img').attr('src')
    let title = $(el).find('.card-info .card-info-title a').text()
    arr.push({
      title: title.replace(/\//g, ''), // 去掉 / 因为 / 会认为是路径, 根据实际情况来操作
      url: img.replace('@260w_195h_1c_1e_1o_100sh.jpg', '') // 去掉后缀 不使用缩略图 根据实际情况来操作
    })
  })
  return arr
}

const downloadImg = async arr => {
  // 先删除文件夹 可以不用这步 因为开始写的时候会重复创建 我又懒得删
  try {
    await fs.remove(path.join(__dirname, `/page${id}`))
  } catch (error) {
    console.log('删除文件夹失败')
  }
  // 创建文件夹 根据id命名
  try {
    await fs.mkdir(path.join(__dirname, `/page${id}` ))
  } catch (error) {
    return console.log('创建文件夹失败')
  }
  // 下载图片
  const download = async item => {
    await sleep(100) // 睡眠 降低爬虫的速度
    try {
      // 通过 superagent 保存图片
      const req =  superagent.get(item.url)
      // 使用了stream(流)
      req.pipe(fs.createWriteStream(`./page${id}/${item.title}.png`))
      console.log(`下载${item.title}done`)
    } catch (error) {
      return console.log(`下载图片失败${item.title}`, error)
    }
  }

  // 循环arr数据下载图片
  for (const item of arr) await download(item)
}

const init = async () => {
  for (let i = 0; i < maxPage; i++) {
    let urlHtml = await getUrlHtml()
    let getDate = await getDom(urlHtml)
    await downloadImg(getDate)
    id = i + 1
  }
}

init()

```
</details>

源码地址: https://github.com/xiaotiandada/interest-page/tree/master/crawler

## 修改1

--- 分割线 ---

感谢大佬的指点 ----> QQ 923398776

### 资料

https://andyliwr.github.io/2017/12/05/nodejs_spider_ip/

### 使用async控制并发数

```js
  try {
    // async map limit 控制并发数
    async.mapLimit(arr, 20, async item => download(item, id), (err, results) => {
      if (err) throw err
      console.log(results)
    })
  } catch (error) {
    console.log(`async.mapLimit${error}`)
  }
```

文档: https://www.npmjs.com/package/async

### 动态设置UA

```js
    // userAgent
    const userAgents = [ 'Mozilla/5.0 ..'];

    try {
      let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
      // 通过 superagent 保存图片
      const req =  superagent.get(item.url)
      .set({ 'User-Agent': userAgent })
      // 使用了stream(流)
      req.pipe(fs.createWriteStream(`./page${id}/${item.title}.png`))
      return `下载${item.title}done`
    } catch (error) {
      return console.log(`下载图片失败${item.title}`, error)
    }
  }
```

### All Code

<details>
<summary>查看所有代码</summary>

```js

const superagent = require('superagent');
const cheerio = require('cheerio')
const fs = require('fs-extra')
const path = require('path')
const async = require("async");

let id = 1
let maxPage = 10

// userAgent
const userAgents = [
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20',
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0) ,Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
  'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
  'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)',
  'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:2.0b13pre) Gecko/20110307 Firefox/4.0b13pre',
  'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52',
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; LBBROWSER)',
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
  'Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
  'Opera/9.25 (Windows NT 5.1; U; en), Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
  'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
]

const getUrlHtml = async () => {
  try {
    // 外层定义的id
    const res = await superagent.get(`https://www.zcool.com.cn/?p=${id}`);
    return res.text
  } catch (err) {
    console.error(err);
    return false
  }
}

const getDom = (html) => {
  if (!html) return // 没html返回
  const $ = cheerio.load(html)
  let arr = [] // 储存需要下载的数据
  // 获取dom 循环写入数据
  $('.all-work-list .work-list-box .card-box').each((i, el) => {
    let img = $(el).find('.card-img a img').attr('src')
    let title = $(el).find('.card-info .card-info-title a').text()
    arr.push({
      title: title.replace(/\//g, ''), // 去掉 / 因为 / 会认为是路径, 根据实际情况来操作
      url: img.replace('@260w_195h_1c_1e_1o_100sh.jpg', '') // 去掉后缀 不使用缩略图 根据实际情况来操作
    })
  })
  return arr
}

const downloadImg = async (arr, id) => {
  // 先删除文件夹 可以不用这步 因为开始写的时候会重复创建 我又懒得删
  try {
    await fs.remove(path.join(__dirname, `/page${id}`))
  } catch (error) {
    console.log('删除文件夹失败')
  }
  // 创建文件夹 根据id命名
  try {
    await fs.mkdir(path.join(__dirname, `/page${id}` ))
  } catch (error) {
    return console.log('创建文件夹失败')
  }
  // 下载图片
  const download = (item, id) => {
    try {
      let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
      // 通过 superagent 保存图片
      const req =  superagent.get(item.url)
      .set({ 'User-Agent': userAgent })
      // 使用了stream(流)
      req.pipe(fs.createWriteStream(`./page${id}/${item.title}.png`))
      return `下载${item.title}done`
    } catch (error) {
      return console.log(`下载图片失败${item.title}`, error)
    }
  }

  try {
    // async map limit 控制并发数
    async.mapLimit(arr, 20, async item => download(item, id), (err, results) => {
      if (err) throw err
      console.log(results)
    })
  } catch (error) {
    console.log(`async.mapLimit${error}`)
  }

}

const init = async () => {
  for (let i = 0; i <= maxPage; i++) {
    let urlHtml = await getUrlHtml()
    let getDate = await getDom(urlHtml)
    await downloadImg(getDate, id)
    id = i + 1
  }
}

init()


```

</details>


> 不足, 没有动态设置Ip等等, 希望大佬多多指点