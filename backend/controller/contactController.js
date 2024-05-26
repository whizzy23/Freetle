const Message = require('../models/messageModel')

//GET ALL MESSAGE
const messages_index = async (req,res) => {
    try{
        const messages = await Message.find().sort({createdAt: -1})
        res.status(200).json(messages)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//GET SINGLE MESSAGE
const message_details = async (req,res) => {
    try{
        const id = req.params.id
        const message = await Message.findById(id)
        res.status(200).json(message)
    }
    catch(error){
        res.status(404).json({error: "No message found"})
    }
}

//POST MESSAGE
const message_create_post = async (req, res) => {
    // const {userName,userEmail,userMessage} = req.body
    let emptyFields = []
    if(!req.body.userName.trim()){
        emptyFields.push('userName')
    }
    if(!req.body.userEmail.trim()){
        emptyFields.push('userEmail')
    }
    if(!req.body.userMessage.trim()){
        emptyFields.push('userMessage')
    }
    if(emptyFields.length > 0){
        res.status(400).json({error: 'Please fill all the fields' , emptyFields})
        return
    }

    try{
      const user_id = req.user._id
      const message = await Message.create({...req.body, user_id})
      res.status(200).json(message)
    }
    catch(error){
      res.status(400).json({error: error.message})
    }
}

module.exports = { messages_index , message_create_post , message_details}