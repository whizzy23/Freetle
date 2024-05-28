const Comment = require('../models/commentModel');

//GET ALL COMMENTS FOR A STORY
const comments_index = async (req,res) => {
    try{
        const story_id = req.params.id
        const comments = await Comment.find({story_id}).sort({createdAt: -1})
        res.status(200).json(comments)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//CREATE A NEW COMMENT
const comment_create_post = async (req,res) => {
    const user_id = req.user._id
    const user_name = req.user.name
    const story_id = req.params.id
    const {comment} = req.body
    try{
        const newComment = await Comment.create({comment, user_id, user_name, story_id})
        res.status(200).json(newComment)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELETE A COMMENT
const comment_delete = async (req,res) => {
    const id = req.params.id
    try{
        const comment = await Comment.findOneAndDelete({_id:id})
        res.status(200).json({comment})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELETE ALL COMMENTS FROM A STORY
const comment_delete_all =  async (req, res) => {
    const id = req.params.id;
    try {
        await Comment.deleteMany({ story_id:id });
        res.status(200).json({ message: 'All comments deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete comments', error });
    }
}

module.exports = { comments_index , comment_create_post, comment_delete, comment_delete_all }