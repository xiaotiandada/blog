---
title: animation实现登录框
date: 2018-06-25 22:37:45
tags:
categories: '我还不知道分类为什么'
---

# 使用 animate.css 实现一个优雅的登录框

> [资料地址](http://ife.baidu.com/course/detail/id/34)

> [预览地址](https://xiaotiandada.github.io/ife/%E8%AE%BE%E8%AE%A1%E5%B8%88%E5%AD%A6%E9%99%A2/No.7/)

> 下面的动画效果 css 样式是从 animate.css里面扣出来的2333

<!-- more -->


![img](animation实现登录框/img.png)


``` html
<section class="site-container">
    <section class="card">
        <h3>Login</h3>
        <form action="">
            <div class="form__wrapper">
                <input type="email" class="form__input" id="email" name="email">
                <label id="form__label__email" class="form__label" for="email">
                    <span class="form__label__content">Email</span>
                </label>
            </div>

            <div class="form__wrapper">
                <input type="password" class="form__input" id="password" name="password">
                <label id="form__label__password" class="form__label" for="password">
                    <span class="form__label__content">Password</span>
                </label>
            </div>

            <div class="form__wrapper__submit">
                <div class="form__wrapper_submit__content">
                    <button id="btn" type="submit" name="submit" class="btn">Submit</button>
                </div>
            </div>
        </form>
    </section>
</section>
```

``` css
 /* label 文字上移效果 */
.active {
    -webkit-transform: scale(.9) translate(-14px, -14px);
    -moz-transform: scale(.9) translate(-14px, -14px);
    -ms-transform: scale(.9) translate(-14px, -14px);
    -o-transform: scale(.9) translate(-14px, -14px);
    transform: scale(.9) translate(-14px, -14px);
}

/* btn copy animation.css 效果 */
@keyframes bounceIn {
    from,
    25%,
    50%,
    75%,
    to {
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }

    25% {
        -webkit-transform: scale3d(1.01, 1.01, 1.01);
        transform: scale3d(1.01, 1.01, 1.01);
    }

    50% {
        -webkit-transform: scale3d(1.02, 1.02, 1.02);
        transform: scale3d(1.02, 1.02, 1.02);
    }

    75% {
        -webkit-transform: scale3d(1.01, 1.01, 1.01);
        transform: scale3d(1.01, 1.01, 1.01);
    }

    to {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
    }
}

.bounceIn {
    -webkit-animation-duration: 0.75s;
    animation-duration: 0.75s;
    -webkit-animation-name: bounceIn;
    animation-name: bounceIn;
    animation-iteration-count: infinite;
}
```

> 详情查看[github地址](https://github.com/xiaotiandada/ife)