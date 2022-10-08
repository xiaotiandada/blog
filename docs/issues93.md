<!-- Git -->

### Git 删除敏感数据

- https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
- https://rtyley.github.io/bfg-repo-cleaner/
- https://dev.to/toureholder/removing-sensitive-data-from-your-git-history-with-bfg-4ni4



### Git

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

