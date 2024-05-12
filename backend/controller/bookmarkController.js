const Bookmark = require('../models/bookmarkModel');

//GET ALL BOOKMARKS
const bookmarks_index = async (req,res) => {
    try{
        const bookmarks = await Bookmark.find().populate('bookmarkStory')
        res.status(200).json(bookmarks)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//ADD A NEW BOOKMARK
const add_bookmark = async (req,res) => {
    try{
        const bookmark = await Bookmark.create(req.body)
        res.status(200).json(bookmark)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELETE A BOOKMARK
const delete_bookmark = async (req,res) => {
    try{
        const id = req.params.id
        const bookmark = await Bookmark.findOneAndDelete({ bookmarkStory: id })
        res.status(200).json(bookmark)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { bookmarks_index , add_bookmark , delete_bookmark }