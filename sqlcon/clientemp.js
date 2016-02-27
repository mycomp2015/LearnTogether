var myApp = angular.module("EmpModule",[]);

var socket=io.connect('http://localhost:4000');
var item1=[];
myApp.factory('socket',function(){

return socket;
})
myApp.controller('empController', function($scope,socket,$window){
// main function begins, variables are declared
  
	  $('#two').hide();
$scope.femp_id='109';
$scope.femp_name='Employee name';
$scope.femp_status='Developer';
$scope.fjobcode='J109';
$scope.item=[];	
//$scope.results="";
console.log("********");
//console.log("********"+$scope.results);

$scope.save = function () {
	 socket.open();
 var emp = {
	
                   empdata:$scope.empmodel
						
 }
					emp=JSON.stringify(emp);
					
                    socket.emit('empdata',emp); 
				
					alert("RECORD SAVED");
					//console.log("data"+empdata);
$window.location.reload();
		
        }
		
		
	socket.on('empdisp',function(data){
		
		
    //data=JSON.parse(data);
   //console.log("DATA IN VIEW"+data);

		console.log("VIEW     "+item1.length,data.length);
		
			
				
				
		 for(i=0;i<data.length;i++)
	{	

//	console.log("Inside for loop" + data[i]);
		     item1.push(data[i]); 
		$scope.$digest();
	}
	  $scope.item=item1; 
	//	console.log("ITEM "+   item1);
		//	console.log("Res received"+$scope.item);
		  $('#two').show();
		//socket.close();
}); 		
	
	
		
	$scope.view = function () {
  var data='somee';
	socket.emit('some',data);

	if(item1.length > 0)
				{
					for(j=0;j<item1.length;j++)
					{
						item1.splice(j,0);
						console.log("arraay splice")
					}
				}
				item1 = []; 
		
	    $scope.item=item1; 
	 	console.log("Req send"+$scope.item);
				
}

});


