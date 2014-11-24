/**
 * Created by Administrator on 2014/11/19.
 */
'use strict';

angular.module('weixinLotteryWebsiteApp')
  .factory('Wechats', function($resource) {
    return $resource('/api/wechats/:id', {id: '@id'});
  });
