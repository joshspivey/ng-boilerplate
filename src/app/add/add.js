angular.module( 'ngBoilerplate.add', [
  'ui.router',
  'plusOne',
  'services.AddService',
  'services.Authentication',
  'libs.ngCookies'
])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'add', {
    url: '/add',
    views: {
      "main": {
        controller: 'AddCtrl',
        templateUrl: 'add/add.tpl.html'
        }
    },
    data:{ pageTitle: 'Add New' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'AddCtrl', function AddController( $scope, AddService, AuthenticationService) {

          AuthenticationService.ClearCredentials();

          $scope.username = 'admin';
          $scope.password = 'password';
          $scope.authenticated = false;

          $scope.authenticate = function(){

              AuthenticationService.Login($scope.username, $scope.password, function(response) {
                  if(response.success) {
                      AuthenticationService.SetCredentials($scope.username, $scope.password);
                      $scope.authenticated = true;
                  } else {
                      $scope.error = response.message;
                      $scope.dataLoading = false;
                      $scope.authenticated = false;
                  }
              });
          };
 
          $scope.addAction = function(){

            
            if ($scope.addForm.$valid && $scope.authenticated) {


              var configObj = {
                    callback : "JSON_CALLBACK"  
                  },
                  sendData = {};

                  angular.extend(sendData, configObj, $scope.addForm);

              AddService.addNew(sendData).then(
                function(data) {
                    console.log(data.Result);
                  },
                  function(statusCode) {
                    console.log(statusCode);
                  }
              );

            }else{
                console.log("bad", $scope.userForm);
            }

          };

          $scope.authenticate();

 });

