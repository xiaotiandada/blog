- http://nodejs.cn/learn/reading-files-with-nodejs
- https://github.com/mgcrea/node-xlsx#readme

### 读取文件夹

```ts
// Get all folders
const getAllFolders = (path: string): string[] => {
  try {
    const isDS_Store = (fileName: string) => {
      return fileName !== '.DS_Store'
    }

    const data = fs.readdirSync(path).filter(isDS_Store)
    // console.log(data, data.length)
    return data
  } catch (err) {
    console.error(err)
    return []
  }
}
```

读取文件夹并排除 `.DS_Store` 文件

### 读取目录的内容

```ts
// Get all files
const getAllFiles = (path: string): string[] => {
  try {
    const data = fs.readdirSync(path)
    // console.log(data, data.length)
    return data
  } catch (err) {
    console.error(err)
    return []
  }
}
```

### 读取文件

```ts
const readFile = (path: string): string => {
  try {
    const data = fs.readFileSync(path, 'utf8')
    // console.log(data)
    return data
  } catch (err) {
    console.error(err)
    return ''
  }
}
```

### 写入文件

```ts
// Save To File
const saveToFile = (path: string, content: string | NodeJS.ArrayBufferView) => {
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path)
    }

    fs.writeFileSync(path, content)
  } catch (err) {
    console.error(err)
  }
}
```

如果存在则先删除

### 生成 XLSX 文件

```ts
const generateXLSX = (data: WorkSheet<unknown>[]): Buffer => {
  const sheetOptions = {
    '!cols': [{ wch: 30 }, { wch: 30 }, { wch: 30 }],
  }

  let buffer = xlsx.build(data, {
    sheetOptions,
  })

  return buffer
}
```

数据内容为二维数组的形式

```ts
const head = ['value', 'count', 'percent']
const values = ['name', '100', '100%']

const data = [
  {
    name: key,
    data: [head, values],
    options: {},
  },
]
```

需要一个表头，第一行数据简单定义了字段，然后合并数据。

但是多个工作表设置不同的 **cols** 还不知道怎么处理，可能需要借助其他的功能模块 🤔

#### node-xlsx

```js
// Parse an xlsx file

import xlsx from 'node-xlsx'
// Or var xlsx = require('node-xlsx').default;

// Parse a buffer
const workSheetsFromBuffer = xlsx.parse(
  fs.readFileSync(`${__dirname}/myFile.xlsx`)
)
// Parse a file
const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`)

// Build an xlsx file
import xlsx from 'node-xlsx'
// Or var xlsx = require('node-xlsx').default;

const data = [
  [1, 2, 3],
  [true, false, null, 'sheetjs'],
  ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
  ['baz', null, 'qux'],
]
var buffer = xlsx.build([{ name: 'mySheetName', data: data }]) // Returns a buffer
```

### Node.js 路径模块

http://nodejs.cn/learn/the-nodejs-path-module 一些路径使用 **path** 比较方便
