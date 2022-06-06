---
title: bilibili banner动画研究【一】
date: 2020-11-16 21:52:56
tags:
---

![动画效果](https://i.imgur.com/2BWZJjY.jpg?1)

https://www.bilibili.com/ 后面可能会被更新掉

>  为什么叫一？ 说不能还有别的好玩的动画学习！

<!-- more -->

<iframe src="https://codesandbox.io/embed/bilibili-bannner-w49d7?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:200px; border:0; border-radius: 4px; overflow:hidden;"
     title="bilibili bannner"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

主要两个组件完成，代码我也是复制b站大佬的🍑 然后自己理解理解思路

### Banner.vue

```javascript
  computed: {
    locs() {
      return {
    		//...
        pic:
          "http://i0.hdslb.com/bfs/archive/0b7eef054547750e6bfeff6f36c83e83d2a058fb.png",
        litpic:
          "http://i0.hdslb.com/bfs/archive/622017dd4b0140432962d3ce0c6db99d77d2e937.png",
				//...
      };
    },
    bannerImg() {
      return (this.locs && this.locs.pic).trim();
    },
    logoImg() {
      return (this.locs && this.locs.litpic).trim();
    },
  },
```

返回一张静止的页面，在没有加载完成或者不支持的时候显示

```javascript
// 解析数据 提前定义好的具体看代码
this.layerConfig = JSON.parse('[...]');
```

解析banner数据

```javascript
// 只有在启用了动画banner的配置，且浏览器支持css filter时才加载动画banner的图片资源
this.animatedBannerSupport =
  typeof CSS !== "undefined" &&
  CSS.supports &&
  CSS.supports("filter: blur(1px)");
```

查看是否支持一些需要的条件

```javascript
// 根据每帧时长计算循环时间
this.layerConfig.map((v) => {
  v.loopTime = v.images.reduce((p, c) => p + (c.duration || 0), 0);
});
```

统计所有Time 利用 Reduce 累计

```javascript
try {
  // 加载所有图片资源
  await Promise.all(
    this.layerConfig.map(async (v) => {
      console.log("v", v);
      return Promise.all(
        v.images.map(async (i, index) => {
          const img = document.createElement("img");
          img.src = i.src;
          await new Promise((resolve) => (img.onload = resolve));
          v.images[index].img = img;
        })
      );
    })
  );
  console.log("this.layerConfig", this.layerConfig);
  // 切换为动画banner
  this.animatedBannerLoaded = true;
} catch (e) {
  console.log("load animated banner images error", e);
}
```

利用Promise加载所有图片资源，两个Promise是因为images里面也是一个数组

可以用这种方法提前加载图片 这样切换的时候就不会很卡顿 嗯 学习了！

### AnimatedBanner

```javascript
props: {
  layerConfig: {
    type: Array,
      required: true,
  },
},
```

接收父组件处理好的数组数据

```javascript
const layerConfig = this.layerConfig;
if (!layerConfig.length) {
  this.$emit("error");
}

const container = this.$refs["container"];
let containerHeight = container.clientHeight;
let containerWidth = container.clientWidth;
let containerScale = containerHeight / 155;

// 加载图片资源移动到组件外部， 这里只设置图片宽高
layerConfig.forEach((v) => {
  v.images.forEach((i, index) => {
    const img = v.images[index].img;
    img.dataset.height = img.height;
    img.dataset.width = img.width;
    img.height =
      img.dataset.height * containerScale * (v.initial.scale || 1);
    img.width = img.dataset.width * containerScale * (v.initial.scale || 1);
  });
});
```

如果没有调用$emit告诉父组件显示静态图片

获取容器和宽高缩放等属性，并且设置父组件获取图片的宽高等属性 并且根据缩放比例计算

```javascript
// 初始化图层
const layers = layerConfig.map((v) => {
  const layer = document.createElement("div");
  layer.classList.add("layer");
  container.appendChild(layer);
  return layer;
});
```

初始化图层到container

```javascript
// 初始状态
const iaf = () => {
  try {
    layers.map((layer, i) => {
      // console.log("layer log", i, layer);
      const v = layerConfig[i];
      const a = layer.firstChild;
      // console.log("a", a);
      let rotateStr = "";
      let translateStr = "";
      if (v.initial.rotate) {
        rotateStr = `rotate(${v.initial.rotate}deg)`;
      }
      if (v.initial.translate) {
        const base = v.initial.translate || [0, 0];
        translateStr = `translate(${base[0]}px, ${base[1]}px)`;
      }
      a.style.transform = `${translateStr} ${rotateStr}`;
      if (v.initial.blur) {
        a.style.filter = `blur(${Math.abs(v.initial.blur)}px)`;
      }
    });
  } catch (e) {
    console.error(e);
    this.$emit("error");
  }
};

// 切换下一帧的方法
const changeToNextFrame = (layer, images, i) => {
  setTimeout(() => {
    const next = i === images.length - 1 ? 0 : i + 1;
    layer.removeChild(layer.firstChild);
    layer.appendChild(images[next].img);
    changeToNextFrame(layer, images, next);
    requestAnimationFrame(af);
  }, images[i].duration);
};

// 初始化图层内图片和帧动画
layerConfig.map((v, i) => {
  const a = v.images[0].img;
  layers[i].appendChild(a);
  requestAnimationFrame(iaf);
  if (v.images.length > 1 && v.loopTime > 0) {
    changeToNextFrame(layers[i], v.images, 0);
  }
});
```

初始化图层图片和一些默认样式并且开始帧动画

利用定时器loop toggle img 删除第一个元素然后添加下一帧图片然后再调用自己

```javascript
document.addEventListener("mouseleave", this.handleMouseLeave);
window.addEventListener("mousemove", this.handleMouseMove);
window.addEventListener("resize", this.handleResize);

beforeDestroy() {
  document.removeEventListener("mouseleave", this.handleMouseLeave);
  window.removeEventListener("mousemove", this.handleMouseMove);
  window.removeEventListener("resize", this.handleResize);
},
```

监听一些事件

```javascript
this.handleMouseMove = (e) => {
  const offsetY = document.documentElement.scrollTop + e.clientY;
  console.log("offsetY", offsetY, e);
  if (offsetY < containerHeight) {
    if (!entered) {
      entered = true;
      enterX = e.clientX;
    }
    displace = (e.clientX - enterX) / containerWidth;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(af);
  } else {
    if (entered) {
      entered = false;
      handleLeave();
    }
  }
};
```

鼠标经过容器执行af 先取消再继续，不在容器内调用 handleLeave

```javascript
enterX = e.clientX;
displace = (e.clientX - enterX) / containerWidth;
```

这两个的含义其实我还没太理解 后续需要用 displace 参与计算 应该就是用来判断往左还是右边的

```javascript
// 根据鼠标位置改变状态
const af = (t) => {
  try {
    layers.map((layer, i) => {
      const v = layerConfig[i];
      const a = layer.firstChild;
      if (!v.offset || !a) {
        return;
      }

      const baseRotate = v.initial.rotate || 0;
      const baseTranslate = v.initial.trannslate || [0, 0];
      let scaleStr = ``;
      let rotateStr = `rotate(${v.initial.rotate || 0}deg)`;
      let translateStr = `translate(${baseTranslate[0]}px, ${baseTranslate[1]}px)`;

      console.log(
        "rotateStr translateStr",
        rotateStr,
        translateStr,
        v.offset
      );

      if (v.offset.scale) {
        const itp =
              v.offsetCurve && v.offsetCurve.scale
        ? curveParameterToFunc(v.offsetCurve.scale)
        : (x) => x;
        const offset = v.offset.scale * itp(displace);
        scaleStr = `scale(${1 + offset})`;
      }
      if (v.offset.rotate) {
        const itp =
              v.offsetCurve && v.offsetCurve.rotate
        ? curveParameterToFunc(v.offsetCurve.rotate)
        : (x) => x;
        const offset = v.offset.rotate * itp(displace);
        rotateStr = `rotate(${baseRotate + offset}deg)`;
      }
      if (v.offset.translate) {
        const itp =
              v.offsetCurve && v.offsetCurve.translate
        ? curveParameterToFunc(v.offsetCurve.translate)
        : (x) => x;
        const offset = v.offset.translate.map((v) => itp(displace) * v);
        const translate = baseTranslate.map(
          (x, i) =>
          (x + offset[i]) * containerScale * (v.initial.scale || 1)
        );
        translateStr = `translate(${translate[0]}px, ${translate[1]}px)`;
      }
      a.style.transform = `${scaleStr} ${translateStr} ${rotateStr}`;
      if (v.offset.blur) {
        const itp =
              v.offsetCurve && v.offsetCurve.blur
        ? curveParameterToFunc(v.offsetCurve.blur)
        : (x) => x;
        const blurOffset = itp(displace) * v.offset.blur;
        a.style.filter = `blur(${Math.abs(
          (v.initial.blur || 0) + blurOffset
        )}px)`;
      }
    });
  } catch (e) {
    console.error(e);
    this.$emit("error");
  }
};
```

关键代码在这里...

1. 判断有没有元素

2. 获取一些初始的style

3. 然后判断有没有offset scale rotate translate blur 然后执行动画

4. 判断有没有 offset curve 如果有用 cubicBezier 没有就用默认参数

5. 往右边 x2 > x1 / width 正数

   1. Scale 默认是 1

      ```javascript
      const offset = v.offset.scale * itp(displace);
      scaleStr = `scale(${1 + offset})`;
      ```

   2. Rotate 根据上面定义的默认参数然后加上新角度

      ```javascript
      const offset = v.offset.rotate * itp(displace);
      rotateStr = `rotate(${baseRotate + offset}deg)`;
      ```

   3. Translate 根据比例计算

      ```javascript
      const offset = v.offset.translate.map((v) => itp(displace) * v);
      const translate = baseTranslate.map(
        (x, i) =>
        (x + offset[i]) * containerScale * (v.initial.scale || 1)
      );
      translateStr = `translate(${translate[0]}px, ${translate[1]}px)`;
      ```

      因为是个arr所以map loop，后面的 * 容器比例 * 初始化scale 应该是适配缩放的比例然后变化位置

      ```javascript
      a.style.transform = `${scaleStr} ${translateStr} ${rotateStr}`;
      ```

      最后设置属性

   4. blur 初始的blur + 变化后的blur

      ```javascript
      const blurOffset = itp(displace) * v.offset.blur;
      a.style.filter = `blur(${Math.abs(
        (v.initial.blur || 0) + blurOffset
      )}px)`;
      ```

```javascript
const handleLeave = () => {
  const now = performance.now();
  const timeout = 200;
  const tempDisplace = displace;
  cancelAnimationFrame(raf);
  const leaveAF = (t) => {
    if (t - now < timeout) {
      displace = tempDisplace * (1 - (t - now) / 200);
      af(t);
      requestAnimationFrame(leaveAF);
    } else {
      displace = 0;
      af(t);
    }
  };
  raf = requestAnimationFrame(leaveAF);
};
```

鼠标离开后 在200time内displace会逐渐变小或扩大 取决于正数还是负数 超过时间后会设置为 0 然后调用动画恢复默认参数

```javascript
this.handleResize = () => {
  containerHeight = container.clientHeight;
  containerWidth = container.clientWidth;
  containerScale = containerHeight / 155;
  layerConfig.forEach((lc) => {
    lc.images.forEach((i) => {
      const img = i.img;
      img.height =
        img.dataset.height * containerScale * (lc.initial.scale || 1);
      img.width =
        img.dataset.width * containerScale * (lc.initial.scale || 1);
    });
  });
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame((t) => {
    af(t);
  });
};
```

 设置容器的样式参数然后取消动画再开始动画赋值给raf

