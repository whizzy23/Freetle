const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadBook");
const requireAuth = require("../middleware/requireAuth");
const {
  all_books,
  available_books,
  user_purchased_books,
  user_books,
  book_details,
  book_create_post,
  book_delete,
  book_update_availability,
  book_download
} = require("../controller/bookController");

router.use(requireAuth);

router.get("/", all_books);

router.get("/available", available_books);

router.get("/user", user_books);

router.get("/user/purchases", user_purchased_books);

router.get("/:id", book_details);

router.get('/download/:id', requireAuth, book_download);

router.post("/upload",
  upload.fields([
    { name: "bookFile", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  book_create_post
);

router.delete("/:id", book_delete);

router.patch("/:id/availability", book_update_availability);

module.exports = router;
