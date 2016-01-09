var socket = io.connect(); 
var path = "login.html";
 var path1="chat.html";
var registration = angular.module('register', []);
var receive=function(){
	
}
 
registration.controller('registerControl',function($scope) {
$scope.formModel= {};
$scope.formModel.action='register';
$scope.formModel.username='username';
$scope.formModel.userFirstname='name';
$scope.formModel.userLastname='subname';
$scope.formModel.useremail='mail123@gmail.com';
$scope.formModel.userPhonenumber='1234567891';
$scope.formModel.passWord='****';
$scope.formModel.confirmPassword='****';
$scope.submit=function() {

if($scope.formModel.passWord==$scope.formModel.confirmPassword){
                    var data = {
                        message:$scope.formModel
					}
                    socket.send(JSON.stringify(data)); 
				
					alert("REGISTERD SUCCESSFULLY");
			     
        }
			else{
	alert("password mismatch");
}
		
                }
				$scope.login=function(){
			location.href=path;
		}
});
     
var logIn= angular.module('login',[]);
logIn.controller('loginControl',function($scope){
	$scope.loginModel={};
	$scope.loginModel.action='login';
$scope.loginModel.user='name';
$scope.loginModel.passWord='****';
$scope.submit=function (){
		var user={
		message:$scope.loginModel
	}
	socket.send(JSON.stringify(user));
	console.log("post login"+user);
 
			 receive();
		   var  data = JSON.parse(data);
		   console.log("DATA MESSAGE"+data.message);
		   
		   console.log("username"+u);
		 if(data.message=='user valid')
		 {
			console.log("testing OO"); 
			location.href=path1;
		 }
		 else if(data.message=='user invalid')
		 {
			 alert("username password is invalid");
		 }
      console.log("**666**"+data);


}

});

//var chat= angular.module('chatapp',[]);
logIn.controller('chatControl',function($scope){
	$scope.form={};
	$scope.form.userInfo='pl';
});
receive=function(){
	socket.on("message",function(data){
             console.log(data);
			 });
}