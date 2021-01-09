# koa-admin-template
 koa-template
 #### 使用: npm install; npm run start;

- npm init 
- npm install koa
- npm install nodemon
- npm i glob 
- npm i jsonwebtoken  
- npm i koa-bodyparser
- npm i koa-bunyan-logger
- npm i koa-qs
- npm i koa-helmet
- npm i koa-jwt
- npm i koa-log4
- npm i koa-router
- npm i koa-static
- npm i koa2-cors
- npm i moment
- npm i mongoose
- npm i mongoose-auto-increment
- npm i uuid

### 额外
'lodash,node-cron,require-directory,validate,chai,mocha,should,redis...'
"koa-convert",
"koa-json",
"koa-logger",
"koa-onerror"

### 单元测试
> 编写单元测试。
#### 安装：npm install --save-dev mocha chai supertest
#### 使用：npm run test

- mocha 模块是测试框架
- chai 模块是用来进行测试结果断言库，比如一个判断 1 + 1 是否等于 2
- supertest 模块是http请求测试库，用来请求API接口

### 用途
- cookie-parser: 对res传递一个res.cookie方法（用于response传给前端页面set-cookie）和req增加一个cookies对象。

```js
 res.cookie('token', value {
  maxAge: 1000 * 60 * 15, //过期时间
  httpOnly: true,
  domain: 'localhost:3000' // 生效域名
 }
 )
```
- bodyparser: res.body的时候是不会获得前端传递的请求体，它需要经过一定的转换而得。该插件将阅读headers里的content-type，将传过来的请求体转换成json的形式
