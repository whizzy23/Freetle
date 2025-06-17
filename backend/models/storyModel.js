const mongoose = require('mongoose');
const {Schema} = mongoose;

const storySchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        ref:'User',
        required:true
    },
    coverImageUrl:{
        type:String
    }
}, {timestamps:true} )

const Story = mongoose.model('Story',storySchema)

module.exports = Story;