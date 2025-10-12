const books = require('../data/books.json');

const getAllBooks = (req, res) => {
  res.status(200).json({ books });
};

module.exports = { getAllBooks };