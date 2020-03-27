const { undoJwt, returnClient } = require('../utils/utils')
module.exports = (ctx, next) => {
  let token = ctx.headers.authorization || ''
  if (token) {
    const { _id } = undoJwt(token);
    if (!_id) {
      returnClient(ctx, 403, 0, '请先登录!');
    }
    // DB查询 return result
    if (!result) {
      returnClient(ctx, 403, 0, '请先登录!');
    }
    return next()
  } else {
    returnClient(ctx, 403, 0, '请先登录!');
  }
}