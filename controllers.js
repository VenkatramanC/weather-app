
//CONTROLLERS

weatherApp.controller('homeController' ,['$scope','cityService', function($scope, cityService){
  $scope.city = cityService.city; 
    
    $scope.$watch('city', function(){
       cityService.city = $scope.city; 
    });
    
}]);

weatherApp.controller('forecastController' ,['$scope','$resource','$routeParams','cityService', function($scope,$resource,$routeParams,cityService){
     
     $scope.city = cityService.city; 

     $scope.days = $routeParams.days || '2' ;
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
        callback: "JSON_CALLBACK"}, {get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.city, 
        cnt: $scope.days,
        appid: '55a85b861876d40cb43b0d7d40e20dce'
    });
    
    $scope.convertToFahrenheit = function(degk){
        return Math.round((1.8 * (degk - 273)) + 32);
    } 

    $scope.convertToDate = function(dt){
  
      
      return new Date(dt * 1000);
     }
}]);