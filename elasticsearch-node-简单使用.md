---
title: elasticsearch node 简单使用
date: 2020-08-02 22:20:54
tags:
categories: elasticsearch
---

elasticsearch node 简单的使用 [repo](https://github.com/xiaotiandada/brick)

https://juejin.im/entry/6844903607775526919

https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/api-reference-6-8.html#api-search-6-8

https://www.npmjs.com/package/elasticsearch

https://www.npmjs.com/package/egg-es

<!-- more -->

##### 前置条件

1. elasticsearch 环境
2. node(用了 egg) 环境

###### 填充数据

开始选择用了 [elasticsearch](https://www.npmjs.com/package/elasticsearch) 包利用 **js** 直接填充**城市 cities**数据

https://juejin.im/entry/6844903607775526919

> 这里有一些 index、type、id 需要相同 这样才能正确的使用和填充数据删除之类的

```javascript
const elasticsearch = require("elasticsearch");
// 所有城市数据
const cities = require('./cities.json')
const axios = require('axios')

// init apiVersion 需要和本地一样
const client = new elasticsearch.Client({
    host: "localhost:9200",
    log: "trace",
    apiVersion: "6.8", // use the same version of your Elasticsearch instance
});
const sleep = time => new Promise(reslove => setTimeout(reslove, time))

const init = async () => {
    try {
        await client.ping({
            requestTimeout: 30000
        });
    } catch (e) {
        console.log('e', e)
    }
}
init()

// 创建索引
// -> POST http://localhost:9200/es_user/_doc/1/_create
const createFunc = async () => {
    try {
        await client.create({
            index: 'es_user',
            type: '_doc',
            id: '1',
            body: {}
        });
    } catch (error) {
        console.log('create error', error)
    }
}

// 删除
// -> DELETE http://localhost:9200/es_user/_doc/1
const deleteFunc = async () => {
    try {
        await client.delete({
            index: 'es_user',
            type: '_doc',
            id: '1',
        });
    } catch (error) {
        console.log('delete error', error)
    }
}

// 填充数据
const push = (cities, start, end) => {
    var bulk = [];
    cities.slice(start, end).forEach(city => {
        bulk.push({
            index: {
                _index: 'es_user',
                _type: '_doc',
            }
        })
        bulk.push(city)
    })

    // console.log('bulk: go', bulk)

    // 对传递的数据执行批量索引
    client.bulk({
        body: bulk
    }, function (err, response) {
        if (err) {
            console.log("Failed Bulk operation".red, err)
        } else {
            console.log("Successfully imported %s".green, cities.length);
        }
    });

}

// 开始冲
// 这里为什么这样写....
const go = async () => {
	  // 1. 因为例子的json的数据非常大按照官方的建议说 1000-5000个数据 所以我这里拆了一下
    let citiesLen = Math.ceil(cities.length / 1000)
    for (let i = 0; i <= citiesLen; i++) {
	      // 2. 因为有时候老是提示没有权限 然后这里直接 设置一下(可以忽略的 因为第一次不太会)
        await axios({
            method: 'put',
            url: 'http://localhost:9200/_all/_settings',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "index.blocks.read_only_allow_delete": false
            }
        })
	      // 2. 让他停一会儿 懒得用 async map (可以在npm search)
        await sleep(300)
	      // 3. 开始填充数据 
        push(cities, i * 1000, (i+1) * 1000)
    }
}

// deleteFunc()
// createFunc()
// go()
```

##### 写接口

node用了egg初始化的项目

###### router

```javascript
// elasticsearch
router.get('/api/search', controller.elasticsearch.search);
```

###### func

```javascript
// 因为用了 egg 为了方便 用 egg-es 
// https://www.npmjs.com/package/egg-es
// 文档的方法⬇️⬇️⬇️ 

// Usage
// {app_root}/config/plugin.js
exports.elasticsearch = {
  enable: true,
  package: 'egg-es',
};

// Configuration
// {app_root}/config/config.default.js
exports.elasticsearch = {
  host: 'localhost:9200',
  apiVersion: '6.3'
};

export default class Elasticsearch extends Service {
  public async search(wd: string) {
    try {
      // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/api-reference-6-8.html#api-search-6-8
      // search doc 因为body还没有理解 赞赏用了简单的搜索🔍
      const response = await this.app.elasticsearch.search({
        index: 'es_user',
        body: {
          query: {
            match: {
              name: wd,
            },
          },
        }
      })
      console.log('response', response)
      // 格式化一下数据
      const list = response.hits.hits.map((i: { _source: object[] }) => i._source)
      return {
        count: response.hits.total || 0,
        list,
      }
    } catch (e) {
      console.log('search e', e)
      return ''
    }
  }
}

```

数据都已经有了, 前端大伙随便搞搞就好了 后面还有很多功能还没有使用 **分词、过滤、什么什么吧啦吧啦** 后面用到了继续写文章介绍

