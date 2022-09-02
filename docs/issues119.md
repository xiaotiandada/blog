<!-- 图片压缩 -->

### [Squoosh](https://squoosh.app/)

- https://squoosh.app/
- https://github.com/GoogleChromeLabs/squoosh
- https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh

用 nodejs + squoosh 批量压缩处理图片

```bash
npm install @squoosh/lib
# or
yarn add @squoosh/lib
```

```ts
// Save To File
export const saveToFile = (
  path: string,
  content: string | NodeJS.ArrayBufferView
): void => {
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path)
    }

    fs.writeFileSync(path, content)
  } catch (err) {
    console.error(err)
  }
}

const isDS_Store = (fileName: string) => {
  return fileName !== '.DS_Store'
}

// Get all files
export const getAllFiles = (path: string): string[] => {
  try {
    const data = fs.readdirSync(path).filter(isDS_Store)
    // console.log(data, data.length)
    return data
  } catch (err) {
    console.error(err)
    return []
  }
}
```

```ts
import path from 'path'
import { saveToFile, getAllFiles } from './utils'
import fs from 'fs/promises'
// https://github.com/GoogleChromeLabs/squoosh/issues/1077
// @ts-ignore
import { ImagePool } from '@squoosh/lib'
import { cpus } from 'os'
import { chunk } from 'lodash'

const IMAGE_FOLDER = 'Images'
const IMAGE_FOLDER_2000 = 'Images_2000'

// 压缩图片
const compression = async (
  sourcePath: string,
  targetPath: string,
  resize: number,
  imagePool: any
) => {
  const file = await fs.readFile(sourcePath)
  const image = imagePool.ingestImage(file)
  // console.log('image', image)

  const preprocessOptions = {
    resize: {
      width: resize,
      height: resize,
    },
  }
  await image.preprocess(preprocessOptions)

  await image.encode({
    mozjpeg: {},
  })
  const { binary, extension } = await image.encodedWith.mozjpeg
  saveToFile(targetPath, binary)
}

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))

// 获取文件夹内的内容
const getAllData = async (): Promise<void> => {
  const files = getAllFiles(path.join(__dirname, IMAGE_FOLDER))
  // 分割处理
  const filesChunk = chunk(files, 20)
  // console.log('filesChunk', filesChunk)

  for (let i = 0; i < filesChunk.length; i++) {
    const element = filesChunk[i]
    // console.log('element', element)
    // 每次处理都创建一个池
    const imagePool = new ImagePool(cpus().length)

    for (let j = 0; j < element.length; j++) {
      const file = element[j]
      const sourcePath = path.join(__dirname, IMAGE_FOLDER, file)
      const targetPath2000 = path.join(
        __dirname,
        IMAGE_FOLDER_2000,
        file.replace('.png', `.jpeg`)
      )
      // 压缩图片，把池传递进去。png to jpeg
      await compression(sourcePath, targetPath2000, 2000, imagePool)
    }
    // 关闭池
    await imagePool.close()
    // 停几秒再继续执行
    await sleep(5000)
  }

  console.log('end')
}

getAllData()
```

- [Typescript types for @squoosh/lib](https://github.com/GoogleChromeLabs/squoosh/issues/1077)
- 一次执行太多会压缩出奇怪的图片然后就报错了，我本地大概几十张之后就出错了。切块批量处理就可以解决。

![image-20220902153832337](https://i.imgur.com/g0z0JLp.png)