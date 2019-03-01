const postModel = require('../../models/post');

let post = (req, res) => {
    req.body.createdBy = req.body.name
    const postDoc = postModel(req.body);

    postDoc.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.status(500).send('error occured at post!' + err);
    });

};

module.exports.post = post;

let getallblogs = (req, res) => {

    postModel.find({}, (err, blogs) => {
        // Check if error was found or not
        if (err) {
            res.json({ success: false, message: err });
        } else {
            // Check if blogs were found in database
            if (!blogs) {
                res.json({ success: false, message: 'No blogs found.' });
            } else {
                res.json({ success: true, blogs: blogs });
            }
        }
    }).sort({ _id: -1 });
}

module.exports.getallblogs = getallblogs;

let deletePosts = (req, res) => {

    postModel.findByIdAndRemove(req.params.id).then(function (res) {
        res.status(204).send('deleted successfully');
    }).catch(err => res.send(err));
}

module.exports.deletePosts = deletePosts;


let likePost = (req, res) => {

    postModel.findOneAndUpdate({ _id: req.params.id }, {
        $inc: {
            like: 1
        }
    }, { new: true }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        console.log("Error", err);
    });

}
module.exports.likePost = likePost;

let Comment = (req, res) => {

    postModel.findOneAndUpdate({ _id: req.params.id },
        {
            $push: {
                comment: req.body.comment
            }
        }
    ).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log("Error", err);
    });
}
module.exports.Comment = Comment;