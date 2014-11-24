'use strict';

var express = require('express');
var controller = require('./customer.controller.js');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.put('/:id/wechat', auth.isAuthenticated(), controller.addWechat);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/wechat', auth.isAuthenticated(), controller.getWechats);
router.post('/', controller.create);
router.post('/:id', controller.update);

module.exports = router;
