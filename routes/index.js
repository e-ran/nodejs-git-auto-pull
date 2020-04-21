var router = require('koa-router')();

router.get('/', async (ctx, next)=>  {
  return ctx.render('index', {
    title: 'Hello World Koa!'
  });
});

router.get('/foo', async (ctx, next)=>  {
  return ctx.render('index', {
    title: 'Hello World foo!'
  });
});

module.exports = router;
