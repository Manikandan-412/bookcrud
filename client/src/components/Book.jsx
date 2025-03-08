import React, { useState, useEffect } from "react";
import axios from "axios";

const BookCrudComponent = () => {
    const [books, setBooks] = useState([]);
    const [formData, setFormData] = useState({ name: "", author: "", year: "" });
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get("https://bookcrud-72re.onrender.com/book/view");
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingBook) {
                await axios.put(`https://bookcrud-72re.onrender.com/book/update/${editingBook._id}`, formData);
                setEditingBook(null);
            } else {
                await axios.post("https://bookcrud-72re.onrender.com/book/upload", formData);
            }
            setFormData({ name: "", author: "", year: "" });
            fetchBooks();
        } catch (error) {
            console.error("Error saving book:", error);
        }
    };

    const handleEdit = (book) => {
        setFormData(book);
        setEditingBook(book);
    };

    const handleDelete = async (id) => {
        try {
            const isDelete = window.confirm("are you want to delete?");
            if (isDelete == true) {
                await axios.delete(`https://bookcrud-72re.onrender.com/book/delete/${id}`);
                fetchBooks();
            }

        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Book Manager 📚</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Book Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Year"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    {editingBook ? "Update Book" : "Add Book"}
                </button>
            </form>
            <div className="list-group">
                {books.map((book) => (
                    <div key={book._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{book.name}</h5>
                            <p className="mb-0 text-muted">{book.author} ({book.year})</p>
                        </div>
                        <div>
                            <button className="btn btn-warning me-2" onClick={() => handleEdit(book)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(book._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookCrudComponent;
