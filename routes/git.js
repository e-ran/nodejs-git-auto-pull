var router = require('koa-router')();
var {spawn,exec} = require('child_process');

router.prefix('/git');

var gitbashPath = "C:/Program Files/Git/git-bash.exe";

router.all('/pull',async (ctx, next)=> {
  console.log("pull params:", ctx.body, ctx.query);

  var opt = {
    cwd: "C:/inetpub/wwwroot/"
  }

  return new Promise((resolve, reject)=>{
    exec("sh ./pull.sh", opt, (err, stdout, stderr)=>{
      if(err) {
        var msg = 'get weather api error:' + stderr + "|||" + err;
        ctx.body = msg;
        console.log(msg);
        resolve(msg);
      } else {
          var data;
          try{
            data = JSON.parse(stdout);
          }catch(e){
            data = stdout;
          }
          
          ctx.body = data;
          console.log(data);
          resolve(data);
      }
    });

  });

  
});



module.exports = router;
