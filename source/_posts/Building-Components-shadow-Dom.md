---
title: Building-Components shadow Dom
date: 2019-09-25 00:41:02
tags:
categories:
- [html]
- [css]
- [javascript]
---

https://developers.google.com/web/fundamentals/web-components/shadowdom#slots



```html

<!-- custom dom -->
<custom-tabs>
    <!-- 定义slot -->
    <button slot="tab">button</button>
    <button slot="tab">button</button>
    <button slot="tab">button</button>
    <!-- 默认slot -->
    <section>section1</section>
    <section>section2</section>
    <section>section3</section>
  </custom-tabs>

  <script>
  let selected_ = null
  class customTab extends HTMLElement {
    constructor() {
      super()

      let shadowRoot = this.attachShadow({mode: 'open'})
      // 样式 内容
      shadowRoot.innerHTML = `
        <style>
          :host {
            border: 1px solid #ececec;
            display: inline-block;
          }

          #tabs ::slotted(*) {
            border: none;
            outline: none;
            padding: 20px 40px;
            background: #f1f1f1;
          }

          #tabs ::slotted([aria-selected="true"]) {
            background: #fff;
          }

          #panels {
            padding: 20px;
            font-size: 18px;
          }

          #panels ::slotted([aria-hidden="true"]) {
            display: none;
          }

        </style>

        <div id="tabs">
          <slot id="tabSlot" name="tab"></slot>
        </div>
        <div id="panels">
          <slot id="panelsSlot"></slot>
        </div>
      `
    }

    // get set
    get selected() {
      return selected_
    }

    set selected(idx) {
      selected_ = idx
      this._selected(idx)
    }

    connectedCallback() {

      // set role
      this.setAttribute('role', 'tab-list')

      // get Element
      let tabsSlot = this.shadowRoot.querySelector('#tabSlot')
      let panelsSlot = this.shadowRoot.querySelector('#panelsSlot')

      // filter Element
      this.tabs = tabsSlot.assignedNodes({flatten: true})
      this.panels = panelsSlot.assignedNodes({flatten: true}).filter(el => el.nodeType === Node.ELEMENT_NODE)


      // set role
      for (const [i, panel] of this.panels.entries()) {
        panel.setAttribute('role', 'tab-panel')
      }

      // set click keydown event
      this._boundOnTitleClick = this._onTitleClick.bind(this)
      this._boundOnKeydown = this._onKeydown.bind(this)

      tabsSlot.addEventListener('click', this._boundOnTitleClick)
      tabsSlot.addEventListener('keydown', this._boundOnKeydown)

      // set default selected, by tab html selected attribute
      this.selected = this._findFirstSelectedTab() || 0
    }

    // tab click event
    _onTitleClick(e) {
      if (e.target.slot === 'tab') {
        // now click Element index
        this.selected = this.tabs.indexOf(e.target)
      }
    }

    // tab keydown event
    _onKeydown(e) {
      switch(e.code) {
        // up left
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault()
          // --, if it's 0 idx = length - 1 else idx
        var idx = this.selected - 1
        idx = idx < 0 ? this.tabs.length - 1 : idx
        // click event
        this.tabs[idx].click()
          break;
          // down right
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault()
          // ++ by & tab click event
        var idx = this.selected + 1
        this.tabs[idx % this.tabs.length].click()
          break;
        default:
          break;
      }
    }

    // find tab html attribute selected set now Tab
    _findFirstSelectedTab() {
      let selectedIdx
      // for
      for (const [i, tab] of this.tabs.entries()) {
        // set role
        tab.setAttribute('role', 'tab')
        // if tab has selected, nowTab is i
        if (tab.hasAttribute('selected')) {
          selectedIdx = i
        }
      }
      return selectedIdx
    }

    // set tab toggle function
    _selected(idx = null) {
      // for
      for(let i = 0, tab; tab = this.tabs[i]; ++i) {
        // if idx === i equal true
        let selected = idx === i
        // set attribute
        tab.setAttribute('aria-selected', selected)
        this.panels[i].setAttribute('aria-hidden', !selected)
      }
    }
  }


  if (customElements) customElements.define('custom-tabs', customTab)
  else console.log('不支持 custom')
  </script>
```