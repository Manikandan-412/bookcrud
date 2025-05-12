const express = require("express");
const router = express.Router();
const Books = require("../models/book");

// Upload a book
router.post('/upload', async (req, res) => {
    try {
        const { name, author, year } = req.body;    
        const newBook = new Books({ name, author, year });
        await newBook.save();
        res.json({ success: true, message: "Book uploaded successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// View all books
router.get("/view", async (req, res) => {
    try {
        const books = await Books.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Find One Book
router.get('/find/:id', async (req, res) => {
    try {
        const book = await Books.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found!" });
        }
        res.json(book);
    } catch (err) {
        console.log("error: "+err);
        
    }
});

// Update a Book
router.put('/update/:id', async (req, res) => {
    try {
        const { name, author, year } = req.body;
        const updatedBook = await Books.findByIdAndUpdate(
            req.params.id, 
            { name, author, year }, 
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ error: "Book not found!" });
        }

        res.json({ success: true, message: "Book updated successfully!", book: updatedBook });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});






// Delete a Book
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedBook = await Books.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({ error: "Book not found!" });
        }

        res.json({ success: true, message: "Book deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;