'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WechatSchema = new Schema({
  _id: String,  // 公众号原始Id，主键
  name: String,  // 公众号名称
  type: String,  // 公众号类型
  lotteryAccount: Number,  // 彩票份额
  finishDate: Date, //结束时间
  status: {type: String, default: '进行中'}  //状态
});

/**
 * Validations
 */

// Validate wechatId is not taken
WechatSchema
  .path('_id')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({_id: value}, function(err, wechat) {
      if(err) throw err;
      if(wechat) {
        return respond(false);
      }
      respond(true);
    });
  }, '该公众号已被绑定');


/**
 * Pre-save hook
 */
WechatSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    next();
  });

module.exports = mongoose.model('Wechat', WechatSchema);