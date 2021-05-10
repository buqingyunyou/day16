/**
 * 中间件 (middleWare)
 *  本质就是一个函数, 有三个参数(request,response,next)
 *  request对象:
 *    表示请求对象, 可以获取到请求信息
 *  response对象:
 *    表示响应对象, 可以设置和获取响应给客户端的信息
 *  next函数:
 *    表示下一个中间件, 只有调用了该函数, 下一个中间件才会执行,否则不会
 *      
 * 中间件的使用:
 *  app.use(中间件)
 *  即
 *  app.use((request,response,next)=>{...})
 * 
 * 
 * 中间件的作用:
 *  1) 获取和修改请求或响应对象
 *  2) 过滤无效(不符合规范)请求
 *  3) 调用(堆栈中)下一个中间件
 * 
 * 
 * 中间件的分类:
 *  1) 应用级中间件 (自定义中间件)
 *    app.use((request,response,next)=>{})
 *      > 修改请求和响应对象
 *      > 拦截非法请求
 *  2) 第三方中间件 (非express自带的, 而是下载的第三方库)
 *    app.use(bodyParser.urlencoded({extended:true}))
 *      >解析url到请求体中,让app.body拿到请求的数据
 *  3) express内置中间件 
 *    app.use(express.urencoded({extended:true}))  
 *      >解析url到请求体中,让app.body拿到请求的数据
 *  4) 路由器中间件
 *    
 * 
 * 注意事项:
 *  1. 客户端的一次请求, 服务器只会响应一次, 响应后不再修改request和response
 *  2. 在express中, 定义路由和中间件时, 会将定义的代码,按照定义顺序, 存放在类似数组的容器中. 当请求过来时, 依次从类数组容器中拿出进行匹配, 一旦匹配成功, 则立即执行, 且不再去匹配后续
 *  3. 请求过来时, 所有路由及中间件操作的request和response是同一个对象
 */

// 1.引入express
const express = require('express');

// 2.创建应用对象
const app = express();


/* 
  注意:
    1. 配置中间件, 必须在配置路由之前
    2. 所有的中间件,及路由都是异步回调函数
    3. 中间件最后一定要调用next函数,否则下一个中间价不会执行
*/
// 3. 配置中间件 (中间件就是一个回调函数, 触发条件就是客户端向该服务器发了请求)
app.use((request,response,next)=>{
  console.log("自定义的中间件执行...");
  request.a = 1;
  response.a = 1;
  next();
})


// 4.配置路由 (路由参数只有两个,request和response,没有next函数, 所以要下载所有中间件后面)
app.get('/',(req,res)=>{
  res.send('响应get/请求的数据');
  console.log(req.a);
  console.log(res.a);
})

app.post('/:id?',(req,res)=>{
  res.send('响应post/请求的数据');
  console.log(req.a);
  console.log(res.a);
})


// 5.开启服务器
app.listen(5000,(err)=>{
  if(err) console.log("服务器启动失败",err);
  else console.log('服务器启动成功');
})