---
title: Node.js 开发简单的脚手架工具
date: 2020-12-30 13:28:16
tags:
---

像我们熟悉的 vue-cli，react-native-cli 等脚手架，只需要输入简单的命令，即可快速帮我们生成一个初始项目。在实际工作中，我们可以定制一个属于自己的脚手架，来提高自己的工作效率。

为什么需要需要脚手架？

- 减少重复性的工作，不再需要复制其他项目再删除无关代码，或者从零创建一个项目和文件。
- 根据交互动态生成项目结构和配置文件等。
- 多人协作更为方便，不需要把文件传来传去。

<!-- more -->

> [👆 引用](https://segmentfault.com/a/1190000015222967)

### 参考文章

https://segmentfault.com/a/1190000015222967

https://aotu.io/notes/2016/08/09/command-line-development/index.html

主要看了上面两篇文章，还有一些其他的文章可以参考

https://segmentfault.com/a/1190000038669035

https://zhuanlan.zhihu.com/p/31988855

### download-git-repo 不会写 Repo Address？

https://segmentfault.com/q/1010000012493731/a-1020000015334943

### 结果

https://www.npmjs.com/package/cli-ant

```shell
npm i cli-ant -g

% cli-ant init brick
? 请输入项目描述 project
? 请输入作者名称 xiaotian
? 请选择模版 Vue
? 请选择模版 Vue2
✔ 正在下载模板...
✔ 项目创建成功
```

具体代码可以在 [repo](https://github.com/xiaotiandada/cli-ant) 里面看 写得不好的地方多多指教！！！ ❤️