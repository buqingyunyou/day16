// 1.引入express
const express = require('express');
// 引入path模块 (用于路径的拼接,支持./和../等形式)
const path = require('path')

// 2.创建应用对象
const app = express();

// (6) 禁止向浏览器响应某个具体信息 比如x-powered-by
app.disable('x-powered-by');
  

// 3.配置路由
app.get('/getUsers/:page?/:pageSize?',(req,res)=>{
  // 获取get请求的 (查询字符串数据)
  // console.log(req.query);
  // 获取 (路由参数数据)
  // console.log(req.params, 'get');

  // 获取请求头信息
  // console.log(req.get('content-type'));
  // console.log(req.get('connection'));

  // (1) 响应数据(字符串)到客户端
  // res.send('<h1>服务器响应的数据GET</h1>');
  
  // (2) 响应客户端一个下载地址,让客户端直接下载
  // res.download('./风景.jpg') //相对路径
  // res.download(__dirname + '/风景.jpg'); //绝对路径

  // (3) 响应给客户端一个资源绝对路径,如果浏览器能展示就展示,否则就下载
  // res.sendFile(path.resolve(__dirname,'../风景.jpg'))

  // (4) 响应给客户端一个重定向地址
  // res.redirect('http://www.baidu.com')

  // (5) 设置响应头 (先设置响应后,再send发送响应)
  res.set('abc','123');
  res.send('响应get请求的数据')
  console.log(res.get('content-type'));

  
})

// 配置路由参数, 是在url的路径中配置, 且路由参数配置时,需在前面加:号, 后面的?表示客户端传递时,可传可不传(如果没有写?,则配置几个路由参数,发请求时必须传递对应的路由数据)
app.post('/getUsers/:page?/:pageSize?',(req,res)=>{
  // 获取路由参数
  console.log(req.params,);
  res.send('<h1>服务器响应的数据POST</h1>');
})



// 4.开启服务器
app.listen(5000, (err) => {
  if (err) console.log("服务器启动失败", err);
  else console.log("服务器启动成功");
})