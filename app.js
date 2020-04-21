var Koa = require('koa');
var app = new Koa()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');
  var path = require("path");

var index = require('./routes/index');
var users = require('./routes/users');
var git = require('./routes/git');

// error handler
onerror(app);


app.use(views(path.join(__dirname, '/views'), {
    //autoRender: false,
    extension: 'ejs'
}))

// global middlewares
// app.use(views('views', {
//   root: __dirname + '/views',
//   default: 'ejs'
// }));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(async(ctx, next)=>{
  var start = new Date;
  await next();
  var ms = new Date - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(git.routes(), git.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
