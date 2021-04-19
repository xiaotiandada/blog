---
title: github+hexo搭建博客
date: 2018-01-27 00:01:31
tags:
categories: Github
---
小白开始写博客2333~~(大佬不要喷),最终选择了github+hexo(穷!),下面就分享一下怎么用github+hexo搭建一个博客,网上已经有不少大佬写了教程我自己也参考了不少(虽然[官网](https://hexo.io/zh-cn/)已经写得很全了),下面就开工干活.

<!-- more -->

### 第一步

``` bash
$ npm install hexo-cli -g
```

需要nodejs环境(这个就不多说了,大家都懂不懂的可以[baidu](https://www.baidu.com/) or [google](https://www.google.com))

### 第二步

``` bash
$ hexo init <folder>
$ cd <folder>
$ npm install
```

Hexo 将会在指定文件夹中新建所需要的文件( [Doc](https://hexo.io/zh-cn/docs/setup.html) )

### 第三步

``` bash
$ hexo server         (启动服务 默认4000端口)
or
$ hexo s              (这样好像ok)
or
$ hexo server -p 5000 (自定义端口)
```

命令以启动服务器，您的网站会在 http://localhost:4000 下启动。在服务器启动期间，Hexo 会监视文件变动并自动更新，您无须重启服务器。( [Doc](https://hexo.io/zh-cn/docs/server.html) )

### 第四步

``` bash
$ hexo generate
or
$ hexo g              (这样好像ok)
```

生成文件,使用 Hexo 生成静态文件快速而且简单。( [Doc](https://hexo.io/zh-cn/docs/generating.html) )

### 第五步

在你的github账户New一个Repositories(如果没github的老哥可以注册一个 [Github](https://github.com) ),
会有像下面一样的英文(跟白说一样),开始自己是直接通过git命令push到仓库,结果不行出现一个警告(太蠢了).然后换了方法.仓库名必须是你的githubName加上github.io作为后缀  比如: xiaotiandada.github.io !!!

``` bash
echo "# xiaotiandada.github.io" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/xiaotiandada/xiaotiandada.github.io.git
git push -u origin master
```

### 第六步

将你的Github与Hexo结合起来,第一次需要设置Git的UserName和UserEmail

``` bash
$ git config --global user.name "yourName"
$ git config --global user.email your@email.com
```

详细可以参考这个博客或者自行百度搜索方法( [Doc](https://www.cnblogs.com/fengxiongZz/p/7707219.html) )

### 第七步

万事俱备 只欠部署,在部署前需要安装 hexo-deployer-git.(因为部署在github),详情看( [Doc](https://hexo.io/zh-cn/docs/deployment.html) )

``` bash
$ npm install hexo-deployer-git --save
```

配置_config.yml文件,下面是我自己的配置信息

``` bash
deploy:
  type: git
  repo: git@github.com:xiaotiandada/xiaotiandada.github.io.git
  branch: master

```

### 第八步

``` bash
$ hexo deploy
```

Hexo 提供了快速方便的一键部署功能，让您只需一条命令就能将网站部署到服务器上。

### 第九步

打开Github仓库 找到xiaotiandada.github.io 这个仓库点击settings滑动到 GitHub Pages 有一个连接(绿色勾勾 :  Your site is published at https://xiaotiandada.github.io/ ) 就可以预览你的博客

### 第十步

默认主题太丑改主题, 找到喜欢的主题 ( [知呼Hexo主题连接](https://www.zhihu.com/question/24422335) ) 自己默认选择了第一个 Next

``` bash
$ cd themes   (你的主题文件夹)
$ git clone --branch v5.1.2 https://github.com/iissnan/hexo-theme-next themes/next   (下载Next主题)
```

打开配置_config.yml文件,下面是我自己的配置信息

``` bash
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: next   (你的主题名字)
```
最后就没事了,可以重复第四步和第八步. 大功告成 如果有错字的地方欢迎'举报我' 我的 Qq:952822399 然后就可以预览我的博客( [小田的博客地址](https://xiaotiandada.github.io/) )
