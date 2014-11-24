'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var Customer = require('../api/customer/customer.model');

// Passport Configuration
require('./local/passport').setup(Customer, config);

var router = express.Router();

router.use('/local', require('./local'));

module.exports = router;