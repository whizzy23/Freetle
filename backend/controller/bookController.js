const Books = require("../models/bookModel");
const User = require("../models/userModel");
const { cloudinary } = require("../utils/cloudinary");
const axios = require("axios");

// GET ALL BOOKS
const all_books = async (req, res) => {
  try {
    const books = await Books.find().sort({
      createdAt: -1,
    });
    res.status(200).json(books);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET ALL AVAILABLE BOOKS FOR SALE
const available_books = async (req, res) => {
  try {
    const books = await Books.find({ available: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(books);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET BOOKS PURCHASED BY THE USER
const user_purchased_books = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("purchasedBooks");
    res.status(200).json(user.purchasedBooks || []);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET BOOKS FOR SALE BY A SPECIFIC USER
const user_books = async (req, res) => {
  try {
    const books = await Books.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET DETAILS OF A SPECIFIC BOOK FOR SALE
const book_details = async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error: "Book not found" });
  }
};

// CREATE A NEW BOOK FOR SALE
const book_create_post = async (req, res) => {
  const { title, description, price } = req.body;
  const owner = req.user._id;

  const bookFileRaw = req.files?.bookFile?.[0];
  const coverImageRaw = req.files?.coverImage?.[0];

  if (!title || !description || !price || !bookFileRaw) {
    return res
      .status(400)
      .json({ error: "Title, description, price and book file are required" });
  }

  const bookFile = {
    url: bookFileRaw.path,
    publicId: bookFileRaw.filename,
  };
  const coverImage = coverImageRaw
    ? { url: coverImageRaw.path, publicId: coverImageRaw.filename }
    : { url: null, publicId: null };

  try {
    const book = await Books.create({
      title,
      description,
      price,
      owner,
      bookFile,
      coverImage,
      available: true,
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE A BOOK FOR SALE (ONLY IF NOT PURCHASED)
const book_delete = async (req, res) => {
  try {
    const book = await Books.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!book)
      return res.status(404).json({ error: "Book not found or unauthorized" });

    const purchased = await User.findOne({ purchasedBooks: req.params.id });
    if (purchased)
      return res
        .status(403)
        .json({ error: "Book already purchased. Cannot delete." });

    // Delete from Cloudinary
    console.log(book.bookFile.publicId)
    if (book.bookFile.publicId)
      await cloudinary.uploader.destroy(book.bookFile.publicId, { resource_type: "raw" });
    if (book.coverImage.publicId)
      await cloudinary.uploader.destroy(book.coverImage.publicId);

    await book.deleteOne();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE AVAILABILITY OF A BOOK FOR SALE (ONLY OWNER)
const book_update_availability = async (req, res) => {
  try {
    const book = await Books.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!book)
      return res.status(404).json({ error: "Book not found or unauthorized" });

    book.available = req.body.available;
    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DOWNLOAD A BOOK FILE (ONLY IF PURCHASED OR OWNER)
const book_download = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user._id;

    const book = await Books.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const isOwner = String(book.owner) === String(userId);
    const hasPurchased =
      Array.isArray(user.purchasedBooks) &&
      user.purchasedBooks.map(String).includes(String(bookId));

    if (!isOwner && !hasPurchased) {
      return res
        .status(403)
        .json({ error: "You are not authorized to download this book" });
    }

    if (!book.bookFile.url)
      return res.status(400).json({ error: "Download URL not available" });

    const fileUrl = book.bookFile.url.replace("/upload/", `/upload/fl_attachment/`);

    const fileResponse = await axios.get(fileUrl, { responseType: "stream" });

    res.setHeader("Content-Disposition", `attachment; filename="${book.title || "book"}.pdf"`);
    res.setHeader("Content-Type", "application/pdf");

    fileResponse.data.pipe(res);
  } catch (err) {
    console.error("Download error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  all_books,
  available_books,
  user_purchased_books,
  user_books,
  book_details,
  book_create_post,
  book_delete,
  book_update_availability,
  book_download
};
