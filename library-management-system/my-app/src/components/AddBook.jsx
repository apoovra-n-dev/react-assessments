import { useState } from "react";

function AddBook({ onAddBook }) {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        isbn: "",
    });

    const [submitting, setSubmitting] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const cleanedData = {
            title: formData.title.trim(),
            author: formData.author.trim(),
            category: formData.category.trim(),
            isbn: formData.isbn.trim(),
        };

        if (
            !cleanedData.title ||
            !cleanedData.author ||
            !cleanedData.category ||
            !cleanedData.isbn
        ) {
            alert("Please fill in all fields.");
            return;
        }

        setSubmitting(true);

        try {
            const success = await onAddBook(cleanedData);

            if (success) {
                setFormData({
                    title: "",
                    author: "",
                    category: "",
                    isbn: "",
                });

                alert("Book added successfully!");
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="add-book-section" id="add-book">

            <div className="form-heading">
                <div>
                    <p className="data">
                        EXPAND YOUR COLLECTION
                    </p>

                    <h2>Add a New Book</h2>

                    <p>Enter the details of the book below.</p>
                </div>

                <span className="form-icon">📚</span>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Book Title</label>

                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Enter book title"
                        value={formData.title}
                        onChange={handleChange}
                        required/>
                </div>

                <div className="form-group">
                    <label htmlFor="author">Author</label>

                    <input
                        id="author"
                        type="text"
                        name="author"
                        placeholder="Enter author name"
                        value={formData.author}
                        onChange={handleChange}
                        required/>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>

                    <input
                        id="category"
                        type="text"
                        name="category"
                        placeholder="Enter category"
                        value={formData.category}
                        onChange={handleChange}
                        required/>
                </div>

                <div className="form-group">
                    <label htmlFor="isbn">ISBN</label>

                    <input
                        id="isbn"
                        type="text"
                        name="isbn"
                        placeholder="Enter ISBN"
                        value={formData.isbn}
                        onChange={handleChange}
                        required/>
                </div>

                <button
                    type="submit"
                    className="add-btn"
                    disabled={submitting}>
                    {submitting ? "Adding Book..." : "+ Add Book"}
                </button>
            </form>
        </section>
    );
}

export default AddBook;