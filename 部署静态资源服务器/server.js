/* 
  静态服务器部署后, 客户端访问静态服务器上的资源
    127.0.0.1:5000/风景.jpg 即可访问
    127.0.0.1:5000/readME.txt 即可访问
*/

// 1. 引入express
const express = require('express');

// 2. 创建应用对象
const app = express();


// 3.配置路由(让public作为静态资源,供客户端访问)
app.use(express.static('public'));


// 4. 启动服务器
app.listen(5000,(err)=>{
  if(err) console.log("服务器启动失败",err);
  else console.log("服务器启动成功");
})

