// const UserModel = require('../model/User');

/**
 * ctx.request.query :get
 * ctx.request.body :body
 * 是否使用RESTfulApi？
 */
const { returnClient } = require('../utils/utils')
class UserController {
  async register(ctx, next) { }
  async test(ctx) {
    ctx.body = {
      msg: 'ok'
    }
    returnClient(ctx, 'success', { id: 1 })
  }
}
module.exports = new UserController();