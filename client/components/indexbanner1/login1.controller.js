/**
 * Created by Administrator on 2014/11/17.
 */
angular.module('weixinLotteryWebsiteApp')
  .controller('LoginCtrl', function ($scope,Auth,$location) {
    $scope.usrlogininfo= {
      usrname: '',
      usrpwd: '',
      usrcheckcode: ''
    }
    $scope.errors = {};
    $scope.error=true;

    $scope.login = function(loginform){
      $scope.submitted=true;

      console.log($scope.usrlogininfo.usrname)
      console.log($scope.usrlogininfo.usrpwd)
      if(loginform.$valid){
        Auth.login(
          {
            email:$scope.usrlogininfo.usrname,
            password:$scope.usrlogininfo.usrpwd
          }
        )
          .then(function(){
            $location.path('/myinfo');
            $scope.error=true;
            console.log('登录成功！')
          })
          .catch(function(err){
            console.log('登录失败！');
            alert('用户名或密码错误！');
            $scope.error=false;
            $scope.errors.other = err.message;

          });
      }
    }














//
//    $scope.submitform=function(){
//      console.log("你点击了提交按钮。");
//      $http({
//        mothed:'GET',
//        url:'/api/customers/'+$scope.usrlongininfo.usrname
//      })
//        .success(function(data,status,headers,config){
//          //当响应准备就绪时调用
//          console.log(data);
//          console.log(data[0].email);
//          console.log(data[0].hashedPassword);
//
//        })
//        .error(function(data,status,headers,config){
//         //当响应以错误状态返回时调用
//        });
//
//    }

  });