const koa = require('koa')
const serve = require('koa-static')
const bodyParser = require('koa-body')
const helmet = require('koa-helmet')
const cors = require('@koa/cors')
const http = require('http')
const https = require('https')
const { createHttpTerminator } = require('http-terminator')
const { createProxyMiddleware } = require('http-proxy-middleware');

require("dotenv").config();

class WebServer {
  constructor(config = {}) {
    this.host = config.host || '0.0.0.0'
    this.port = config.port || '80'
    this.cors = config.cors || { origin: '*' }
    this.app = new koa()


    switch (config.type) {
      case 'https':
        // this.ssl_options = {
        //   key: fs.readFileSync('server.key'),
        //   cert: fs.readFileSync('server.crt')
        // } 
        this.server = https.createServer(this.config.ssl_options, this.app.callback())
        break
      case 'http':
      default:
        this.server = http.createServer(this.app.callback())
    }

    const server = this.server;
    this.httpTerminator = createHttpTerminator({
      server
    })

    this.initMiddleWares()
  }

  initMiddleWares() {
    console.log('this.cors:', this.cors)
    this.app.use(cors(this.cors))
    this.app.use(bodyParser())

    // this.app.use(helmet.contentSecurityPolicy())
    // this.app.use(
    //   helmet.contentSecurityPolicy({
    //     directives: {
    //       'script-src-attr': null
    //     }
    //   })
    // );
    // this.app.use(helmet.dnsPrefetchControl())
    // this.app.use(helmet.expectCt())
    // this.app.use(helmet.frameguard())
    // this.app.use(helmet.hidePoweredBy())
    // this.app.use(helmet.hsts())
    // this.app.use(helmet.ieNoOpen())
    // this.app.use(helmet.noSniff())
    // this.app.use(helmet.permittedCrossDomainPolicies())
    // this.app.use(helmet.referrerPolicy())
    // this.app.use(helmet.xssFilter())
  }

  SetStatic(path) {
    this.app.use(serve(path));
  }

  SetRouter(router) {
    this.app.use(router.routes()).use(router.allowedMethods());
  }

  SetSocketIo(io) {
    this.io = io
    this.io.listen(this.server)
  }

  Start() {
    this.server.listen(this.port)
  }

  async Stop() {
    await this.httpTerminator.terminate();
  }

}

module.exports = WebServer
