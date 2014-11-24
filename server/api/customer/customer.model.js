'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var CustomerSchema = new Schema({
  email: { type: String, lowercase: true },  // 商户注册邮箱, 必填
  role: {
    type: String,
    default: 'customer'
  },    // 用户角色，包括商户（customer）和管理员（admin）
  hashedPassword: String,  // 商户密码，必填
  salt: String,   //
  owner: String,  // 联系人
  mobile: String,  // 联系电话
  wechat: [{type: String, ref: 'Wechat'}]  // 微信公众号列表
});

/**
 * Virtuals
 */
CustomerSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// Public profile information
CustomerSchema
  .virtual('profile')
  .get(function() {
    return {
      'email': this.email,
      'owner': this.owner,
      'mobile': this.mobile,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
CustomerSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate empty email
CustomerSchema
  .path('email')
  .validate(function(email) {
    return email.length;
  }, '邮箱不能为空');

// Validate empty password
CustomerSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    return hashedPassword.length;
  }, '密码不能为空');

// Validate email is not taken
CustomerSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
  }, '该邮箱已被注册');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
CustomerSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword))
      next(new Error('Invalid password'));
    else
      next();
  });

CustomerSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};


module.exports = mongoose.model('Customer', CustomerSchema);