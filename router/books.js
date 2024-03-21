const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (err) {
    res.status(404).json({ message: "Book not found" });
  }
});

router.post("/books", async (req, res) => {
  const book = new Book({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    author: req.body.author,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Bài 3
// Trả về sản phẩm chi tiết theo Id
router.get("/books/:id", getBook, (req, res) => {
  res.json(res.book);
});

// Cập nhật sản phẩm
router.patch("/books/:id", getBook, async (req, res) => {
  if (req.body.name != null) {
    res.book.name = req.body.name;
  }
  if (req.body.price != null) {
    res.book.price = req.body.price;
  }
  if (req.body.description != null) {
    res.book.description = req.body.description;
  }
  if (req.body.image != null) {
    res.book.image = req.body.image;
  }
  if (req.body.author != null) {
    res.book.author = req.body.author;
  }
  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Tạo mới sản phẩm
router.post("/books", async (req, res) => {
  const book = new Book({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    author: req.body.author,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa sản phẩm
router.delete("/books/:id", getBook, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.book = book;
  next();
}
module.exports = router;
