const mongoose = require('mongoose');
const {Schema} = mongoose;

const bookmarkSchema = new Schema({
  bookmarkStory: {
    type: Schema.Types.ObjectId,
    ref: 'Story',
    required: true
  },
  user_id: {
    type: String,
    ref: 'User',
    required: true
  }
},{timestamps: true});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;