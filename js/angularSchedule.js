
var app = angular.module("Schedule", ["firebase"]);

app.controller("ScheduleController", function($scope, $firebaseObject) {

    var weekDays = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat']; 
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

	$scope.currentTime = new Date();
    var array1 = weekDays.slice($scope.currentTime.getDay(),7) 
    var array2 = weekDays.slice(0,$scope.currentTime.getDay());
    Array.prototype.push.apply(array1, array2);
    $scope.currentWeeks = array1;
    $scope.currentMonth = months[$scope.currentTime.getMonth()];
    $scope.currentDay = $scope.currentTime.getDate();

    console.log($scope.currentWeeks);
    console.log($scope.currentMonth);
    console.log($scope.currentDay);

    var ref = firebase.database().ref().child("data");
	var syncObject = $firebaseObject(ref);

	firebase.database().ref('/weekschedule/').once('value').then(function(snapshot) {
        var data = snapshot.val();

        var list = [];

       	
        $scope.data = data;
        console.log($scope.data.mon.am[0]);
    });

});


/**
	firebase／weekschedule／mon／am
	
	firebase／weekschedule／mon／am [1,2,3,4,5]

						  / mon /pm [1,2,3,4,5]
						  
						  / Tue／am [1,2,3,4,5]

**/