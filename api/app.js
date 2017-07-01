var express = require('express');
var app = express();

app.all('*', function(req, res, next) {
		 console.log('Acouter')
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        if(req.method=="OPTIONS") {
            res.send(200);/*让options请求快速返回*/
        } else{
            next();
        }
    });
var mysql = require('mysql');
//配置模块
var settings = require('./settings');
//连接数据库
var connection = mysql.createConnection(settings.db);
connection.connect();

//查询 *** lastproject为表名
var selectSQL = 'select * from `lastproject`';

var arr = [];
connection.query(selectSQL, function(err, rows) {
    if (err) throw err;
    for (var i = 0; i < rows.length; i++) {
        arr[i] = rows[i].productname;
    }

    //把搜索值输出
    app.get('/', function(req, res) {
        
        res.send(arr);
    });
 app.post('/', function(req, res) {
     
        res.send(arr);
    });

});
//关闭连接
connection.end();
app.listen(888);