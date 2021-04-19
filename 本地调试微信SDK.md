---
title: 本地调试微信SDK
date: 2019-10-23 13:05:50
tags:
categories: other
---

这里使用vue(其他道理应该也是一样的), 因为微信的sdk只能在他的域名下才能正常使用, 我们又不能去服务端开发然后build, 所有在本地调试微信sdk就很有必要了,(微信分享在另一篇会写)

<!-- more -->

首选假设你有一个备案并且在微信设置好了域名(自己配置, 或者有一个好的同事👍)

假如你的域名是**www.wx.com**

## 工具

Nginx

iHost(mac一个修改host的软件)

调试器 微信开发工具(Google搜索 官网下载)

[微信SDk文档](https://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS-SDK%E6%8E%A5%E5%8F%A3)


## go

首先需要了解一下什么是[host](https://baike.baidu.com/item/hosts), 然后我们要做的就是修改本地host文件, 访问 www.wx.com 的时候访问我们自定义的ip地址

```
127.0.0.1	www.wx.com
```

save之后 我们访问 www.wx.com 会访问本地的 127.0.0.1 (懒得截图)

启动一个vue demo(省略N字)

```bash
vue create *

# ...

yarn serve #这里会跑一个http服务, 端口可能是8080也可能是任意其他
```

然后再回到访问www.wx.com页面(还是无法正常访问本地的vue demo项目), 原因是默认的端口是80, 而我们的服务是8080, 这时候我们需要吧80端口代理到8080(使用nginx)


```bash
# N种安装方法之一

brew install nginx
```

安装完成之后

```
nginx
```

发现会有一个默认的Nginx页面(这里就说明你安装成功了👍) (懒得截图)

```bash
nginx -s stop # 我们停掉它
```

然后找到config文件, nginx的配置文件叫 nginx.conf, 我本地的路径为 /usr/local/etc/nginx (其他平台Google搜索, 查看配置文件在哪儿)

```
server {
	listen 80;
	server_name sstest.frontenduse.top;

  location / {
    proxy_pass http://localhost:8080;
  }
}
```
可以又多个 server

通过 proxy_pass 代理80端口到8080端口(如果默认的80端口暂用, 可以改为别的比如8081 随意)

```bash
nginx # 此时访问localhost, 会进入之前启动的vue demo页面
```

然后去vue demo里面引入微信的sdk 出现如下类似的图就算正常了

具体怎么引入看官方文档(下篇文章会写)

script 或者 import, 然后按照微信的文章配置就好了[微信SDk文档](https://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS-SDK%E6%8E%A5%E5%8F%A3)

![网图](本地调试微信SDK/1.jpg)

网图