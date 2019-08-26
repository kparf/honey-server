const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const logger = require('koa-logger');
const ssr = require('./ssr');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  const { html, ttRenderMs } = await ssr(`${ctx.protocol}://${ctx.host}${ctx.path}`);
  ctx.body = html;
});


app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(path.join(__dirname, '../../dist')));

app.listen(3000);