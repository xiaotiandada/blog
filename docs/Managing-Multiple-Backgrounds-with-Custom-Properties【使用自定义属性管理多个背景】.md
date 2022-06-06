---
title: Managing Multiple Backgrounds with Custom Properties【使用自定义属性管理多个背景】
date: 2019-07-16 11:10:13
tags:
categories: Css
---

**搬砖系列**

[Managing Multiple Backgrounds with Custom Properties](https://css-tricks.com/managing-multiple-backgrounds-with-custom-properties/?unapproved=1749263&moderation-hash=4b2fa24b7eca1c9d9f90251a3d1ebe93#comment-1749263)

防止大家打不开Page,我特地复制了下来(偷懒添加内容)

> 强烈建议大家看原文

One cool thing about CSS custom properties is that they can be a part of a value. Let's say you're using multiple backgrounds to pull off a a design. Each background will have its own color, image, repeat, position, etc. It can be verbose!

关于CSS自定义属性的一个很酷的事情是它们可以成为值的一部分。假设您使用多个背景来实现设计。每个背景都有自己的颜色，图像，重复，位置等。它可以是冗长的！

You have four images:

你有四张图片：

```css
body {
  
  background-position:
    top 10px left 10px,
    top 10px right 10px,
    bottom 10px right 10px,
    bottom 10px left 10px;
  
  background-repeat: no-repeat;
  
  background-image:
    url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-top-left.svg),
    url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-top-right.svg),
    url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-bottom-right.svg),
    url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-bottom-left.svg);
  
}
```

You want to add a fifth in a media query:

您想在媒体查询中添加第五个：

``` css
@media (min-width: 1500px) {
  body {
    /* REPEAT all existing backgrounds, then add a fifth. */
  }
}
```

That's going to be super verbose! You'll have to repeat each of those four images again, then add the fifth. Lots of duplication there.

这将是超级冗长的！你将不得不再次重复这四个图像中的每一个，然后添加第五个。那里有很多重复。

One possibility is to create a variable for the base set, then add the fifth much more cleanly:

一种可能性是为基本集创建一个变量，然后更干净地添加第五个变量：

```css

body {
  --baseBackgrounds: 
    url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-top-left.svg),
    url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-top-right.svg),
    url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-bottom-right.svg),
    url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-bottom-left.svg);

  background-position:
    top 10px left 10px,
    top 10px right 10px,
    bottom 10px right 10px,
    bottom 10px left 10px;
  
  background-repeat: no-repeat;
  
  background-image: var(--baseBackgrounds);
}
@media (min-width: 1500px) {
  body {
    background-image: 
      var(--baseBackgrounds),
      url(added-fifth-background.svg);
  }
}
```

But, it's really up to you. It might make more sense and be easier manage if you made each background image into a variable, and then pieced them together as needed.

但是，这完全取决于你。如果将每个背景图像变为变量，然后根据需要将它们拼接在一起，则可能更有意义并且更容易管理。

```css
body {
  --bg1: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-top-left.svg);
  --bg2: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-top-right.svg);
  --bg3: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-bottom-right.svg);
  --bg4: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-bottom-left.svg);
  --bg5: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-bottom-left.svg);
  
  background-image: var(--bg1), var(--bg2), var(--bg3), var(--bg4);
}
@media (min-width: 1500px) {
  body {
    background-image: var(--bg1), var(--bg2), var(--bg3), var(--bg4), var(--bg5);
  }
}
```
Here's a basic version of that, including a supports query:

这是它的基本版本，包括支持查询：

--- 懒得用他的codepen了

```css
body {
  margin: 0;
  height: 100vh;
  
  --cloud-1: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/cloud.png);
  
  --cloud-2: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/cloud.png);
  
  --sky: linear-gradient(
    to bottom,
    #80D8FF,
    #40C4FF
  );
  --skyDark: linear-gradient(
    to bottom,
    #333,
    #111
  );
  
  background-size: 
    1000px, 1000px, cover;
  
  background-position: 
    top 25% right 20%, top -5% left 20%, center;
  
  background-repeat: 
    repeat-x, repeat-x, no-repeat;
}

@supports (background-image: url(foo.jpg), url(bar.jpg)) {
    body {
      background-image:
        var(--cloud-1), var(--cloud-2), var(--sky);
    }
  @media (min-width: 700px) {
    body {
      background-image:
        var(--cloud-1), var(--cloud-2), var(--skyDark);
    }
  }
}
```

Dynamically changing just the part of a value is a huge strength of CSS custom properties!

动态更改值的一部分是CSS自定义属性的巨大优势！

Note, too, that with backgrounds, it might be best to include the entire shorthand as the variable. That way, it's much easier to piece everything together at once, rather than needing something like...

另请注意，对于背景，最好将整个速记包含为变量。这样，一次将所有东西拼凑起来要容易得多，而不是需要......

```css
--bg_1_url: url();
--bg_1_size: 100px;
--bg_1_repeat: no-repeat;
/* etc. */
```
It's easier to put all of the properties into shorthand and use as needed:

将所有属性放入速记并根据需要使用会更容易：

```css
body {  
  --bg_1: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-top-left.svg) top 10px left 10px / 86px no-repeat;
  --bg_2: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-top-right.svg) top 10px right 10px / 86px no-repeat;
  --bg_3: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-bottom-right.svg) bottom 10px right 10px / 86px no-repeat;
  --bg_4: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/angles-bottom-left.svg) bottom 10px left 10px  / 86px no-repeat;
    
  background:
    var(--bg_1), var(--bg_2),var(--bg_3),var(--bg_4);
}
```