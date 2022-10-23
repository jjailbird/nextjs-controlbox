const koa = require('koa');
const serve = require('koa-static');

const webServerPort = 8088;
const app = new koa();

app.use(serve(__dirname + '/out'));
const server = app.listen(webServerPort);

console.log('server start port:' + webServerPort);
