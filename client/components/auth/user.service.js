'use strict';

angular.module('weixinLotteryWebsiteApp')
  .factory('User', function ($resource) {
    return $resource('/api/customers/:id/:controller', {
      id: '@_id'
    },
    {
      addWechat: {
        method: 'PUT',
        params: {
          controller:'wechat'
        }
      },
      getWechats: {
        method: 'GET',
        params: {
          controller: 'wechat'
        }
      },
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }

	  });
  });
