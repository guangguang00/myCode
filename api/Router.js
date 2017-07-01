var path = require('path');


// var UserRouter = require('./User.router.js');


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'soeasy',
    port:'3306'
});

connection.connect();
//查询
var arr = [];
connection.query('select * from `lastproject`', function(err, rows, fields) {
   	if (err) throw err;
    for (var i = 0; i < rows.length; i++) {
        arr[i] = rows[i].name;
    }
});
//关闭连接



exports.Register = function(express){
	var app = express();

	
	// UserRouter.Register(app);
	app.get('/', function(request, response){
		response.send(arr);
	})
	
	app.use(express.static(path.join(path.resolve(__dirname, '../../'), '/')));

	app.listen(888);
}
connection.end();