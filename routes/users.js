var router = require('koa-router')();

router.prefix('/users');

router.get('/', async (ctx, next)=>  {
  return ctx.body = 'this is a users response!';
});

router.get('/bar', async (ctx, next)=>  {
  return ctx.body = 'this is a users/bar response!';
});

module.exports = router;
