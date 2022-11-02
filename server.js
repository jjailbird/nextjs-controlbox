const WebServer = require('./src/WebServer.js')
const Router = require('koa-router');
const io = require('./src/socket.io')

require("dotenv").config();

const port = process.env.SERVER_PORT
const server = new WebServer({
  port,
  // cors: {
  //   origin: [
  //     'http://ipv4.download.thinkbroadband.com', 
  //     'http://localhost:18080',
  //   ],
  //   credentials: true, 
  // }
})

const router = new Router()
router.get('/about', (ctx, next) => {
  ctx.body = {
    message: "소개"
  };
});

server.SetStatic(__dirname + "/out")
server.SetRouter(router)
server.SetSocketIo(io)
server.Start()
console.log(`webserver on port http://localhost:${port} started`)


process.on('SIGINT', async function() {
  await server.Stop()
  console.log('webserver terminated!!!')
  process.exit()
})
