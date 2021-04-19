---
title: svg动画用复杂交互动画改善用户体验-练习
date: 2019-07-07 23:53:32
tags: 
categories: Svg
---

书籍中的练习,自己看着效果按照自己的感觉瞎搞的demo,懒得写于是直接贴代码把!!!

发现挺多人搜索这个关键字的(我猜测是下书籍📚的吧hhh)⬇️那我就放pdf吧

**书籍我也是通过网络寻找,无意传播**

链接: [pdfDownload](https://pan.baidu.com/s/1r9-kB2k3EhtLDELjpX5Pwg) 提取码: 6znw 复制这段内容后打开百度网盘手机App，操作更方便哦

> 如有侵权,请联系本人立即删除 QQEmail istianlei@qq.com 谢谢🙏🙏🙏


[书籍Demo](https://codepen.io/sdras/pen/BKaYyG)
[源码](https://github.com/xiaotiandada/Case/tree/master/svg%E5%8A%A8%E7%94%BB%E7%94%A8%E5%A4%8D%E6%9D%82%E4%BA%A4%E4%BA%92%E5%8A%A8%E7%94%BB%E6%94%B9%E5%96%84%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C-%E7%BB%83%E4%B9%A0/%E4%B8%8D%E5%AE%9E%E7%94%A8%E9%A2%9D%E5%A4%96%E7%9A%84%E5%BA%93%E6%9D%A5%E5%88%9B%E5%BB%BAUI%7CUX%E5%8A%A8%E7%94%BB)

<!-- more -->

<iframe width="100%" height="600" src="https://codei.netlify.com/gist/b4c50cbd51edb77d431fe4d5929128ab"></iframe>

### HTML

随意写的,主要用svg画一些线条和圆,具体的大家可以参考svg文档把

```html
  ...
  <svg class="magnifier" vieBox="0 0 300 46">
    <!-- 圆 -->
    <circle class="magnifier-c" cx="20" cy="20" r="16" fill="none" stroke="#fff"></circle>
    <!-- 线 -->
    <line class="magnifier-l-c" x1="10" y1="10" x2="20" y2="20" fill="none" stroke="#fff" />
  </svg>
  ...
```

### CSS

css部分写得比较乱(我真垃圾!!!)

主要通过Element添加class来切换(能用css的就不用js)

随便贴一点意思意思emmm

```css
.magnifier-l-c,
 .line-line,
 .main input {
  /* 避免引起回流 */
  visibility: hidden;
  opacity: 0;
}

.magnifier.open .magnifier-l-c, 
.main.open .line-line,
.main.open input {
  /* 避免引起回流 */
  visibility: visible;
  opacity: 1;
}
```

### JS

```js
// 获取Element
let magnifier = document.querySelector('.magnifier')
let main = document.querySelector('.main')
let line = document.querySelector('.line')
// set click
magnifier.onclick = function() {
  // 判断是否有class
  let hasOpen = magnifier.classList.contains('open')
  console.log(hasOpen)
  // 设置 class
  if (hasOpen) {
    magnifier.classList.remove('open')
    main.classList.remove('open')
    line.classList.remove('open')
  } else {
    magnifier.classList.add('open')
    main.classList.add('open')
    line.classList.add('open')
  }
}
```

okk了, 大概就这么多,然后具体的可以看源码和书籍Demo

[书籍Demo](https://codepen.io/sdras/pen/BKaYyG)
[源码](https://github.com/xiaotiandada/Case/tree/master/svg%E5%8A%A8%E7%94%BB%E7%94%A8%E5%A4%8D%E6%9D%82%E4%BA%A4%E4%BA%92%E5%8A%A8%E7%94%BB%E6%94%B9%E5%96%84%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C-%E7%BB%83%E4%B9%A0/%E4%B8%8D%E5%AE%9E%E7%94%A8%E9%A2%9D%E5%A4%96%E7%9A%84%E5%BA%93%E6%9D%A5%E5%88%9B%E5%BB%BAUI%7CUX%E5%8A%A8%E7%94%BB)