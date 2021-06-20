https://github.com/snabbdom/snabbdom

https://github.com/snabbdom/snabbdom/tree/master/examples

### Count

通过 View 生成 dom，然后调用 render 渲染

```javascript
import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

let vnode;
let count = 0

const increase = () => {
  count++
  console.log('count increase', count)
  render();
}
const decrease = () =>{
  count--
  console.log('count decrease', count)
  render();
}

const view = () => {
  return h("div#container.two.classes", [
    h("span", { style: { fontWeight: "bold" } }, "Number"),
    h('span', ` Count: ${count} `),
    h('button', { on: { click: increase } }, "Increase"),
    h('button', { on: { click: decrease }}, "Decrease")
  ]);
}

function render() {
  vnode = patch(vnode, view());
}

window.addEventListener("DOMContentLoaded", () => {
  let container = document.getElementById("container");
  vnode = patch(container, view());
  render();
});
```

### Svg

```javascript
import { init, attributesModule, h } from "snabbdom";

const patch = init([attributesModule]);

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container2");
  const vnode = h("div", [
    h("svg", { attrs: { width: 100, height: 100 } }, [
      h("circle", {
        attrs: {
          cx: 50,
          cy: 50,
          r: 40,
          stroke: "green",
          "stroke-width": 4,
          fill: "yellow",
        },
      }),
    ]),
  ]);
  patch(container, vnode);
});
```

### Carousel svg

```javascript
import {
  init,
  attributesModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([attributesModule, styleModule, eventListenersModule]);

let vnode;

let data = {
  degRotation: 0,
};

function gRotation() {
  // console.log("gRotation: %s", data.degRotation);
  return "rotate(" + data.degRotation + "deg)";
}

function triangleClick(id) {
  console.log("triangleClick: %s", id);
  render();
}

function handleRotate(degs) {
  data.degRotation += degs;
  console.log("handleRotate: %s, %s", degs, data.degRotation);
  render();
}

function handleReset(degs) {
  data.degRotation = degs;
  console.log("handleReset: %s", degs);
  render();
}

function render() {
  vnode = patch(vnode, view(data));
}

const hTriangle = (id, degRotation) =>
  h("polygon#" + id, {
    attrs: {
      points: "-50,-88 0,-175 50,-88",
      transform: "rotate(" + degRotation + ")",
      "stroke-width": 3,
    },
    on: {
      click: () => {
        triangleClick(id);
      },
    },
  });

const view = () =>
  h("div.view", [
    h("h1", "Snabbdom SVG Carousel"),
    h(
      "svg",
      { attrs: { width: 380, height: 380, viewBox: [-190, -190, 380, 380] } },
      [
        h(
          "g#carousel",
          {
            style: { "-webkit-transform": gRotation(), transform: gRotation(), transition: 'all .3s' },
          },
          [
            hTriangle("yellow", 0),
            hTriangle("green", 60),
            hTriangle("magenta", 120),
            hTriangle("red", 180),
            hTriangle("cyan", 240),
            hTriangle("blue", 300),
          ]
        ),
      ]
    ),
    h(
      "button",
      {
        on: {
          click: () => {
            handleRotate(60);
          },
        },
      },
      "Rotate Clockwise"
    ),
    h(
      "button",
      {
        on: {
          click: () => {
            handleRotate(-60);
          },
        },
      },
      "Rotate Anticlockwise"
    ),
    h(
      "button",
      {
        on: {
          click: () => {
            handleReset(0);
          },
        },
      },
      "Reset"
    ),
  ]);

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container1");
  vnode = patch(container, view(data));
  render();
});
```

### Carousel animation

```javascript
import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

let vnode;

let nextKey = 11;
const margin = 8;
let sortBy = "rank";
let totalHeight = 0;
const originalData = [
  {
    rank: 1,
    title: "The Shawshank Redemption",
    desc:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    elmHeight: 0,
  },
  {
    rank: 2,
    title: "The Godfather",
    desc:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    elmHeight: 0,
  },
  {
    rank: 3,
    title: "The Godfather: Part II",
    desc:
      "The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.",
    elmHeight: 0,
  },
  {
    rank: 4,
    title: "The Dark Knight",
    desc:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",
    elmHeight: 0,
  },
  {
    rank: 5,
    title: "Pulp Fiction",
    desc:
      "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    elmHeight: 0,
  },
  {
    rank: 6,
    title: "Schindler's List",
    desc:
      "In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    elmHeight: 0,
  },
  {
    rank: 7,
    title: "12 Angry Men",
    desc:
      "A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.",
    elmHeight: 0,
  },
  {
    rank: 8,
    title: "The Good, the Bad and the Ugly",
    desc:
      "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
    elmHeight: 0,
  },
  {
    rank: 9,
    title: "The Lord of the Rings: The Return of the King",
    desc:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    elmHeight: 0,
  },
  {
    rank: 10,
    title: "Fight Club",
    desc:
      "An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...",
    elmHeight: 0,
  },
];
let data = [
  originalData[0],
  originalData[1],
  originalData[2],
  originalData[3],
  originalData[4],
  originalData[5],
  originalData[6],
  originalData[7],
  originalData[8],
  originalData[9],
];

function changeSort(prop) {
  sortBy = prop;
  data.sort((a, b) => {
    if (a[prop] > b[prop]) {
      return 1;
    }
    if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  });
  render();
}

function add() {
  const n = originalData[Math.floor(Math.random() * 10)];
  data = [
    { rank: nextKey++, title: n.title, desc: n.desc, elmHeight: 0 },
  ].concat(data);
  render();
  render();
}

function remove(movie) {
  data = data.filter((m) => {
    return m !== movie;
  });
  render();
}

function movieView(movie) {
  return h(
    "div.row",
    {
      key: movie.rank,
      style: {
        opacity: "0",
        transform: "translate(-200px)",
        delayed: { transform: `translateY(${movie.offset}px)`, opacity: "1" },
        remove: {
          opacity: "0",
          transform: `translateY(${movie.offset}px) translateX(200px)`,
        },
      },
      hook: {
        insert: (vnode) => {
          movie.elmHeight = vnode.elm.offsetHeight;
        },
      },
    },
    [
      h("div", { style: { fontWeight: "bold" } }, movie.rank),
      h("div", movie.title),
      h("div", movie.desc),
      h(
        "div.btn.rm-btn",
        {
          on: {
            click: () => {
              remove(movie);
            },
          },
        },
        "x"
      ),
    ]
  );
}

function render() {
  data = data.reduce((acc, m) => {
    console.log('acc', acc)
    console.log('m', m)
    const last = acc[acc.length - 1];
    m.offset = last ? last.offset + last.elmHeight + margin : margin;
    return acc.concat(m);
  }, []);
  totalHeight =
    data.length === 0
      ? 0
      : data[data.length - 1].offset + data[data.length - 1].elmHeight;
  vnode = patch(vnode, view(data));
}

function view(data) {
  return h("div", [
    h("h1", "Top 10 movies"),
    h("div", [
      h("a.btn.add", { on: { click: add } }, "Add"),
      "Sort by: ",
      h("span.btn-group", [
        h(
          "a.btn.rank",
          {
            class: { active: sortBy === "rank" },
            on: {
              click: () => {
                changeSort("rank");
              },
            },
          },
          "Rank"
        ),
        h(
          "a.btn.title",
          {
            class: { active: sortBy === "title" },
            on: {
              click: () => {
                changeSort("title");
              },
            },
          },
          "Title"
        ),
        h(
          "a.btn.desc",
          {
            class: { active: sortBy === "desc" },
            on: {
              click: () => {
                changeSort("desc");
              },
            },
          },
          "Description"
        ),
      ]),
    ]),
    h(
      "div.list",
      { style: { height: totalHeight + "px" } },
      data.map(movieView)
    ),
  ]);
}

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container3");
  vnode = patch(container, view(data));
  render();
});
```

### Hero

...