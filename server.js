const WebServer = require('./src/WebServer.js')
const Router = require('koa-router');

const port = 18088
const server = new WebServer({
  port,
})


const router = new Router()

router.get('/about', (ctx, next) => {
  ctx.body = {
    message: "소개"
  };
});

server.SetStatic(__dirname + "/out")
server.SetRouter(router)
server.Start()
console.log(`webserver on port http://localhost:${port} started`)

process.on('SIGINT', async function() {
  await server.Stop()
  console.log('webserver terminated!!!')
  process.exit()
})
