---
title: >-
  1449 - The user specified as a definer ('this is user name'@'%') does not
  exist
date: 2020-08-06 10:20:10
tags:
categories: mysql
---

本地因为有一张 **views** 的 **definer** 是 **DEFINER**, 所以导致接口调用和直接打开都抛出错误 因为 **sql** 不熟练 直接用 **Navicat** 修改好了

<!-- more -->

⬇️ 可能因为软件不同 操作会有点不一样 但是应该大同小异

1. 选中有问题的 views 右键 
2. Design Views
3. 找到 SQL Security 选择 INVOKEY
4. 保存

