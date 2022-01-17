[访问存储在OSS中的资源时资源被强制下载](https://help.aliyun.com/document_detail/39545.html)

[Content-Disposition](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition)

>## 问题原因
>
>访问存储在OSS的文件、图片等被强制下载的可能原因如下所示：
>
>- 使用OSS提供的默认域名，且没有经过其他配置。
>- 对应资源的Content-Type设置错误。Content-Type如果设置为application/octet-stream也会导致强制下载，这个是二进制的下载流。
>- 对应资源的Content-Disposition设置错误。Content-Disposition如果设置为attachment，就是会强制下载。
>- CDN缓存了错误的Content-Type或者Content-Disposition。
>- 浏览器不支持该格式资源的展示。

条件问题只测试了没有域名，使用默认 OSS 提供的域名。

图片1

https://storageapi.fleek.co/andoroyur-team-bucket/metanetwork/users/metaio-storage/24jokhpxex0vg9bkcvav9xrn1.jpeg

![image](https://user-images.githubusercontent.com/24250627/148896308-ab2fa536-f9fb-47f8-98c9-8b6af744cca3.png)

```
content-type: application/octet-stream
```

这张图片会默认下载

图片2

https://smartsignature-img.oss-cn-hongkong.aliyuncs.com/banner/2020/02/04/a60cf0aa4ec50c39196dbf97ceddbbc8.jpg

![image](https://user-images.githubusercontent.com/24250627/148896449-a716187e-0c7c-4d1b-a23e-c85d6842f097.png)

```
Content-Type: image/jpeg
```

图片会默认打开预览

如果 修改 HTTP 头

```
Content-Disposition: attachment
Content-Type: image/jpeg
```

![image](https://user-images.githubusercontent.com/24250627/148896709-481b30f6-d521-41be-bd03-8c5179b305c4.png)

这种情况会下载图片

```
content-type: application/octet-stream
```

这种设置会下载图片



其他情况具体需要测试