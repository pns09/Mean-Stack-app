const postController = require('./post.controller');
var express = require('express');
var router = express.Router();


router.use('/createpost', postController.post);

router.use('/getallblogs', postController.getallblogs);

router.use('/deletepost/:id',postController.deletePosts);

router.put('/likeBlog/:id', postController.likePost);

router.use('/Comment/:id',postController.Comment)

module.exports = router;