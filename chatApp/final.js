var http = require('http');
var fs = require('fs');
var path_exists = require('path-exists');
var path = require('path');

var redis = require("redis"),client = redis.createClient();

var io = require('socket.io');
var vid;
var Multiuser=[];
var detail;
var example;
var check;
      var id;
	  var username,status;
	  var send;
	  var cnt=0;
client.on('connect', function() {
    console.log('connected');
});

 client.set('id','100',redis.print);
  client.set('vid','1',redis.print);
  
var server=http.createServer(function (request, response) {
    console.log('request starting...');
	
	var filePath = '.' + request.url;
	
	if (filePath == './')
		filePath = './sok.html';
			var extname = path.extname(filePath);
			
			
	
	
	switch (extname) {
		case '.html':
		contentType = 'text/html';
		break;
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.jpg':
			contentType = 'image/jpg';
			break;
	}
	
	path_exists(filePath).then(function(exists) {
	
		if (exists) {
			fs.readFile(filePath, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				}
				else {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				}
			});
		}
		else {
			response.writeHead(404);
			response.end();
		}
	});
	
}).listen(3000);
io = io.listen(server); 
io.sockets.on("connection",function(socket){
	var  validation={
		message:"fruits"
	}
	socket.send(JSON.stringify(validation));

    /*Associating the callback function to be executed when client visits the page and 
      websocket connection is made */

      
  socket.on("message",function(data){
		console.log("TEST"+data);
       This event is triggered at the server side when client sends the data using socket.send() method 
      var time = JSON.parse(data);
	   

		 client.get('id',function(err,replies){
			//  console.log("^^^^^^^^^^^^^^^^^^^"+replies);
			 id=replies;
			 
			 var key, count = 0;
for(key in time.message) {
	console.log("KEYYYYYYYYYYYYYYYYYYYYYYYYY"+time.message[key]);
	if(key=='action'){
			if(time.message[key]=='register'){	
			console.log("action key check with in reg"+time.message[key]);
			console.log("inside the if");
			console.log("id=="+id);
			data=JSON.stringify(time);
			 client.hset("registereduser", id, data, redis.print);
			 client.incr('id',redis.print);
			}
			else if(time.message[key]='login'){
				console.log("action key check with in login"+time.message[key]);
				console.log("inside the else");
				 client.get('vid',function(err,reply){
					 vid=reply;
				console.log("vid=="+vid);
			client.hset("loggeduser", vid, data, redis.print);
			 client.incr('vid',redis.print);	
			  });
			}
		
	}
		
	}
	
	//console.log("key----------"+key+"="+time.message[key]);
	
  

//console.log("timeeeeeeeeeee"+time.message.user+"::"+time.message.userFirstname);
		
			
		
			
		 });
		 client.hgetall("loggeduser", function (err, replies) {
			
			console.log("!!!!"+replies);
			
			detail=replies;
			console.log("DETAIL->"+detail);
			
			for(var dKey in detail)
			{
				var det=JSON.parse(detail[dKey]);
				console.log("=========================="+det.message.user.length);
				console.log("222222222"+det.message);
				console.log("&&&&&&&&&&&&&&&&&&&&&"+dKey+"&&&&&&&&&&&&&"+det.message.user);
				
					Multiuser.push(det.message.user);
			}
				console.log("MULTIUSER"+Multiuser);
	client.hgetall("registereduser", function (err, replies) {
    console.log(replies);
	send=replies;
	console.log("ID"+send);
	var bool;
		for(var sKey in send) {
			
			var validation;
			 check=JSON.parse(send[sKey]);
			
	
   console.log(" user valid "+check.message.username+"--"+time.message.user);
	if(check.message.username==time.message.user && check.message.passWord==time.message.passWord)
	{
		
	bool='true';
	username=time.message.user;	
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
	console.log("MULTI------USER"+Multiuser);
		validation={
			
		message:"user valid","username":time.message.user,"status":"online","Onlineuser":Multiuser
		
		
	}
		
	socket.send(JSON.stringify(validation));
	
}
else{
	
	socket.send(JSON.stringify(validation));
}
		



		});
		
			console.log("MULTIyyyyyyyyyyyyyyyyyyyyUSER"+Multiuser);
			});
		
		
          });
	});
console.log('Server running at http://localhost:3000/');