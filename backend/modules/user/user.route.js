const UserController = require('./user.controller');
var express = require('express');
var router = express.Router();

router.use('/new_register', UserController.User);

router.use('/getuser', UserController.getAllUsers)

router.use('/authenticate', UserController.authenticate);


module.exports = router;
