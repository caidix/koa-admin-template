const koa = require('koa')
const bodyParser = require('koa-bodyparser')
// const createError = require('http-errors');
const session = require('koa-session');
const cors = require('koa2-cors')
const consola = require('consola')
const PORT = process.env.PORT || 7000;
const path = require('path')
// const koaStatic = require("koa-static");
const routing = require("./routes");
const koaBunyanLogger = require('koa-bunyan-logger');

// register koa
const app = new koa();

// Cross domain
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 60 * 1000 * 30,
  credentials: true,
  allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));

// setup SessionConfig
const sessionCfg = {
  key: 'gamenews:admin-session',
  maxAge: 60 * 1000 * 30, //过期时间
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(sessionCfg, app))
  // 配置ctx.body解析中间件
  .use(bodyParser())
  // Log report
  .use(koaBunyanLogger())
  .use(koaBunyanLogger.requestIdContext())
  .use(koaBunyanLogger.requestLogger({
    ignorePath: ['/'],
    updateRequestLogFields: function (fileds) {
      fileds.module = '请求模块'
    },
    updateResponseLogFields: function (fileds) {
      fileds.module = '回调模块'
    }
    // updateLogFields: function(fields){
    //   fields.req_query = this.request.query;
    //   fields.req_body = this.request.body;
    //   fields.StatusCode = this.formatResponseMessage.status;
    // }
  }))

const loggerOptions = {
  name: 'games-news'
}
const logger = koaBunyanLogger.bunyan.createLogger(loggerOptions)

// connect mongoDB
// require('./utils/database')(app);

// control error
app.on('error', (err, ctx) => {
  if (ctx) {
    ctx.log.error({ originErr: err, req: ctx.request }, `错误：${err.message}`);
  } else {
    logger.error({ originErr: err }, `错误：${err.message}`)
  }
})

// route 
routing(app);

// start server
app.listen(PORT, () => {
  consola.ready(`服务器已开启： http://localhost:${PORT}/`)
  logger.info(`✔ server is opening!`)
})