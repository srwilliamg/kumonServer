const express = require('express');
const router = express.Router();
const passport = require('passport');
const Parent = require('../models/index').parent;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const admin = require("firebase-admin");

router.post('/logIn', (req, res) => {
  console.log('Request:', req.body);
  let params = req.body;
  let email = params.email;
  let password = params.password;


  let serviceAccount = require(__dirname+"/../serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kumonapp-90962.firebaseio.com"
  });

  let registrationToken = "";

  let payload = {
    data : {
      key: "test kumonApp"
    }
  };

  let options = {
    priority : "high",
    timetolive: 60*60*24
  };

  admin.messaging().sendToDevice(registrationToken, payload, options)
  .then((res) => {
    console.log("Message successfully sent: "+res);
  })
  .catch((err) => {
    console.log("Error sending message: "+err);
  });

});

module.exports = router;