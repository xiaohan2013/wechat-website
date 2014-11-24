/**
 * Created by Administrator on 2014/11/19.
 */
angular.module('weixinLotteryWebsiteApp')
.controller('Infomodify',function($scope,User,$location){
    $scope.info={
      _id:'',
      email:'',
      contactname:'',
      phonenumber:''
    }


    User.get(function(resp){
      $scope.info.email=resp.email;
      $scope.info._id = resp._id;
      $scope.info.contactname=resp.owner;
      $scope.info.phonenumber=resp.mobile;
      console.log(resp)
    },function(err){

      }
    );

    $scope.infosubmit = function(){
      User.save(
      {id:$scope.info._id},
      //名称与后台对应
      { email:$scope.info.email,
        owner:$scope.info.contactname,
        mobile:$scope.info.phonenumber
      },

      function(res){
        console.log(res)
        $location.path('/myinfo/basicinfo/info');
      },

      function(res){

      });
    }


  });