var app = angular.module("app", ["ngRoute","ngResource"])

.config(['$routeProvider',function ($routeProvider)
{
	$routeProvider.when('/home',{
    templateUrl: 'templates/list.html',
    controller: 'HomeCtrl'
	})

	.when('/edit/:id',{
templateUrl: 'templates/edit.html',
controller: 'EditCtrl'

	})

	.when('/create', {
      templateUrl: 'templates/create.html',
      controller: 'CreateCtrl'
	})

	.otherwise ({ redirectTo: '/home'});
}])
.controller('HomeCtrl', ['$scope', 'Videos' , '$route' , function ($scope,Videos,$route){
    
    Videos.get(function(data)
    {
       $scope.videos = data.videos;

    });

    $scope.remove = function(id)
    {
      Videos.delete({id:id}).$promise.then(function(data)
      {
        if(data.msg)
        {
          $route.reload();
        }

      })

    }
    
} ])
.controller('EditCtrl', ['$scope','Videos' , '$routeParams' , function ($scope,Videos,$routeParams){
 $scope.settings = {
    	pageTitle: "Edit Details",
    	action: "update"
    }
     var id = $routeParams.id;
     Videos.get({id:id}, function(data)
     {

          $scope.video = data.video;
     });

     $scope.submit = function()
     {
       Videos.update({id:$scope.video.id}, $scope.video).$promise.then(function(data){
              if(data.msg)
              {
                $scope.settings.success = "Your details have been updated successfully";
              }


       })
     }
} ])

.controller('CreateCtrl',['$scope','Videos' , function ($scope,Videos){

    $scope.settings = {
    	pageTitle: "Fill Your Details",
    	action: "save"
    }

    $scope.video = {
      name: "",
      cur_location: "",
      summary: ""
     
    };

    $scope.submit = function()
    {
    	Videos.save($scope.video).$promise.then(function(data)
    	{
          if(data.msg)
          {
          	angular.copy({},$scope.video);
          	$scope.settings.success = "Your details have saved successfully."
          }

    	});
    

    }
} ])

.factory('Videos' ,function ($resource){
return $resource("http://localhost/laravel/restangularjslaravel/public/videos/:id",{id:"@_id"},{
	update: {method: "PUT", params: {id: "@id"}}
})


} )