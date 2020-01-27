const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");

router.post('/sendNotification', (req, res) => {
  console.log('Request:', req.body);

  let { title, body , data} = req.body;
  
  let registrationToken = "2131558493epdsrQuDAbk:APA91bEmrRMTWKBTy9kWmfH3KagVGZ3bMBlpFxL89SjQ4oJw_L3KGgB9REDp5E2PrMv8Pj4aIYS56G2MhycOqe-IDeBC4ySrHCWi_1QMFtRVA8bOEFEmDTT3p-3EEvc3Xusx5XIjPOyU";
  
  var message = {
    token: registrationToken,
    notification: { title, body },
    data:JSON.parse(data)
  };

  console.log("Message to firebase: "+JSON.stringify(message)+"\n");
  
  admin.messaging().send(message)
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
});

module.exports = router;
