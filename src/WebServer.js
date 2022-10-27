const koa = require('koa')
const serve = require('koa-static')
const bodyParser = require('koa-body')
const helmet = require('koa-helmet')
const cors = require('@koa/cors')
const http = require('http')
const https = require('https')
const { createHttpTerminator } = require('http-terminator')
const { Server } = require('socket.io')
const { exec } = require("child_process");

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
  }

  initMiddleWares() {
    this.app.use(cors(JSON.parse(this.cors)))
    this.app.use(bodyParser())

    this.app.use(helmet.contentSecurityPolicy())
    this.app.use(helmet.dnsPrefetchControl())
    this.app.use(helmet.expectCt())
    this.app.use(helmet.frameguard())
    this.app.use(helmet.hidePoweredBy())
    this.app.use(helmet.hsts())
    this.app.use(helmet.ieNoOpen())
    this.app.use(helmet.noSniff())
    this.app.use(helmet.permittedCrossDomainPolicies())
    this.app.use(helmet.referrerPolicy())
    this.app.use(helmet.xssFilter())
  }

  SetStatic(path) {
    this.app.use(serve(path));
  }

  SetRouter(router) {
    this.app.use(router.routes()).use(router.allowedMethods());
  }

  SetSocketIo() {

    this.io = new Server()
    this.io.listen(this.server)
    this.io.on("connection", (s) => {
      console.log('socket io connected');
      // s.emit('hello', 'workd');
      s.on('backend_script', (arg) => {
        var result = exec(`sh ~/ces/scripts/${arg}`,
        (error, stdout, stderr) => {
          console.log(stdout);
          console.log(stderr);
          if (error !== null) {
            console.log(`exec error: ${error}`);
          }
        });

      })
    })
  }

  Start() {
    this.server.listen(this.port)
  }

  async Stop() {
    await this.httpTerminator.terminate();
  }

}

module.exports = WebServer
