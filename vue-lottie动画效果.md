---
title: vue-lottie动画效果
date: 2018-06-06 18:45:38
tags:
categories: 动效
---

### vue-lottie动画效果

之前用lottie模仿过san官网的动画效果(没有打广告QAQ)

[仓库地址](https://github.com/xiaotiandada/Case/tree/master/Anime/sanDemo)

[模仿demo](https://xiaotiandada.github.io/Case/Anime/sanDemo/app/)

[blog](https://xiaotiandada.github.io/)

[掘金](https://juejin.im/post/5aff09ee6fb9a07a9b36365b)

用lottie的好处有很多(.......此处省略ｎ字) 简单来说就是简单高效的还原设计的动画效果

然后在个人项目使用vue-lottie　分享一些小小经验吧

废话不多说～～～ (正经分割线)

<!-- more -->

---

### 分析官方demo

先来一个简单的尝尝鲜

[vue-lottie仓库](https://github.com/chenqingspring/vue-lottie)

[vue-lottie demo](https://chenqingspring.github.io/vue-lottie/)

打开仓库可以看见很多很棒的效果（nice


#### Installation

```bash
npm install --save vue-lottie
```

#### Usage

``` bash
<template>
    <div id="app">
        <lottie :options="defaultOptions" :height="400" :width="400" v-on:animCreated="handleAnimation"/>
        <div>
            <p>Speed: x{{animationSpeed}}</p>
            <input type="range" value="1" min="0" max="3" step="0.5"
                   v-on:change="onSpeedChange" v-model="animationSpeed">
        </div>
        <button v-on:click="stop">stop</button>
        <button v-on:click="pause">pause</button>
        <button v-on:click="play">play</button>
    </div>
</template>

<script>
  import Lottie from './lottie.vue';
  import * as animationData from './assets/pinjump.json';

  export default {
    name: 'app',
    components: {
      'lottie': Lottie
    },
    data() {
      return {
        defaultOptions: {animationData: animationData},
        animationSpeed: 1
      }
    },
    methods: {
      handleAnimation: function (anim) {
        this.anim = anim;
      },

      stop: function () {
        this.anim.stop();
      },

      play: function () {
        this.anim.play();
      },

      pause: function () {
        this.anim.pause();
      },

      onSpeedChange: function () {
        this.anim.setSpeed(this.animationSpeed);
      }
    }
  }
</script>
```

这是之前官方给的demo代码　基本上和平时使用没啥不一样(所以只需要复制粘贴就ok了)

```bash
# json 动画效果AE转json后的文件
import * as animationData from './assets/pinjump.json';
```

引入的json需要改！！！

```bash
# 这里引入了　lottie组件
import Lottie from './lottie.vue';
```

```bash
# lottie.vue
<template>
    <div :style="style" ref="lavContainer"></div>
</template>

<script>
  import lottie from 'lottie-web'
export default {
    props: {
      options: {
        type: Object,
        required: true
      },
      height: Number,
      width: Number
    },
    data() {
      return {
        style: {
          width: this.width ? `${this.width}px` : '100%',
          height: this.height ? `${this.height}px` : '100%',
          overflow: 'hidden',
          margin: '0 auto'
        }
      }
    },
    mounted() {
      this.anim = lottie.loadAnimation({
        container: this.$refs.lavContainer,
        renderer: 'svg',
        loop: this.options.loop !== false,
        autoplay: this.options.autoplay !== false,
        animationData: this.options.animationData,
        rendererSettings: this.options.rendererSettings
      }
      )
      this.$emit('animCreated', this.anim)
    }
  }
</script>
```

然后会发现还是有错误(缺少组件！)　其实很简单啦，打开仓库进入src然后打开lottle组件然后复制过去就ok啦hhh(简单)

![效果图](vue-lottie动画效果/one.png)

这是效果图（是不是很简单２３３

### 使用别的json文件

官方给给了一个很好的效果网站　[地址](https://www.lottiefiles.com/)

下载json文件　然后更换引入的json

```bash
# json 动画效果AE转json后的文件
import * as animationData from './assets/blood_transfusion_kawaii.json.json';

```

![效果图](vue-lottie动画效果/two.png)

是不是也很简单！！！


### 使用vue-lottie模仿san官网的动画效果

先来效果图～～～

![效果图](vue-lottie动画效果/three.png)

因为有多个需要用到lottie动画，想了半天不知道怎么解决调用方法的问题　最后想了一个简单的方法

直接将每一个动画抽到一个组件　组件内依然用之前的方法（稍微改造一下就行

然后利用父子组件传数据的形式传递json文件　子组件props接收

```bash
# html
<template>
  <div class="card-panel" @mouseenter="lottiePlay" @mouseleave="lottieStop">
    <div class="card-panel-icon-wrapper icon-shoppingCard">
      <lottie :options="defaultOptions" :height="80" :width="80" v-on:animCreated="handleAnimation" />
    </div>
    <div class="card-panel-description">
      <div class="card-panel-text">今日活跃</div>
      <div class="card-panel-num">2600</div>
    </div>
  </div>
</template>
```

```bash
# props
props: {
    animationDataPath: {
      type: Object,
      default: null
    }
  },
  data() {
  return {
    defaultOptions: {
      // animationData: animationDataPath,
      animationData: this.animationDataPath,
      autoplay: false,  # 不自动播放
      loop: false　　　　　# 不循环
    }
  }
}
```

```bash
# 事件调用
@mouseenter="lottiePlay" @mouseleave="lottieStop"

lottiePlay: function() {
  this.anim.play()
},
lottieStop: function() {
  this.anim.stop()
}
```

然后就到了父组件传数据

```bash
# 父组件
<panel-lottie :animationDataPath="animationDataPathOne"></panel-lottie>

animationDataPathOne: require('../../../public/json/compass.json')
```

自己用到了require引入json　然后打包出来　一样可以正常运行　如果大家有很好的方法可以教我！我好学习学习

---

emmmmm　大概就是这么多吧～

如果实在需要这个的源码可以打开我的github仓库　由于项目还是一个半成品　所以地址就放在最后面了

[vue-lottie源码](https://github.com/xiaotiandada/My-music/tree/master/client/src/views/admin/About)

[项目地址](https://github.com/xiaotiandada/My-music)

> 如果大家觉得不错的话　可以点star哦（厚脸皮２３３