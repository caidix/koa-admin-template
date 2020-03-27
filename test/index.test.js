const { expect, should } = require('chai')
const supertest = require('supertest')
const app = require('../index')

const request = supertest.agent(app.listen()) //agent持久化cookie

describe('开始测试demo的GET请求', () => {
  // it("测试提示信息", "测试内容")
  it('测试user-get请求', (done) => {
    request
      .get('/api/user')  // 注入相应的api，查看接口是否符合规范且走通
      // .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.code).to.be.an('number')
        expect(res.body.message).to.be.an('string')
        done()
      })
  })
})


describe('开始测试demo的POST请求', () => {
  // 生命周期钩子
  before(function () {
    // runs before all tests in this block
  });

  after(function () {
    // runs after all tests in this block
  });

  beforeEach(function () {
    // runs before each test in this block
  });

  afterEach(function () {
    // runs after each test in this block
  });

  it('测试user-post请求', (done) => {
    request
      .post('/xxxx')
      // .send({ send仅能测试文本域
      //   username: 'username',
      //   password: '123456'
      // })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        expect(res.body.code).to.be.an('number')
        expect(res.body.message).to.be.an('string')
        done()
      })
  })
})