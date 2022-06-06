- [look-wallpapers](https://github.com/xiaotiandada/look-wallpapers)
- [E-video](https://github.com/xiaotiandada/E-video)



### 本地存储

```javascript
import storage from 'electron-json-storage';

/**
 * storage Get
 * @returns {Promise<unknown>}
 */
export const storageGet = key => new Promise((resolve, reject) => {
  storage.get(key, (error, data) => {
    if (error) {
      reject(error);
    }

    console.log(data);
    resolve(data);
  });
});

/**
 * storage Set
 * @param data
 * @returns {Promise<unknown>}
 */
export const storageSet = (key, data) => new Promise((resolve, reject) => {
  storage.set(key, data, (error) => {
    if (error) {
      reject(error);
    }
    resolve('success');
  });
});
```

### 下载图片

```javascript
/**
 * download image
 */
export const downloadImage = async ({
  name,
  url,
}) => {
  // path
  const imagePath = await 'path';
  const outputLocationPath = path.join(
    imagePath,
    name,
  );

  console.log('outputLocationPath', outputLocationPath);

  // download
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });

  const base64Image = new Buffer.from(
    response.data,
    'binary',
  ).toString('base64');
  await util.promisify(fs.writeFile)(outputLocationPath, base64Image, 'base64');

  return outputLocationPath;
};
```

### 设置壁纸

```javascript
import wallpaper from 'wallpaper';

/**
 * set wallpaper
 */
export const setWallpaper = async ({
  name,
  url,
}) => {
  const imagePath = await downloadImage({ name, url });
  await wallpaper.set(imagePath, { scale: 'auto' });
  console.log('set wallpaper success');
  new remote.Notification({
    title: 'Notification',
    body: 'Set Wallpaper Success',
  }).show();
};
```



### 自定义状态栏

因为win自带的状态栏太丑了，所以自己模拟了一个，electron-vue 通过 ipcMain 发送消息

[ipcMain](https://electronjs.org/docs/api/ipc-main#ipcmain) - 从主进程到渲染进程的异步通信。

> ipcMain模块是EventEmitter类的一个实例。 当在主进程中使用时，它处理从渲染器进程（网页）发送出来的异步和同步信息。 从渲染器进程发送的消息将被发送到该模块。 

[参考文章](https://blog.csdn.net/liyangyang08/article/details/78608822?locationNum=7&fps=1)

1. 在 index.js 修改窗口大小.

[BrowserWindow](https://electronjs.org/docs/api/browser-window#winsetcontentsizewidth-height-animate) - 创建和控制浏览器窗口。

> 里面的参数自己可以看文档哦~

```js
 mainWindow = new BrowserWindow({
    height: 710,
    width: 1200,
    useContentSize: true,
    frame: false
  })

```

设置之后，有一个细节需要了解一下.

[可拖拽区](https://electronjs.org/docs/api/frameless-window) - 默认情况下, 无框窗口是 non-draggable 的..... (总之就是，你需要设置一下)

要使整个窗口可拖拽, 您可以添加 -webkit-app-region: drag 作为 body 的样式:

```css
<body style="-webkit-app-region: drag"></body>
```

请注意, 如果您已使整个窗口draggable, 则必须将按钮标记为 non-draggable, 否则用户将无法单击它们:

```css
button {
  -webkit-app-region: no-drag;
}
```

如果你设置自定义标题栏为 draggable, 你也需要标题栏中所有的按钮都设为 non-draggable。

2. 模拟事件

参考文章里面有介绍到，流程大概就是这样。

```js
// 引入
const {ipcRenderer: ipc} = require('electron')

// 自定义事件
winMin () {
    ipc.send('window-min')
},
winEnlargeOrNarrow () {
    ipc.send('win-enlarge-or-narrow')
},
winClose () {
    ipc.send('window-close')
}

/**
 * 模拟 最小 放大 还原 关闭 事件
 * index.js 修改
 */
ipcMain.on('window-min', () => {
  mainWindow.minimize()
})
ipcMain.on('win-enlarge-or-narrow', () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow.maximize()
  }
})
ipcMain.on('window-close', () => {
  mainWindow.close()
})
```

### 弹幕

播放器提供了相应的接口，只需要获取评论转换相应的数据就可以了。

```js
transformComments (commentsArr) {}

dp.danmaku.draw({
   text: 'DIYgod is amazing',
   color: '#fff',
   type: 'top'
});
```

https://github.com/xiaotiandada/E-video/blob/master/src/renderer/view/index.vue

```js
import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'xxx',
    timeout: 1000
  })
}

-----------------

import Api from './Api'

export default {
  /**
   * 默认30条数据，可以自定义
   * @param limit
   * @returns {*}
   */
  getTopMv (limit = 30, offset = 0) {
    return Api().get(`/top/mv?limit=${limit}&offset=${offset}`)
  },
  getMvId (id) {
    return Api().get(`/mv?mvid=${id}`)
  },
  getMvComments (id) {
    return Api().get(`/comment/mv?id=${id}`)
  }
}

```
