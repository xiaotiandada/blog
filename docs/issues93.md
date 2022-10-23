<!-- Git -->

### Git 删除敏感数据

- https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
- https://rtyley.github.io/bfg-repo-cleaner/
- https://dev.to/toureholder/removing-sensitive-data-from-your-git-history-with-bfg-4ni4



### 创建模板仓库

- https://docs.github.com/cn/repositories/creating-and-managing-repositories/creating-a-template-repository

### Git 教程笔记

![image-20221004211342637](https://i.imgur.com/c78jXHN.png)

![image-20221004211406157](https://i.imgur.com/yQki8uO.png)

![image-20221004211437194](https://i.imgur.com/sFInrDw.jpg)

![image-20221004211501698](https://i.imgur.com/nGrdCQq.png)

![image-20221004211724832](https://i.imgur.com/9VQvz1J.png)



#### commit

```bash
git add .
git add -u # update


# git commit -am"Add test"
```

#### 文件重命名

```bash
git mv ./git/rename/readme ./git/rename/readme.md


git status
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        renamed:    git/rename/readme -> git/rename/readme.md

```

#### log

- https://www.cnblogs.com/bellkosmos/p/5923439.html

```bash
git log

git log -n2

git log -n2 --oneline

git log --all

git log --all --graph

git log --oneline --all

git log --oneline --all -n2

git log --oneline --all -n4 --graph

# * f2635c4 (HEAD -> master, origin/master, origin/HEAD) feat: rename
# * 4abf9ec feat: rename
# * 6a8f38d feat: record
# | * 21e577d ....
# |/  
```

![image-20221005025208931](https://i.imgur.com/5mllTyI.png)

#### .git

##### HEAD

整个仓库正在工作在那个分支上

引用 指向 refs 信息 `ref: refs/heads/dev`

![image-20221009002425592](https://i.imgur.com/pNmvncO.jpg)

##### config

本地相关的配置信息

![image-20221009002534427](https://i.imgur.com/0VJNDFl.png)

##### refs

- heads 分支
- tags 里程碑



https://git-scm.com/docs/git-cat-file

```bash
git cat-file -t xxxxxxxxx
# commit
```

**heads**

![image-20221009003256723](https://i.imgur.com/msx8Ymv.jpg)

**tag**

![image-20221009003607241](https://i.imgur.com/ao9DlFN.jpg)

##### objects

![image-20221009004007204](https://i.imgur.com/2nkwuQx.jpg)



![image-20221012032754696](https://i.imgur.com/YZXjOPj.jpg)

![image-20221012033157323](https://i.imgur.com/KZ6D5FZ.png)

![image-20221012033347515](https://i.imgur.com/MLE9udV.png)

2 tree

1 blob

1 commit

![image-20221012033515810](https://i.imgur.com/HVf2xfc.jpg)



#### 42丨GitHub都有哪些核心功能？

- https://github.com/features
- https://github.com/marketplace

#### 43丨怎么快速淘到感兴趣的开源项目

- https://docs.github.com/cn/search-github/getting-started-with-searching-on-github/about-searching-on-github
- https://docs.github.com/cn/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax
- https://docs.github.com/cn/search-github/getting-started-with-searching-on-github/sorting-search-results

Advanced search

Cheat sheet

```
git 最好 学习 资料 in:readme

git 最好 学习 资料 in:readme stars:>1000
```

#### 44丨怎样在GitHub上搭建个人博客

- https://github.com/barryclark/jekyll-now

#### 45丨开源项目怎么保证代码质量？

- https://github.com/pulls



- Code Review
- Code CI

#### 46丨为何需要组织类型的仓库？

- https://github.com/settings/organizations

#### 47丨创建团队的项目

- https://github.com/new

#### 48丨怎样选择适合自己团队的工作流？

![image-20221022100802846](https://i.imgur.com/dZ7BYwd.png)

![image-20221022100813755](https://i.imgur.com/xnL66DK.png)

![image-20221022101033708](https://i.imgur.com/omVPcEi.png)

![image-20221022101128975](https://i.imgur.com/m8zVz2s.png)

![image-20221022101206695](https://i.imgur.com/439mAvv.png)

![image-20221022101329362](https://i.imgur.com/lYpq2g0.png)

![image-20221022101345705](https://i.imgur.com/2gVXFcW.png)

#### 49丨如何挑选合适的分支集成策略？

- https://github.com/AmbrusStudio/launcher/network
- https://github.com/xiaotiandada/cv/settings
  - Pull Requests
    - Allow merge commits 
    - Allow squash merging 
    - Allow rebase merging 

**changeset**

https://stackoverflow.com/questions/38648491/what-is-a-changeset-in-git

**Merge**

当前特性分支和主干分支不存在冲突，git 会自动合并帮我们创建一个 Merge commit

**Squash** 

当前特性分支不改变

当前特性分支和主干分支最近的一个祖先，从祖先点开始当前分支变更的几个 commit ，把他们最后的变更集 changeset 挑出来，放在主干分支最新的 commit 上去创建一个新的记录

1. 如果 commit 功能点不一样，就没必要合并

**Rebase**

当前特性分支不改变

将当前特性分支的 commit 变更集 changeset 一个一个拧出来放在主干分支最新 commit 后面



团队喜欢线性分支模式的情况下用 squash rebase 比较合适的



#### 50丨启用issue跟踪需求和任务

