const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");
const ParentHasSon = require('../models/index').parent_has_son;
const Records = require('../models/index').record;
const Parent = require('../models/index').parent;
const passport = require('passport');

router.post('/sendNotification', (req, res) => {
  console.log('Request:', req.body);

  let { title, body, data } = req.body;

  Parent.findAll({
    attributes: ['token'],
    raw: true
  })
    .then(registrationToken => registrationToken.map(registrationToken => registrationToken.token))
    .then(registrationToken => {
      console.log(registrationToken);

      var message = {
        tokens: registrationToken,
        notification: { title, body },
        data: JSON.parse(data)
      };
    
      console.log("Message to firebase: " + JSON.stringify(message) + "\n");
    
      admin.messaging().sendMulticast(message)
        .then((response) => {
          // Response is a message ID string.
          console.log('Successfully sent message:', response);
          res.json({
            data: response
          });
        })
        .catch((error) => {
          console.log('Error sending message:', error);
          res.json({
            message: 'Something is not working',
            description: err
          });
        });
        
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


// Consult every task pending user's task
router.post('/consultSons', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  // const data = req.body;
  const idParent = req.body.idparent;

  ParentHasSon.findAll({
    where: { id_parent: idParent },
    include: ['son']
  })
    .then(son => {
      res.status(200).json(son);
    })
    .catch(err => {
      console.log(err);
      res.status(503).json({
        message: "Something was wrong",
        error: err
      });
    })

});

// Consult every task pending user's task
router.post('/consultRecords', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  // const data = req.body;
  const idSon = req.body.idson;

  Records.findAll({
    where: { id_son: idSon }
  })
    .then(records => {
      res.status(200).json(records);
    })
    .catch(err => {
      console.log(err);
      res.status(503).json({
        message: "Something was wrong",
        error: err
      });
    })

});

module.exports = router;
