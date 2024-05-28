const mongoose = require('mongoose');
const {Schema} = mongoose;

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  user_id:{
    type: String,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  story_id: {
    type: String,
    ref: 'Story',
    required: true
  }
},{timestamps: true});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;