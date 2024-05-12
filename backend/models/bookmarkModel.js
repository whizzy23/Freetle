const mongoose = require('mongoose');
const {Schema} = mongoose;

const bookmarkSchema = new Schema({
  bookmarkStory: {
    type: Schema.Types.ObjectId,
    ref: 'Story',
    required: true
  }
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;