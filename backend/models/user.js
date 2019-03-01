const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
// const config = require('../config/config');
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  "name": {
    type: String,
    trim: true,
    required: [true, 'Name is missing']

  },

  "email": {
    type: String,
    trim: true,
    required: [true, 'Email is missing']

  },

  "password": {
    type: String,
    trim: true,
    required: [true, 'Password is missing']
  }
})

// Password hashing using bcrypt
userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

//   authenticate the user data with the data in database 
//   userSchema.statics.authenticate = function (email, password, callback) {
//     RegisterCollection.findOne({ name: name })
//       .exec(function (err, user) {
//         if (err) {
//           return callback(err)
//         } else if (!user) {
//           var err = new Error('User not found.');
//           err.status = 401;
//           return callback(err);
//         }
//         bcrypt.compare(password, user.password, function (err, result) {
//           if (result === true) {
//             return callback(null, user);
//           } else {
//             return callback();
//           }
//         })
//       });
//   }


userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.generateJwt = function () {
  return jwt.sign({ name: this.name }, "srinivas", { expiresIn: "1h" });
}

const userModel = mongoose.model('RegisterCollection', userSchema);
module.exports = userModel;