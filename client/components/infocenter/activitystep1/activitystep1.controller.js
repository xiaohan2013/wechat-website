/**
 * Created by Administrator on 2014/11/19.
 */
angular.module('weixinLotteryWebsiteApp')
  .controller('activitystep1Ctrl',function($scope,Wechats,Auth, datepickerPopupConfig)
  {
    $scope.wechat={
      wechatid:'id',//公众号ID
      wechatname:'wechatname',//公众号名称
      wechattype:'team',//公众号类型
      wechataccount:4000//彩票份额
    };
    $scope.today = function() {
      $scope.dt = moment().format('YYYY/MM/DD');
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];

    // TRANSLATION
    datepickerPopupConfig.currentText = '今天';
    datepickerPopupConfig.clearText = '清空';
    datepickerPopupConfig.closeText = '关闭';



    $scope.addwechat = function(form){
      if(form.$valid) {
        var postData = {
          _id: $scope.wechat.wechatid,
          name: $scope.wechat.wechatname,
          type: $scope.wechat.wechattype,
          lotteryAccount: $scope.wechat.wechataccount,
          finishDate:$scope.dt
        };
        console.log(postData);
        Wechats.save({},postData,function(data){
            console.log('添加成功');
            console.log(data);
          //
          Auth.addWechat($scope.wechat.wechatid).then(  function () {
              console.log('绑定成功');
            }).catch( function () {

            });


          },function(err){
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              console.log(field);
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          }
        );
      }
    }

  }
);