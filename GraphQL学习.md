---
title: GraphQL学习
date: 2020-07-07 13:02:08
tags:
categories: graphql
---

学习记录📝 [Repo](https://github.com/xiaotiandada/graphql)

<!-- more -->

**资料**

https://graphql.org/

https://mp.weixin.qq.com/s/bqStS2IBvBSDAiSjLdYETw

https://www.apollographql.com/docs/apollo-server/

## 尝鲜(初次体验)

### 复制文档

```bash
# ... init ...
npm install graphql
```

```javascript
var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});
```

然后运行 ``node app``, 基本操作了... 这个可能不太直观 ~

```bash
npm install express express-graphql graphql
```

```javascript
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
```

然后运行 ``node app``, 可以在 ``/graphql``路由下运行他的工具页面 (懒得截图 🍑)

```bash
npm install apollo-server-express express
```

```javascript
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
```

重复上面的操作... 这里利用了 [apollo-server](https://www.apollographql.com/docs/apollo-server/)

```json
{
	hello
}
```

简单的查询 Query hello..... hello world 经典语录

具体的可以看文档, 没有什么营养 因为都是copy的(凑点字数).....

---

### 简单的操作

需要一个简单的 books list

1. 查询所有books
2. 添加 book
3. 更新 book
4. 删除 book

跳过依赖安装, 缺少依赖自行搞定! 没有使用数据库 本地存放一个 **Varible** 

```javascript
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// 书库 没接数据库
const books = [
  {
    id: 0,
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    id: 1,
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  },
];

// 定义 type
const typeDefs = gql`
  type Book {
    id: Int,
    title: String
    author: String
  }

  type Query {
    books: [Book],
  }

  type Mutation {
    createBook(title: String, author: String): Book,
    updateBook(id: Int, title: String, author: String): Book,
    deleteBook(id: Int, title: String, author: String): Book,
  }
`;
// 定义 resolvers
const resolvers = {
  Query: {
    // 查询所有书
    books: () => books,
  },
  Mutation: {
    // 创建一本书
    createBook: (_, { title, author }) => {
      let list = {
        id: books.length,
        title,
        author
      }
      books.push(list)
      return list
    },
    // 更新一本书
    updateBook: (_, { id, title, author }) => {
      let idx = books.findIndex(i => i.id === id)
      if (~idx) {
        books[idx] = {
          id: idx,
          title: title,
          author: author
        }
        return books[idx]
      } else {
        return []
      }
    },
    // 删除一本书
    deleteBook: (_, { id }) => {
      let idx = books.findIndex(i => i.id === id)
      if (~idx) {
        books.splice(idx, 1)
        return books[idx]
      } else {
        return []
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
```

```json
query GetBooks {
  books {
    id,
    title
    author
  }
}

mutation Create {
  createBook(title: "12312", author: "xxxxx") {title, author},
}

mutation Update {
  updateBook(id: 0, title: "123", author: "xxxxx") {id, title, author}
}

mutation Delete {
  deleteBook(id: 1) {id, title, author}
}
```

一些请求语句参考 愿君快速 **debug** 

```json
{
  "data": {
    "books": [
      {
        "id": 0,
        "title": "Harry Potter and the Chamber of Secrets",
        "author": "J.K. Rowling"
      },
      {
        "id": 1,
        "title": "Jurassic Park",
        "author": "Michael Crichton"
      }
    ]
  }
}
```

所有书单的返回 **list**

因为第一次使用, 先给自己踩个坑, 后续的一些功能使用会慢慢了解, 并且更新文章 🍑