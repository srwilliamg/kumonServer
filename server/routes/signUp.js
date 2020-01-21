const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.post('/', function (req, res) {
	sess = req.session;
	const params = req.body;

	const username = params.username;
	const name = params.name;
	const lastName = params.lastName;
	const email = params.email;
	const password = params.password;

	db.parent
		.create({
			username: username,
			name: name,
			lastName: lastName,
			email: email,
			password: password,
		})
		.then(parent => {
			console.log(parent);
			res.status(200).json(parent);
		})
		.catch(err => {
			console.log(err);
			res.status(503).json({ message: 'An error has occurred, try again.', error: err });
		});
});

module.exports = router;