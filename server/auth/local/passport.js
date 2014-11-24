var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (Customer, config) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      Customer.findOne({
        email: email.toLowerCase()
      }, function(err, customer) {
        if (err) return done(err);

        if (!customer) {
          return done(null, false, { message: 'This email is not registered.' });
        }
        if (!customer.authenticate(password)) {
          return done(null, false, { message: 'This password is not correct.' });
        }
        return done(null, customer);
      });
    }
  ));
};