---
title: Position Sticky and Table Headers【表格头部固定】
date: 2019-07-15 11:16:27
tags:
categories: Css
---

## 搬砖系列

[Position Sticky and Table Headers (css-tricks.com)](https://css-tricks.com/position-sticky-and-table-headers/?unapproved=1748290&moderation-hash=d1f92665656ca041fa89843eaa10b10f#comment-1748290)

防止大家打不开Page,我特地复制了下来(偷懒添加内容)

<!-- more -->

You can't position: sticky; a `<thead>`. Nor a `<tr>`. But you can sticky a `<th>`, which means you can make sticky headers inside a regular ol' `<table>`. This is tricky stuff, because if you didn't know this weird quirk, it would be hard to blame you. It makes way more sense to sticky a parent element like the table header rather than each individiaul element in a row.

The issue boils down to the fact that stickiness requires position: relative to work and that [doesn't apply to `<thead>` and `<tr>`](https://bugs.chromium.org/p/chromium/issues/detail?id=702927#c1) in the CSS 2.1 spec.

There are two very extreme reactions to this, should you need to implement sticky table headers and not be aware of the `<th>` workaround.

- Don't use table markup at all. Instead, use different elements (`<div>`s and whatnot) and other CSS layout methods to replicate the style of a table, but not locked out of using position: relative and creating position: sticky parent elements.
- Use table elements, but totally remove all their styling defaults with new display values.

The first is dangerous because you aren't using semantic and accessible elements for the content to be read and navigated. The second is almost the same. You can go that route, but need to be really careful to re-apply semantic roles.

Anyway, none of that matters if you just stick (get it?!) to using a sticky value on those `<th>` elements.


It's probably a bit weird to have table headers as a row in the middle of a table, but it's just illustrating the idea. I was imagining colored header bars separating players on different sports teams or something.

Anytime I think about data tables, I also think about how tricky it can be to make them responsive. Fortunately, there are a variety of ways, all depending on the best way to group and explore the data in them.

大概就是这么多内容(自己翻译2333 逃)

## View

我这个写的比较简陋, 大家可以看原文的Demo,样式写得挺多的(好看++)

<iframe src="https://codei.netlify.com/gist/489b67de218cf9e436ea3510738ebd01" width="100%" height="600"></iframe>

## HTML

```html
...
<table>
  <thead>
    <tr class="red">
      <th>Name</th>
      <th>Age</th>
      <th>Job</th>
      <th>Color</th>
      <th>URL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Lorem.</td>
      <td>Ullam.</td>
      <td>Vel.</td>
      <td>At.</td>
      <td>Quis.</td>
    </tr>
    ...
  </tbody>
</table>
```

大概就是这样的, 然后通过css设定tr th来达到固定表头

## CSS

```css
table {
  text-align: left;
  position:relative;
  border-collapse: collapse;
}
tr.red th {
  background: #ff4b4b;
}
tr.green th {
  background: #0db50d;
}
tr th {
  position: sticky;
  top: 0;
  padding: 10px 4px;
  color: #fff;
}
```

通过设置 tr rh position: sticky, (记得设置top or bottom 评论是这样说的 具体为什么我也不造233)

**评论**
>  reminder, folks: don’t forget to add a scope attribute to your th elements.
Also, define a top (or bottom) property for the sticky elements (can’t count the times I couldn’t understand why it didn’t work ‍♂️).

搬砖结束(🍑