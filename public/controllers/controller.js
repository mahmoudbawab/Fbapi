var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);
myApp.controller('AppCtrl', function($scope, $http) {

    console.log("Hello World from controller");
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
	
var refresh = function() {
    $http.get('/contactlist').then(function (response) {
        console.log("I got the data I requested");
		console.log(response);
        $scope.contactlist = response.data;


    });
}
refresh();
	
	$scope.addContact = function() {
  console.log($scope.contact);
  $http.post('/contactlist', $scope.contact).then(function(response) {
    console.log(response.data);
    refresh();
  });
};

	
$scope.remove = function(id) {
  console.log(id);
  $http.delete('/contactlist/' + id).then(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/contactlist/' + id).then(function(response) {
    $scope.contact = response.data;
  });
};  

$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response) {
    refresh();
  })
};
$scope.deselect = function() {
  $scope.contact = "";
}

})

