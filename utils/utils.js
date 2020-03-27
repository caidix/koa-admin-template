const jwt = require('jsonwebtoken');
const secret = 'game-news';
const crypto = require('crypto');

/**
 * 返回加密后的密码
 * @param {账号密码} password 
 */
function createSha256(password) {
  const hash = crypto.createHash('sha256');
  return hash.update(password).digest('hex')
}

/**
 * 创建/获取token
 * @param {用户名} _id 
 */
function setToken(_id) {
  return jwt.sign({
    _id
  }, secret, { expiresIn: '24h' })
}
function undoJwt(token) {
  return jwt.verify(token, secret);
}

/**
 * 返回函数
 * @param {*} ctx 必填项
 * @param {*} Status 选填，默认200
 * @param {*} code 选填，默认0 0为成功，1为异常
 * @param {*} message 
 * @param {*} data 
 */
function returnClient(ctx, Status = 200, code = 0, message = '服务器异常', data = {}) {
  if (typeof Status === 'string') {
    message = Status;
    data = code || {};
    Status = 200;
    code = 0;
  }
  if (typeof code === 'string') {
    data = message || {};
    message = code;
    code = 0;
  }
  ctx.status = Status;
  ctx.body = {
    code,
    message,
    data
  }
}

module.exports = {
  createSha256,
  setToken,
  undoJwt,
  returnClient
}