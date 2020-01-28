const express = require('express');
const router = express.Router();
const passport = require('passport');
const Parent = require('../models/index').parent;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const strings = require(__dirname + '/../constants/constants.json');

router.post('/isLogged', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.status(200).json({ 'auth': req.isAuthenticated() });
});

router.post('/logIn', (req, res) => {
  console.log('Request:', req.body);

  let { email, password, token } = req.body;

  Parent.findOne({
    where: { email: email }
  })
    .then(parent => {

      if (!parent) {
        res.status(200).json({
          code: strings.errorCode.noRegistrated,
          message: strings.errorDescription.noRegistrated
        });
      }
      else {

        let pass = bcrypt.compareSync(password, parent.get('password'));

        if (pass) {

          let jwtToken = 'JWT ' + jwt.sign(parent.dataValues, 'OtherSecret', {
            expiresIn: 60 * 1000
          });

          Parent.update({
            token: token
          }, {
            where: { email: email }
          })
            .then((res) => console.log(res))
            // .then(() => res.status(200).end())
            .catch(err => console.log(err));

          res.status(200).json(
            {
              token: jwtToken,
              name: parent.name,
              name2: parent.name2,
              lastname: parent.lastname,
              lastname2: parent.lastname2,
              email: parent.email
            }
          );

        }
        else {
          res.status(200).json({
            code: strings.errorCode.passwordIncorrect,
            message: strings.errorDescription.passwordIncorrect
          });
        }

      }

    })
    .catch(err => {
      console.log(err);
      res.status(200).json({
        code: strings.errorCode.genericError,
        message: strings.errorDescription.genericError,
        description: err
      });
    });
});

//logout
router.get('/logout', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  req.logout();

  res.json({
    message: 'Logged out',
    description: err
  });
});

module.exports = router;