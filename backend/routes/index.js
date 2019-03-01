var express = require('express');
var router = express.Router();
var UserRoute = require('../modules/user/user.route')
var postRoute = require('../modules/post/post.route');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.use('/api', UserRoute);

router.use('/post', postRoute);

// router.use('/auth',UserRoute)

module.exports = router;
