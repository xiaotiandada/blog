---
title: Nginx 负载均衡
date: 2020-07-10 14:39:18
tags:
categories: Nginx
---

## 一、负载均衡 - 初探

**资料参考:** 

https://zhuanlan.zhihu.com/p/89356016

https://juejin.im/post/5e60edbf5188254940670f75

<!-- more -->

服务器这边使用了 **Nodejs** 分别启两个服务 **7001** **7002**  和 两台机器 启动 **7001**

**Nginx** 这边使用 **upstream** 

nginx的upstream目前支持的5种方式的分配

1、轮询（默认） **本地测试了这种**

每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。

```nginx
upstream node { 
  server 127.0.0.1:7001; 
  server 127.0.0.1:7002; 
} 
```

2 - 4 没有测试过 复制的....

2、指定权重

指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。

```nginx
upstream backserver { 
  server 127.0.0.1:7001 weight=8; 
  server 127.0.0.1:7002 weight=10; 
} 
```

3、IP绑定 ip_hash

每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题。

```nginx
upstream backserver { 
  ip_hash; 
  server 127.0.0.1:7001; 
  server 127.0.0.1:7002; 
} 
```

4、fair（第三方）

按后端服务器的响应时间来分配请求，响应时间短的优先分配。

```nginx
upstream backserver { 
  server 127.0.0.1:7001; 
  server 127.0.0.1:7002; 
  fair; 
} 
```

5、url_hash（第三方）

按访问url的hash结果来分配请求，使每个url定向到同一个后端服务器，后端服务器为缓存时比较有效。

```nginx
upstream backserver { 
  server 127.0.0.1:7001; 
  server 127.0.0.1:7002; 
  hash $request_uri; 
  hash_method crc32; 
} 
```

> max_fails ：允许请求失败的次数默认为1.当超过最大次数时，返回proxy_next_upstream 模块定义的错误
>
> fail_timeout:max_fails次失败后，暂停的时间 (复制的...

在 **Nginx** 定义 测试机

```nginx
http {
	upstream node {
    server 127.0.0.1:7001;
    server 192.168.1.11:7002;
  }
  
  # 因为 80 端口别的占用了 开了7000 代理
  server {
    listen 7000;
    server_name localhost;

    location / {
      proxy_pass http://node;
    }

  }
}

```

```bash
nginx -t

# 如果没有启动先
nginx

nginx -s reload
```

因为 **egg** 定义的 **router** 返回了 **port** 直接访问 **127.0.0.1:7000** 可以查看结果 随机返回 **7001/7002**

测试用了 **jmeter** 但是接口没异常 **jmeter** 倒是g了 使用不太熟练 请求次数太大了 但是效果还是可以看出来的