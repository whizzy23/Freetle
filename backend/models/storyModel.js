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
    }  
}, {timestamps:true} )

const Story = mongoose.model('Story',storySchema)

module.exports = Story;