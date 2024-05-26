const mongoose = require('mongoose');
const {Schema} = mongoose;

const messageSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    userMessage:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        ref:'User',
        required:true
    }
}, {timestamps:true} )

const Message = mongoose.model('Message',messageSchema)

module.exports = Message;