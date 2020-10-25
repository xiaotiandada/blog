---
title: node mysql 增删改查【简易版】
date: 2019-09-02 14:35:40
tags:
categories:
 - [node]
 - [mysql]
---

学习 node mysql, 然后做了一些简单的增删改查, 小小总结总结 Go!!!

<!-- more -->

资料: https://www.oschina.net/translate/using-node-mysql-javascript-client

## init

使用 express 初始化

``` js
const express = require('express')
const app = express()

app.use('/', (req, res) => {
  res.send(`hello world`)
})

app.listen(3000, () => console.log('port in 3000'))

```
懒得截图, 运行localhost:3000 就能看到hello world (擅长输出hello world 233)

然后添加了nodemon 自动重启

```js
yarn add nodemon -D

// package

"dev": "nodemon index.js"

yarn dev
```

方便

## mysql

npm mysql

文档: https://www.npmjs.com/package/mysql

```js
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});
connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();
```

上面需要根据实际情况修改, 比如说账号密码数据库

数据库我是用 Tool 创建的(不会终端命令 我真垃圾)

- navicat premium 有免费试用时间

然后mysql我是用 brew 下载的 (方便)

```
brew install mysql
```

这里遇到一个问题

```
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

解决方案:
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

## 增

**数据新建了一个image, 设置主键ID key 自增**

```js
// 插入数据 id自增
const sqlAdd = () => {
  // posts 表名
  let sqlAdd = 'INSERT INTO image SET ?';
  let sqlAddJson = {
    url: Math.floor(Math.random()*100) + '我是url',
    title: Math.floor(Math.random()*100) + '我是标题'
  }
  connection.query(sqlAdd, sqlAddJson, (err,res) => {
    if(err) return console.log('INSERT INFO ERROR:',err.message);
    console.log('INSERT INFO', res.insertId);
  });
}
// sqlAdd()

```

## 删

```js
// 删除数据 id
const sqlDelete = id => {
  // 通过id查询
  let sql = `DELETE FROM image WHERE id = ?`;
  connection.query(sql, [id] , (err,res) => {
    if(err) console.log('[DELETE ERROR]:',err.message);
    console.log('DELETE', res.affectedRows);
  });
}
// sqlDelete(2)
```

## 改

```js
// 更新数据 id
const sqlUpdate = id => {
  let sqlAddJson = {
    url: Math.floor(Math.random()*100) + '我是url',
    title: Math.floor(Math.random()*100) + '我是标题'
  }
  // 需要改的数据和查询id
  let sqlAdd = `UPDATE image SET url = ?, title = ? WHERE id = ?`;
  connection.query(sqlAdd, [sqlAddJson.url, sqlAddJson.title, id], (err,res) => {
    if(err) return console.log('UPDATE ERROR:',err.message);
    console.log('UPDATE', res.changedRows);
  });
}
// sqlUpdate(2)
```
## 查

```js
// 查询数据
const sqlSelect = () => {
  // 查询那个表
  let sql = 'SELECT * FROM image';
  connection.query(sql,  (err,result) => {
    if(err) console.log('[SELECT ERROR]:',err.message);
    console.log('result', JSON.stringify(result));  //数据库查询结果返回到result中
  });
}
// sqlSelect()
```

## end

很简易的增删改查 嘿嘿