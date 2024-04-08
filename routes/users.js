const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/users/signup', usersController.signupUser);
router.post('/users/login', usersController.loginUser);

module.exports = router;
