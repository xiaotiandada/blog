## 坑

1. 新 bvm install 的 bit，import 不能 import old bit project compoents，可以 import harmony project components

2. bit start 如果不能启动，需要 compile then start or down version [Issues](https://github.com/teambit/bit/issues/4522)

3. 如果有多个目录 ``bit export`` 报错 ``unable to export the following lanes master. they don't exist or are empty`` 可以分开导出比如 ``bit export nft/card``