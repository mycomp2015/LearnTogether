
var path = "register.html";
 var path1="chat.html";
 var name;
 var n;
 var onlinesname;
 var samplename;
 var testuser,i=0;

 var rDdata;
var registration = angular.module('login', []);
var socket=io.connect('http://localhost:3000');
registration.factory('socket',function(){

return socket;
})
 
registration.controller('registerControl',function($scope,socket) {
$scope.formModel= {};
$scope.formModel.action='register';
$scope.formModel.username='';
$scope.formModel.userFirstname='';
$scope.formModel.userLastname='';
$scope.formModel.useremail='';
$scope.formModel.userPhonenumber='';
$scope.formModel.passWord='';
$scope.formModel.confirmPassword='';
 //$scope.showForm =  true ;
$scope.register=function() {

if($scope.formModel.passWord==$scope.formModel.confirmPassword){
                    var regitseruser = {
                        reguser:$scope.formModel
					}
					regitseruser=JSON.stringify(regitseruser);
                    socket.emit('reguser',regitseruser); 
				
					alert("REGISTERD SUCCESSFULLY");
			   //  $scope.showForm = $scope.showForm ? true : false;
				$('#one').hide();
        }
			else{
	alert("password mismatch");
}
		
                }
				
				
});
    //NG APP INITIALIZE


//FACTORY FOR USING SCOPE INSIDE SOCKET

registration.factory('socket',function(){
var socket=io.connect('http://localhost:3000');
return socket;
})

//CONGIG FOR ROUTE TO ANOTHER URL

/*logIn.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/login',{templateUrl: 'login.html',controller: 'loginControl'});
	$routeProvider.otherwise({redirectTo:'/login'});
}]);
//DIRECTIVE FOR REDIRECT TO ANOTHER URL
logIn.directive('chatDirective'function(){
	return{
		templateUrl:'chat.html'
	}
});*/

//LOGIN CONTROLLER

registration.controller('loginControl',function($scope,socket){
	$('#three').hide();
	$scope.loginModel={};
	$scope.loginModel.action='login';
$scope.loginModel.user='';
$scope.loginModel.passWord='';
//alert("next page next"+$scope.userInfo+"++++++online"+onlinesname+"====="+$scope.OnlineUsers);
	

$scope.login=function (){
	
		var user={
		loginuser:$scope.loginModel
	}
	
	user=JSON.stringify(user);
	socket.emit('loginuser',user);
	//console.log("post login"+user);

socket.on("Authentication",function(data){
	
	console.log("DATA"+data);

			  rDdata = JSON.parse(data);
			 
			
			// console.log("next line"+rDdata);
		   
		   //console.log("DATA MESSAGE"+rDdata.message);
		   testMultiuser=rDdata.Onlineuser;
		   
		   //console.log("DATA MESSAGE----"+rDdata.Onlineuser);
		    
		 if(rDdata.message=='user valid')
		 {
			$('#two').hide();
$('#one').hide();
$('#three').show();
			//location.href=path1;
			console.log("fg");
			alert("WELCOME TO NEXT PAGE");
				//console.log("-----after t path-->>>>"+$scope.OnlineUsers+"********"+$scope.userInfo);
	
		 }
		 else if(rDdata.messgae=='user invalid')
		 {
			 alert("username password is invalid");
		 }
		 else{
			 //alert("Not validddddddd");
		 }
  
 })

}

});


registration.factory('socket',function(){
var socket=io.connect('http://localhost:3000');
return socket;

})
registration.controller('chatControl',function($scope,socket){
	$scope.Imagepath='ball.jpg';
	
	
	socket.on("Chatap",function(data){
		data=JSON.parse(data);
		console.log("--------------->>>>>>"+data.message);
		
	$scope.userInfo=data.message;
	alert("--------------------"+$scope.userInfo);
	$scope.$digest();
	//$scope.userInfo.push(data.message);
	
	
	//alert("++++++++++++++++++"+$scope.userInfo);
	/*$scope.msgs=[];
	
			 
			  for(var g in testMultiuser){			   
			
			onlinesname=testMultiuser[g];
			}
			
	});
	$scope.sendMsg=function(){
		console.log("2");
		socket.emit('send msg',$scope.msg.text,$scope.userInfo);
		console.log("sended msg--->"+$scope.msg.text,$scope.userInfo);
		
		$scope.msg.text='';
	}
	socket.on('get msg',function(data){
		console.log("get msg-------->"+data);
		
		$scope.msgs.push(data);
		$scope.$digest();
		
		console.log("push msg-------->"+data);
		
	});*/

});
	
	});		
		