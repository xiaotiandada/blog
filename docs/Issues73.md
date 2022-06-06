[Download Any File from Blob](https://dev.to/nombrekeff/download-file-from-blob-21ho)

https://developer.mozilla.org/zh-CN/docs/Web/API/Blob

https://developer.mozilla.org/zh-CN/docs/Web/API/URL

https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent

https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent

>`Blob` 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 [`ReadableStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream) 来用于数据操作。 
>
>Blob 表示的不一定是JavaScript原生格式的数据。[`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 接口基于`Blob`，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
>
>要从其他非blob对象和数据构造一个 `Blob`，请使用 [`Blob()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/Blob) 构造函数。要创建一个 blob 数据的子集 blob，请使用 [`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob/slice) 方法。要获取用户文件系统上的文件对应的 `Blob` 对象，请参阅 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 文档。
>
>接受 `Blob` 对象的API也被列在 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 文档中。
>
>**注意：**`slice()` 方法原本接受 `length` 作为第二个参数，以表示复制到新 `Blob` 对象的字节数。如果设置的参数使 `start + length` 超出了源 `Blob` 对象的大小，则返回从开始到结尾的所有数据。
>
>**注意：**`slice()` 方法在某些浏览器和版本上带有浏览器引擎前缀：比如 Firefox 12 及更早版本的`blob.mozSlice()` 和 Safari 中的`blob.webkitSlice()`。 没有浏览器引擎前缀的老版本 `slice()` 方法有不同的语义，并且已过时。Firefox 30 取消了对 `blob.mozSlice()` 的支持。

```javascript
var debug = {hello: "world"};
var blob = new Blob([JSON.stringify(debug, null, 2)], {type : 'application/json'});
```

>**`URL`**接口用于解析，构造，规范化和编码 [URLs](https://developer.mozilla.org/zh-CN/docs/Glossary/URL)。 它通过提供允许您轻松阅读和修改URL组件的属性来工作。 通常，通过在调用URL的构造函数时将URL指定为字符串或提供相对URL和基本URL来创建新的URL对象。 然后，您可以轻松读取URL的已解析组成部分或对URL进行更改。
>
>如果浏览器尚不支持[`URL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/URL)构造函数，则可以使用[`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)中的[`Window.URL`](https://developer.mozilla.org/zh-CN/docs/conflicting/Web/API/URL)属性。 确保检查您的任何目标浏览器是否要求对此添加前缀。

>**`URL.createObjectURL()`** 静态方法会创建一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 [`document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 绑定。这个新的URL 对象表示指定的 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 对象或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象。

>**`URL.revokeObjectURL()`** 静态方法用来释放一个之前已经存在的、通过调用 [`URL.createObjectURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL) 创建的 URL 对象。当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。
>
>你可以在 `sourceopen` 被处理之后的任何时候调用 `revokeObjectURL()`。这是因为 `createObjectURL()` 仅仅意味着将一个媒体元素的 `src` 属性关联到一个 [`MediaSource`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSource) 对象上去。调用`revokeObjectURL()` 使这个潜在的对象回到原来的地方，允许平台在合适的时机进行垃圾收集。

```javascript
let objectURL = URL.createObjectURL(object);

window.URL.revokeObjectURL(objectURL);
```

>**EventTarget.dispatchEvent**
>
>向一个指定的事件目标派发一个[事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Event), 并以合适的顺序**同步调用**目标元素相关的事件处理函数。标准事件处理规则(包括事件捕获和可选的冒泡过程)同样适用于通过手动的使用`dispatchEvent()`方法派发的事件。

>MouseEvent
>
>The `**MouseEvent**` interface represents events that occur due to the user interacting with a pointing device (such as a mouse). Common events using this interface include `click`, `dblclick`, `mouseup`, `mousedown`.
>
>`MouseEvent` derives from [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent), which in turn derives from [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event). Though the [`MouseEvent.initMouseEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent) method is kept for backward compatibility, creating of a `MouseEvent` object should be done using the [`MouseEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent) constructor.
>
>Several more specific events are based on `MouseEvent`, including [`WheelEvent`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent) and [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent).
>
>
>
><iframe class="inheritance-diagram-frame" id="frame_inheritance_diagram" width="600" height="70" src="https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/API/MouseEvent/_sample_.inheritance_diagram.html" loading="lazy" style="box-sizing: border-box; max-width: 100%; border: 0px;"></iframe>

```javascript
let evt = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  view: window
});

cb.dispatchEvent(evt);
```

将数据转换为 blob，然后创建 url 链接，赋值给 a tag 利用 a tag 实现下载文件。


```javascript

function downloadBlob(blob, name = 'file.txt') {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");

  // Set link's href to point to the Blob URL
  link.href = blobUrl;
  link.download = name;

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', { 
      bubbles: true, 
      cancelable: true, 
      view: window 
    })
  );

  // Remove link from body
  document.body.removeChild(link);
  window.URL.revokeObjectURL(blobUrl)
}

// Usage
let mdBlob = new Blob(['markdown'])
downloadBlob(mdBlob, 'markdown.md');

```