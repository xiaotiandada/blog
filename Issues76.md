https://codepen.io/xiaotiandada/pen/KKWQXqN codepen

```html

<p class="lead ma-0" style="max-width: 680px; margin: auto; margin-bottom: 30px;">
用即時協作的 Markdown 編輯器書寫
<span class="typewriter-container inline-flex justify-center en">
<span class="typewriter-text text-1">專案</span>
<span class="typewriter-text text-2">團隊</span>
<span class="typewriter-text text-3">技術</span>
<span class="typewriter-text text-4">個人</span>
</span>
文件，讓你快速協作、輕鬆紀錄想法、隨時共享知識。
</p>
```

```css
@keyframes typing1 {
 0% { width: 0%; }
 5% { width: 100%; }
 24% { width: 100%; }
 25%, 100% { width: 0%; }
}
@keyframes typing2 {
 0% { width: 0%; }
 25% { width: 0%; }
 30% { width: 100%; }
 49% { width: 100%; }
 50%, 100% { width: 0%; }
}
@keyframes typing3 {
 0% { width: 0%; }
 50% { width: 0%; }
 55% { width: 100%; }
 74% { width: 100%; }
 75%, 100% { width: 0%; }
}
@keyframes typing4 {
 0% { width: 0%; }
 75% { width: 0%; }
 80% { width: 100%; }
 99% { width: 100%; }
 100% { width: 0%; }
}
@keyframes blink {
 from, to { opacity: 0; }
 50% { opacity: 1; }
}
.typewriter-container {
    border: solid #7a7a7a;
    border-width: 0;
    border-bottom-width: 1px;
    height: 1.8em;
    margin-bottom: 3px;
    position: relative;
    width: 5.4em;
    display: inline-flex;
    justify-content: center;
    text-align: center;
}
.typewriter-container .typewriter-text {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    letter-spacing: 2px;
    max-width: 2.7em;
    line-height: 30px;
}
.typewriter-container.en .typewriter-text { letter-spacing: 0; }
.typewriter-container.en .typewriter-text.text-1 { max-width: 3.5em; animation: typing1 14s steps( 7 ) infinite; }
.typewriter-container.en .typewriter-text.text-2 { max-width: 2.5em; animation: typing2 14s steps( 4 ) infinite; }
.typewriter-container.en .typewriter-text.text-3 { max-width: 4.2em; animation: typing3 14s steps( 9 ) infinite; }
.typewriter-container.en .typewriter-text.text-4 { max-width: 4.2em; animation: typing4 14s steps( 8 ) infinite; }
.typewriter-container .typewriter-text::after {
  content: "|";
  color: #7a7a7a;
  position: absolute;
  right: -2px;
  top: -1px;
  animation: blink .95s infinite;
}
```

TODO：需要看一下 steps， 还没弄懂原理