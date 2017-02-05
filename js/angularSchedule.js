
var app = angular.module("Schedule", ["firebase"]);

app.controller("ScheduleController", function($scope, $firebaseObject) {

    var weekDays = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat']; 
    // var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

	$scope.currentTime = new Date();

	var firstday = new Date();
    if (firstday.getDay() != 0){
	   firstday.setDate($scope.currentTime.getDate() - ($scope.currentTime.getDay()  ));
    }else{
       firstday.setDate($scope.currentTime.getDate() - ($scope.currentTime.getDay() + 7 ));
    }
    $scope.weekDays = [];
    for (var i=0;i<7;i++){
    	firstday.setDate(firstday.getDate() + 1);
    	var dateString = months[firstday.getMonth()] + " " + firstday.getDate();
    	$scope.weekDays.push(dateString);
    }

    var ref = firebase.database().ref().child("data");
	var syncObject = $firebaseObject(ref);

	firebase.database().ref('/weekschedule/').once('value').then(function(snapshot) {
        var data = snapshot.val();    
        $scope.data = data;

    });

});


/**
	firebase／weekschedule／mon／am
	
	firebase／weekschedule／mon／am [1,2,3,4,5]

						  / mon /pm [1,2,3,4,5]
						  
						  / Tue／am [1,2,3,4,5]

**/