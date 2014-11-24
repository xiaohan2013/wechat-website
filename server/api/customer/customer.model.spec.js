'use strict';

var should = require('should');
var app = require('../../app');
var Customer = require('./customer.model.js');

var customer = new Customer({
  email: 'test@test.com',
  password: 'password'
});

describe('Customer Model', function() {
  before(function(done) {
    // Clear users before testing
    Customer.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Customer.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no customers', function(done) {
    Customer.find({}, function(err, customers) {
      customers.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate customer', function(done) {
    customer.save(function() {
      var customerDup = new Customer(customer);
      customerDup.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  it('should fail when saving without an email', function(done) {
    customer.email = '';
    customer.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it("should authenticate customer if password is valid", function() {
    return customer.authenticate('password').should.be.true;
  });

  it("should not authenticate customer if password is invalid", function() {
    return customer.authenticate('blah').should.not.be.true;
  });
});
