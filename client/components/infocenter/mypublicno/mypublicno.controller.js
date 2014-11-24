/**
 * Created by Administrator on 2014/11/20.
 */
angular.module('weixinLotteryWebsiteApp')
  .controller('mypublicnoCtrl',function($scope,Auth)
  {


    $scope.wechatlist=[];
    $scope.number=[];

    Auth.getWechats()
      .then(function(user){

        var localLocale = moment.locale('zh-cn');

        $scope.wechatlist = user.wechat;
        for(var i = 0;i<$scope.wechatlist.length;i++){
         $scope.wechatlist[i].finishDate=moment($scope.wechatlist[i].finishDate).get('year')+'年'
           +(moment($scope.wechatlist[i].finishDate).get('month')+1)+'月'
           +moment($scope.wechatlist[i].finishDate).get('date')+'日';
          //console.log((moment($scope.wechatlist[i].finishDate)));
          console.log(moment().get('year')+'年'+(moment().get('month') + 1)+'月'+moment().get('date')+'日')
        }


        //分页
        $scope.itemsPerPage = 3;
        $scope.currentPage = 0;
        $scope.prevPage = function(){
          if($scope.currentPage>0){
            $scope.currentPage--
          }
        };

        $scope.prevPageDisabled = function(){
          return $scope.currentPage === 0 ? "disabled" : "";
        };

        $scope.pageCount = function() {
          return Math.ceil($scope.wechatlist.length/$scope.itemsPerPage)-1;
        };

        $scope.nextPage = function() {
          if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;}
        };

        $scope.nextPageDisabled = function() {
          return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
        }

        $scope.getnumberlist= function(){
          $scope.number=[];//需要初始化，不然可能会调用多次，造成数组内容重复
          console.log('pagecount'+$scope.pageCount());
          for(var i=0;i<$scope.pageCount();i++)
          {
            $scope.number.push(i+1);
           // console.log(i+1);
          }
          $scope.number.push(i+1);
          //console.log($scope.number);
          return $scope.number
        }

        $scope.setpage = function(pagno){
          $scope.currentPage = pagno
        }



      })
      .catch(function (error) {

      });



  })
  .filter('offset', function() {
    return function(input, start) {
      //console.log(start)
      start = parseInt(start, 10);
      return input.slice(start); };
  });
