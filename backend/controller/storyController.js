const Story = require('../models/storyModel')

//GET ALL STORIES
const stories_index = async (req,res) => {
    try{
        const stories = await Story.find().sort({createdAt: -1})
        res.status(200).json(stories)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//GET SINGLE STORY
const story_details = async (req,res) => {
    try{
        const id = req.params.id
        const story = await Story.findById(id)
        res.status(200).json(story)
    }
    catch(error){
        res.status(404).json({error: "No story found"})
    }
}

//CREATE STORY
const story_create_post = async (req, res) => {
    // const {title,description,content,author} = req.body
    try{
      const story = await Story.create(req.body)
      res.status(200).json(story)
    }
    catch(error){
      res.status(400).json({error: error.message})
    }
}

//DELETE STORY
const story_delete = async (req, res) => {
    const id = req.params.id;
    try{
        const story = await Story.findOneAndDelete({_id:id})
        res.status(200).json({message:story})
    }
    catch(error){
        res.status(404).json({error: "No story found"})
    }
}

//UPDATE STORY
const story_update = async (req,res) => {
    try{
        const id = req.params.id
        const story = await Story.findOneAndUpdate({_id:id} , {...req.body})
        res.status(200).json({message:story})
    }
    catch(error){
        res.status(404).json({message:"No story found"})
    }
}

module.exports = { stories_index , story_details , story_create_post  , story_delete , story_update }