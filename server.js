const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const proxy = require('koa-proxy');

const ssr = require('./src/ssr');
const config = require('./src/config');

const app = new Koa();
const router = new Router();

router.get('/:file.html', async (ctx, next) => {
  const { html, ttRenderMs } = await ssr(`${config.static}${ctx.path}`);
  ctx.body = html;
});

router.get('', async (ctx, next) => {
  const { html, ttRenderMs } = await ssr(`${config.static}${ctx.path}`);
  ctx.body = html;
});


app.use(logger());
app.use(router.routes());
app.use(proxy({ host: config.static}))

console.log(`started on ${config.port}`);
app.listen(config.port);