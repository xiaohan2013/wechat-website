'use strict';

var _ = require('lodash');
var Customer = require('./customer.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * 获取用户列表
 * 权限：管理员（admin）
 */
exports.index = function(req, res) {
  Customer.find({}, '-salt -hashedPassword', function (err, customers) {
    if(err) return res.send(500, err);
    res.json(200, customers);
  });
};

/**
 * 创建一个新商户
 */
exports.create = function (req, res, next) {
  var newCustomer = new Customer(req.body);
  newCustomer.role = 'customer';
  newCustomer.save(function(err, customer) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: customer._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * 获取一个用户信息
 */
exports.show = function (req, res, next) {
  var customerId = req.params.id;

  Customer.findById(customerId, function (err, customer) {
    if (err) return next(err);
    if (!customer) return res.send(401);
    res.json(customer.profile);
  });
};

/**
 * 管理员删除用户
 */
exports.destroy = function(req, res) {
  Customer.findByIdAndRemove(req.params.id, function(err, customer) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * 修改密码
 */
exports.changePassword = function(req, res, next) {
  var customerId = req.customer._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  Customer.findById(customerId, function (err, customer) {
    if(customer.authenticate(oldPass)) {
      customer.password = newPass;
      customer.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

exports.addWechat = function(req, res, next) {
  var customerId = req.customer._id;
  var wechatId = req.body.wechatId;

  Customer.findById(customerId, function (err, customer) {
    customer.wechat.push(wechatId);
    customer.save(function(err) {
      if (err) {
        return validationError(res, err);
      }
      res.send(200);
    });
  });
};

exports.getWechats = function(req, res, next) {
  var customerId = req.customer._id;

  Customer.findById(customerId)
    .populate('wechat')
    .exec(function (err, customer) {
      if(err) { return handleError(res, err); }
      if(!customer) {
        return res.send(null);
      }
      return res.json(customer);
    });
};

/**
 * 获取我的信息
 */
exports.me = function(req, res, next) {
  var customerId = req.customer._id;
  Customer.findOne({
    _id: customerId
  }, '-salt -hashedPassword', function(err, customer) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!customer) return res.json(401);
    res.json(customer);
  });
};

/**
 * 更新用户数据
 */
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Customer.findById(req.params.id, function (err, customer) {
    if (err) { return handleError(res, err); }
    if(!customer) { return res.send(404); }
    var updated = _.merge(customer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, customer);
    });
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
