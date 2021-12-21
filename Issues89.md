Vercel deploy ...

https://github.com/nuxt/vercel-builder#readme

1. /bin/sh: node-gyp-build: command not found  https://github.com/nuxt/vercel-builder/issues/371

   1. package.json add script

    ```json
    "scripts": {
      "vercel-build": "yarn global add node-gyp-build"
    }
    ```

    2. add vercel.json file

      ```json
      {
        "version": 2,
        "builds": [
          {
            "src": "package.json",
            "use": "@vercel/node"
          },
          {
            "src": "nuxt.config.js",
            "use": "@nuxtjs/vercel-builder",
            "config": {
              "serverFiles": [
                "package.json"
                ...
              ]
            }
          }
        ],
        "routes": [
          {
            "src": "/sw.js",
            "continue": true,
            "headers": {
              "Cache-Control": "public, max-age=0, must-revalidate",
              "Service-Worker-Allowed": "/"
            }
          }
        ]
      }
      ```

1. other dependencies command not found or local file command not found

需要包含在 serverFiles 或者 dependencies

其他也一样 command not found 基本上都一样 esm 之类的文件

```
npm i 'command not found'
```

3. Serverless Function "index" size limit

```
Error: The Serverless Function "index" is 104.9mb which exceeds the maximum size limit of 50mb. Learn More: https://vercel.link/serverless-function-size
```

dependencies move to devDependencies

前置条件 nuxt.config.js 没有导入任何依赖文件

- 如果需要 import 本地文件 需要在 vercel.json serverFiles 里面包含文件
- 如果需要 import 依赖，需要在 dependencies 包含
- 如果 import 本地文件 里面包含了 本地文件或依赖也需要包含在 serverFiles or dependencies
- 如果需要 modules 使用（不会报错 会有警告 所以可以包含在 dependencies）

减少 map 这样也可以减少打包大小

```javascript
  build: {
    extend (config) {
      config.devtool = false
    }
  },
```

4. if use svg-sprite-loader （optional）

https://github.com/JetBrains/svg-sprite-loader#readme

https://github.com/dword-design/nuxt-svg-sprite-loader#readme

https://nuxtjs.org/docs/directory-structure/modules/

```javascript
import packageName from 'depcheck-package-name'
import path from 'path'

const resolve = (dir) => path.join(__dirname, dir)
const svgRulePredicate = rule => rule.test && rule.test.test('.svg')

export default function (moduleOptions) {
  const options = { ...this.options.spriteSvgLoader, ...moduleOptions }
  this.extendBuild(config => {
    const imageLoaderRule = config.module.rules.find(svgRulePredicate)
    console.log('imageLoaderRule', imageLoaderRule, resolve('../icons/svg'))
    imageLoaderRule.exclude = [resolve('../icons/svg')]

    config.module.rules.push({
      loader: packageName`svg-sprite-loader`,
      options,
      include: [resolve('../icons/svg')], // include => 只处理指定的文件夹下的文件
      test: /\.svg$/,
    })
  })
}
```

5. nuxt.config.js import webpack （optional）

webpack command not found

maybe add webpack dependence can solve it

but i use other webpack rules, show ``Error: Cannot find module 'webpack/lib/RuleSet'``

6. nuxt.config.js import svg-sprite-loader（optional）

show ``Error: Cannot find module 'webpack/lib/RuleSet'``, so i remove it

use modules ``nuxt-svg-sprite-loader``

7. nuxt.config.js parallel config （optional）

if parallel is true, maybe build fail

