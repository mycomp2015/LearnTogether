var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql   =     require('mysql');
var empid,ename,estatus,jcode;
var serveritem=[];

app.use(express.static(__dirname + 'G:/SUJA/NodejsExamples/sqlconexam/New folder/'));
server.listen(4000, function() {
console.log('server up and running at 4000 port');

var con=mysql.createConnection
({     
  host        :   '10.0.0.50',	    
  user        :   'root',	
  password    :   'ubuntu123',	
  database    :   'dev_test',	});	
con.connect;	console.log('sql connected');


//master 1

 io.sockets.on("connection",function(socket){
 
  socket.on('empdata',function(data){
	 // console.log("___________________>>"+data);
	    console.log("emp data________>>"+data);
		empobj = JSON.parse(data);
		 var key;
	
	for(key in empobj.empdata) {

		console.log("************"+key);
			console.log("key check with in employee"+empobj.empdata[key]+"**********");
			if(key=="femp_id") 
				empid=empobj.empdata[key];
			else if(key=="femp_name")
				ename=empobj.empdata[key];
			else if(key=="femp_status")
				estatus	=empobj.empdata[key];
			else
				jcode=empobj.empdata[key];
		}
		
	var q2="insert into emp(`emp_id`,`emp_name`,`emp_status`,`jobcode`) values('+empid+','"+ename+"','"+estatus+"','"+jcode+"')";	
con.query(q2,function(err,rows,fields){
if(err)  { 
console.log('ERROR'+err.message); 
  }  else 
  { console.log('Record Inserted');
 } 
});
 
  });
  
 socket.on('some',function(data){
	 console.log("@@@@@@@@@@@@@@@@@@"+data);
	 var q1="select * from emp";	
con.query(q1,function(err,rows,fields){
if(err){  console.log('ERROR'+err.message);  }
else {
	//console.log("From Server"+JSON.stringify(rows));   
	//console.log("-----ROWS"+JSON.stringify(rows));
	//serveritem.push(JSON.stringify(rows));
//	console.log("------Server item"+serveritem);

	socket.emit('empdisp',rows);
	//console.log("after server emit"); 
console.log(rows);
	rows='';
	}
  });
 });
  
  });
 
 });




	
	



