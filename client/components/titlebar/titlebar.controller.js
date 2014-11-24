/**
 * Created by Administrator on 2014/11/18.
 */
angular.module('weixinLotteryWebsiteApp')
       .controller('titlebarCtrl',function($scope,Auth,$location){
        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.getcurrentuser = Auth.getCurrentUser;

        $scope.logout = function() {
          Auth.logout();
          $location.path('/');
        };

        $scope.logo={};
        if($scope.isLoggedIn())
          {
            $scope.logo.logourl="/myinfo";
          }
          else{
            $scope.logo.logourl="/";
          }

//
//        console.log($scope.isLoggedIn());
//        console.log($scope.usrinfo)

  });