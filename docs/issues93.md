<!-- Git -->

### Git 删除敏感数据

- https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
- https://rtyley.github.io/bfg-repo-cleaner/
- https://dev.to/toureholder/removing-sensitive-data-from-your-git-history-with-bfg-4ni4



### 创建模板仓库

- https://docs.github.com/cn/repositories/creating-and-managing-repositories/creating-a-template-repository



### Git 教程笔记

#### 01丨课程综述

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

- https://github.com/vuejs/vue/issues
- https://github.com/vuejs/vue/labels
- https://github.com/vuejs/vue/milestones
- https://github.com/vuejs/vue/tree/main/.github
- https://github.com/xiaotiandada/cv/issues/templates/edit

#### 51丨如何用project管理issue？

- https://github.com/xiaotiandada/cv/projects

#### 52丨项目内部怎么实施code review？

Require a pull request before merging

- https://github.com/xiaotiandada/cv/settings/branch_protection_rules/new

#### 53丨团队协作时如何做多分支的集成？

- PR
  - Create a merge commit
  - Squash and merge
  - Rebase and merge
- Resolve Confilcts



Rebase and merge 网页手动解决冲突后提示 "This branch cannot be rebased due to conflicts"

1. git rebase origin/master
2. fix conflict
3. ...
4. git rebase --continue
5. ...
6. fix conflict
7. git push -f origin/feature

Rebase 后提示 "This branch has no conflicts with the base branch when rebasing"

![image-20221025004807010](https://i.imgur.com/1rMfviA.png)



一个 commit 多个头像？

一个 author 一个 commit



**7.9 Git 工具 - Rerere**

- https://git-scm.com/book/en/v2/Git-Tools-Rerere
- https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-Rerere



...Todo

#### 54丨怎样保证集成的质量？

- https://github.com/marketplace/codecov

- https://github.com/marketplace/travis-ci
- https://github.com/marketplace/circleci
- https://www.travis-ci.com/
- https://about.codecov.io/



分支保护

- https://github.com/xiaotiandada/cv/settings/branch_protection_rules/new

#### 55丨怎样把产品包发布到GitHub上？

- https://github.com/xiaotiandada/cv/releases/new
- CI Deploy

#### 56丨怎么给项目增加详细的指导文档？

- https://github.com/xiaotiandada/cv/wiki

#### 57丨国内互联网企业为什么喜欢GitLab？

- https://about.gitlab.com/

#### 58丨GitLab有哪些核心的功能？

- https://about.gitlab.com/devops-tools/
- https://about.gitlab.com/stages-devops-lifecycle/
- https://about.gitlab.com/topics/devops/



GitLab

- Merge requests

Github

- Pull Requests



![Continuous integration](https://about.gitlab.com/_nuxt/image/cbdd4f.svg)

#### 59丨GitLab上怎么做项目管理？

- https://gitlab.com/groups/gitlab-org/-/issues
- https://gitlab.com/groups/gitlab-org/-/epics?state=opened&page=1&sort=start_date_desc

- Issues
  - List
  - Boards
  - Labels
  - Service Desk
  - Milestones
- Epics

#### 60丨GitLab上怎么做code review？

- https://gitlab.com/groups/gitlab-org/-/merge_requests



**Settings**

- Push Rules
  - Restrict push operations for this project. [Learn more.](https://gitlab.com/help/user/project/repository/push_rules)
- Protected Branches
  - Keep stable branches secure and force developers to use merge requests. [What are protected branches?](https://gitlab.com/help/user/project/protected_branches)
- ...

#### 61丨GitLab上怎么保证集成的质量？

- https://gitlab.com/gitlab-org/gitlab/-/blob/master/.gitlab-ci.yml
- https://gitlab.com/gitlab-org/gitlab/-/pipelines
- https://gitlab.com/gitlab-org/gitlab/-/pipelines/675919425#/

#### 62丨怎么把应用部署到AWS上？

- https://gitlab.com/gitlab-org/gitlab/-/pipelines
- https://aws.amazon.com/cn/



**Merge requests**

- https://gitlab.com/xiaotiandada/gatsby/-/settings/merge_requests

**Merge method**

Determine what happens to the commit history when you merge a merge request. [How do they differ?](https://gitlab.com/help/user/project/merge_requests/methods/index.md)

- [ ] **Merge commit**

Every merge creates a merge commit.

- [ ] **Merge commit with semi-linear history**

Every merge creates a merge commit.
Merging is only allowed when the source branch is up-to-date with its target.
When semi-linear merge is not possible, the user is given the option to rebase.

- [ ] **Fast-forward merge**

No merge commits are created.
Fast-forward merges only.
When there is a merge conflict, the user is given the option to rebase.
If merge trains are enabled, merging is only possible if the branch can be rebased without conflicts. [What are merge trains?](https://gitlab.com/help/ci/pipelines/merge_trains.md#enable-merge-trains)
