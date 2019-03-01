const UserModel = require('../../models/user')
const passport = require('passport');

let User = (req, res) => {
    const UserDoc = UserModel(req.body);
    UserDoc.save().then((data) => {
        res.json(data)

    }).catch((err) => {
        res.status(500).send(err)
    })

}
module.exports.User = User;

let getAllUsers = function (req, res) {
    console.log('I received a GET request');
    UserModel.find({}, function (err, users) {
        if (!err) {
            res.send(users);
        }
        else {
            console.log('error')
        }
    });

}
module.exports.getAllUsers = getAllUsers;

let authenticate = (req, res) => {

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(400).json(err);
        } else if (user) {
            return res.status(200).json({ 'token': user.generateJwt() });
        }
        else {
            return res.status(404).json(info);
        }

    })(req,res)
}

module.exports.authenticate = authenticate;


