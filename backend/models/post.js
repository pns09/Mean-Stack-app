const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    "title": {
        type: String,
        trim: true,
        required: [true, 'title is missing']

    },
    "description": {
        type: String,
        trim: true,
        required: [true, 'descriptions is missing']

    },
    "createdBy": {
        type: String,
        // required: [true, 'created by is required']
    },
    "like": {
        type: Number,
        default: 0
    },
    "comment":{
        type: [String]
    }

})
const postModel = mongoose.model('postCollection', postSchema);
module.exports = postModel;