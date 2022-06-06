http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html

https://docs.github.com/cn/actions/quickstart

https://github.com/actions/starter-workflows/blob/7c29ac248118d9e004eb6776e22cadbca1dd524a/ci/node.js.yml 配置文件用了这个模版

https://docs.github.com/en/actions/reference/events-that-trigger-workflows 定时任务相关 定时在某个小时成功了，但是每分钟执行一次还没测试出来... 

```* * * * *` runs every minute of every day.``

https://docs.github.com/en/actions/reference/encrypted-secrets 设置 secrets  ``${{ secrets.TOKEN }}``

提交代码就可以自动执行

```yaml

# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the action will run. 
on:
  schedule:
    - cron: '0 4 * * *'

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [14.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/
          
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: TOKEN=${{ secrets.TOKEN }} node ./dist/index.js
   
```

