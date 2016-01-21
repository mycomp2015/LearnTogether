var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server); 
 server.listen(7000);
 var redis = require("redis"),client = redis.createClient();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
client.on('connect', function() {
    console.log('connected');
});
 client.set('id','100',redis.print);
  client.set('vid','1',redis.print);

 io.sockets.on("connection",function(socket){
   var Multiuser=[];
var logObj,id;
var regObj;
var check,regCommand;
var detail;
var currUser='hello';
var username;
  socket.on('reguser',function(data){
	  console.log("___________________>>"+data);
	 // io.sockets.emit('register',data);
	    console.log("_registered data________>>"+data);
		 regObj = JSON.parse(data);
		 var key, count = 0;
for(key in regObj.reguser) {
	//console.log("KEYYYYYYYYYYYYYYYYYYYYYYYYY"+regObj.reguser[key]);
	if(key=='action'){
			if(regObj.reguser[key]=='register'){	
			console.log("action key check with in reg"+regObj.reguser[key]+"**********"+regObj.reguser.action);
			console.log("inside the if");
			console.log("id=="+id);
			 client.get('id',function(err,replies){
			 id=replies;
			data=JSON.stringify(regObj);
			 client.hset("ChatReg", id, data, redis.print);
			 client.incr('id',redis.print);
			});
			}
			}
			}
		  })
  
  
  
  socket.on('loginuser',function(data){
	  logObj = JSON.parse(data);
	  console.log("___________________>>"+data);
	  var Lkey, count = 0;
	  for(Lkey in logObj.loginuser ) {
	  console.log("2.CHECKING FOR LOGUSER"+logObj.loginuser[Lkey]+"***********"+Lkey);
	  if(logObj.loginuser[Lkey]=='login'){
				console.log("action key check with in login"+logObj.loginuser[Lkey]);
				console.log("inside the else");
				 client.get('vid',function(err,reply){
					 vid=reply;
				console.log("vid=="+vid);
			client.hset("ChatLog", vid, data, redis.print);
			 client.incr('vid',redis.print);	
			  });
			}
	  }
		    console.log("__logged  data________>>"+data);
		
  
  client.hgetall("ChatLog", function (err, replies) {
			
			console.log("!!!!"+replies);
			
			detail=replies;
			console.log("DETAIL->"+detail);
			
			for(var dKey in detail)
			{
				var det=JSON.parse(detail[dKey]);
				
				//console.log("222222222"+det.loginuser);
				//console.log("&&&&&&&&&&&&&&&&&&&&&"+dKey+"&&&&&&&&&&&&&"+det.loginuser.user);
				
					Multiuser.push(det.loginuser.user);
			}
				//console.log("MULTIUSER"+Multiuser);
	client.hgetall("ChatReg", function (err, replies) {
    console.log("1.QUERY OUTPUT REG"+replies);
	send=replies;
	console.log("ID"+send);
	var bool;
		for(var sKey in send) {
			
			var validation;
			var chatUser;
			 check=JSON.parse(send[sKey]);
			 currUser=logObj.loginuser.user;
		//console.log("-----"+check.reguser.username+"---"+logObj.loginuser.user+"***"+check.reguser.passWord+"&&"+logObj.loginuser.passWord)	;
	if(check.reguser.username==logObj.loginuser.user && check.reguser.passWord==logObj.loginuser.passWord)
	{
		
	//console.log("inside....if");	
	bool='true';
	//username=logObj.loginuser.user;	
	status='online';
	
	}
	else{
		
		//console.log("user invalid");
		 validation={
		message:"user invalid"
	}
	
		}
		}
		if(bool=='true'){
	//console.log("MULTI------USER"+Multiuser);
		validation={
			
		message:"user valid"
		
		
	}
	
	
		validation=JSON.stringify(validation);
		
		
	socket.emit('Authentication',validation);
	//console.log("-----after authen-->"+validation);
	
	
}
else{
	
	validation=JSON.stringify(validation);
	socket.emit('Authentication',validation);
}

	});
		})
		
			//console.log("MULTIyyyyyyyyyyyyyyyyyyyyUSER"+Multiuser);
			});
			
			socket.on('loginuser',function(data){
				console.log("data again"+data);
			data=JSON.parse(data);
			console.log("data again"+data);
			for(var key in data){
				console.log("key"+key+"data"+data.loginuser.user);
			}
			
		
	client.hgetall('ChatReg',function (err, replies) {
	
	var userDisplay=replies;
	for(var validKey in userDisplay){
	//	console.log("key---->"+validKey+"*********"+userDisplay[validKey]);
		var verify=JSON.parse(userDisplay[validKey]);
	//	console.log("+++++++++++++"+verify.reguser.username);
	
if(verify.reguser.username==data.loginuser.user && verify.reguser.passWord==data.loginuser.passWord)
	{
		console.log("inside if");
		chatUser={
		message:data.loginuser.user,"status":"online"/*"Onlineuser":Multiuser*/
	}
	chatUser=JSON.stringify(chatUser);
		console.log("---->chatup"+chatUser);
			socket.emit('Chatap',chatUser);
		console.log("----after>chatup"+chatUser);
	
	}
	
	
	
	}

	});
	});
	
	
	
	
			socket.on('send msg',function(data){
	  console.log("___________________>>"+data);
	  io.sockets.emit('get msg',data);
	  io.emit('an event sent to all connected clients');
	    console.log("___________emited data________>>"+data);
  });
 
 
    
});
console.log('Server running at http://localhost:3000/');