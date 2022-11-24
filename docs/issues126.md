<!-- 滚动动画 -->

### Let’s Make One of Those Fancy Scrolling Animations Used on Apple Product Pages

- https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/#comment-1797840

- https://codepen.io/j-v-w/pen/ZEbGzyv

<iframe height="300" style="width: 100%;" scrolling="no" title="Apple AirPods Pro Animation (final demo)" src="https://codepen.io/j-v-w/embed/ZEbGzyv?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/j-v-w/pen/ZEbGzyv">
  Apple AirPods Pro Animation (final demo)</a> by Jurn (<a href="https://codepen.io/j-v-w">@j-v-w</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

```ts
console.log(
  'Let’s Make One of Those Fancy Scrolling Animations Used on Apple Product Pages'
)

const canvas = document.getElementById('hero-lightpass') as HTMLCanvasElement
const context = canvas.getContext('2d')
const html = document.documentElement
const frameCount = 148 // 1 - 147

// https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/0001.jpg
// 1158 x 770
const currentFrame = (index: number) =>
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
    .toString()
    .padStart(4, '0')}.jpg`

// Create, load and draw the image
const img = new Image()
// we'll make this dynamic in the next step, for now we'll just load image 1 of our sequence
img.src = currentFrame(1)

canvas.width = 1158
canvas.height = 770

img.onload = () => {
  context?.drawImage(img, 0, 0)
}

const preloadImages = () => {
  for (let i = 0; i < frameCount; i++) {
    const img = new Image()
    img.src = currentFrame(i)
  }
}

const updateImage = (index: number) => {
  img.src = currentFrame(index)
  context?.drawImage(img, 0, 0)
}

window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop
  // 从文档滚动高度中减去窗口高度来获得结束（或最大值）值
  const maxScrollTop = html.scrollHeight - window.innerHeight
  // 将该scrollTop 值除以用户可以向下滚动的最大值，这给了我们用户的滚动进度。
  const scrollFraction = scrollTop / maxScrollTop
  // 将滚动进度转换为与图像编号序列对应的索引号，以便我们返回该位置的正确图像。
  // 我们可以通过将进度数乘以我们拥有的帧（图像）数来做到这一点。
  // 我们Math.ceil() 将该数字取整并Math.min()用我们的最大帧数将其包装起来，这样它就不会超过总帧数。
  //
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  )

  requestAnimationFrame(() => updateImage(frameIndex + 1))
})

preloadImages()
```

```html
<style>
  html {
    height: 100vh;
  }

  body {
    background: #000;
    height: 500vh;
    margin: 0;
  }

  canvas {
    position: fixed;
    left: 50%;
    top: 50%;
    max-height: 100vh;
    max-width: 100vw;
    transform: translate(-50%, -50%);
  }
</style>

<canvas id="hero-lightpass" />
```

