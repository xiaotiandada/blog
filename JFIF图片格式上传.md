---
title: JFIF图片格式上传
date: 2020-11-13 00:01:44
tags:
---

图片存储格式之一，由[JPEG](https://baike.baidu.com/item/JPEG)格式衍生而来，后缀为".jfif"。[JFIF](https://baike.baidu.com/item/jfif)

<!-- more -->

了解到一种新的图片格式JFIF 但是这种图片格式上传是导致失败 `Invalid filename`  

最后解决方案时候在前端上传的时候转换文件

如果没有图片的话可以在这里转换 https://convertio.co/zh/

前端：React Ant

后端：Nodejs Egg oss

> 后端代码忽略了 参考: https://github.com/eggjs/egg-oss

前端用Ant的Upload https://ant.design/components/upload-cn/ 

这里有篇介绍格式转换的 https://blog.csdn.net/qq_21937107/article/details/91424611

| 参数          | 说明                                          | 类型                      | 默认值 | 版本 |
| ------------- | --------------------------------------------- | ------------------------- | ------ | ---- |
| transformFile | 在上传之前转换文件。支持返回一个 Promise 对象 | function(file): string... | -      |      |

```typescript
function blobToFile(blob: any, fileName: string) {
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
}

async function transformFile(file: File): Promise<string | Blob | File> {
  // https://blog.csdn.net/qq_21937107/article/details/91424611
  // base64 to blob then file
  console.log('file', file)
  try {
    const fileImg = await imageConversion.filetoDataURL(file)
    const blob = await imageConversion.dataURLtoFile(fileImg)

    const fileName = file.name.split('.')
    let fileType = fileName[fileName.length - 1]

    // 如果文件类型是 jfif 使用 jpg 否则使用默认
    if (fileType === 'jfif') {
      fileType = 'jpg'
    }
    const result = blobToFile(blob, `${fileName[0] || Date.now()}.${fileType}`)
    console.log('result', result)

    return result
  } catch (e) {
    console.log('e', e)
    return file
  }
}
```

 利用 [imageConversion](https://github.com/WangYuLue/image-conversion) 逻辑就是 File transform base64 to blob then file

```typescript
// to base64
const fileImg = await imageConversion.filetoDataURL(file)
// to blob
const blob = await imageConversion.dataURLtoFile(fileImg)
// then file
blobToFile(blob, fileName)
```

JFIF上传成功包括WEBP IOS预览也正常

