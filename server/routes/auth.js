const express = require('express');
const router = express.Router();
const passport = require('passport');
const Parent = require('../models/index').parent;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/isLogged', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.status(200).json({ 'auth': req.isAuthenticated() });
});

router.post('/logIn', (req, res) => {
  console.log('Request:', req.body);

  let {email, password} = req.body;

  Parent.findOne({
    where: { email: email }
  })
    .then(parent => {
      
      if (!parent) {
        throw "El usuario no se encuentra registrado.";
      }

      let pass = bcrypt.compareSync(password, parent.get('password'));

      if (pass) {
        let token = 'JWT ' + jwt.sign(parent.dataValues, 'OtherSecret', {
          expiresIn: 60 * 1000
        });
        res.status(200).json(
          {
            token: token,
            name: parent.name,
            name2: parent.name2,
            lastname: parent.lastname,
            lastname2: parent.lastname2,
            email: parent.email
          }
        );
      }
      else {
        res.status(401).json({
          message: 'Password incorrect'
        });
      }

    })
    .catch(err => {
      console.log(err);
      res.json({
        message: 'Something is not working',
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