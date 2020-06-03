var Parent = require('../models/index').parent;
var JwtStrategy = require('passport-jwt').Strategy, 
ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = 'OtherSecret';
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    // console.log(jwt_payload);
    Parent.findByPk(jwt_payload.id_parent)
    .then(data => {
        return done(null, data);
      })
      .catch(err => {
        console.log("Error PK passport: "+ err);
        return done(err, false);
      });
  }));
}