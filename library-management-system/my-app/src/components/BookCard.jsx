import { useState } from "react";

function BookCard({ book, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: book.title || "",
        author: book.author || "",
        category: book.category || "",
        isbn: book.isbn || "",
    });

    /* Handle Input Changes */
    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    }

    /* Update Book */
    async function handleUpdate(event) {
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
            const success = await onUpdate(
                book.id,
                cleanedData
            );

            if (success) {
                setIsEditing(false);
            }
        } finally {
            setSubmitting(false);
        }
    }

    /* Book Card */
    return (
        <div className="book-card">
            {isEditing ? (
                <form
                    onSubmit={handleUpdate}
                    className="edit-book-form"
                >
                    <h3>Edit Book</h3>

                    <label htmlFor={`title-${book.id}`}>
                        Book Title
                    </label>

                    <input
                        id={`title-${book.id}`}
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor={`author-${book.id}`}>
                        Author
                    </label>

                    <input
                        id={`author-${book.id}`}
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor={`category-${book.id}`}>
                        Category
                    </label>

                    <input
                        id={`category-${book.id}`}
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor={`isbn-${book.id}`}>
                        ISBN
                    </label>

                    <input
                        id={`isbn-${book.id}`}
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={submitting}
                        className="edit-submit-btn"
                    >
                        {submitting ? "Updating..." : "Save Changes"}
                    </button>

                    <button
                        type="button"
                        className="edit-cancel-btn"
                        onClick={() => {
                            setFormData({
                                title: book.title || "",
                                author: book.author || "",
                                category: book.category || "",
                                isbn: book.isbn || "",
                            });

                            setIsEditing(false);
                        }}
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                </form>
            ) : (
                <>
                    <div className="book-card-content">
                        <h3>{book.title}</h3>

                        <p>
                            <strong>Author:</strong> {book.author}
                        </p>

                        <p>
                            <strong>Category:</strong> {book.category}
                        </p>

                        <p>
                            <strong>ISBN:</strong> {book.isbn}
                        </p>
                    </div>

                    <div className="book-card-actions">
                        <button
                            type="button"
                            className="edit-btn"
                            onClick={() => {
                                setFormData({
                                    title: book.title || "",
                                    author: book.author || "",
                                    category: book.category || "",
                                    isbn: book.isbn || "",
                                });

                                setIsEditing(true);
                            }}
                        >
                            ✏️ Update
                        </button>

                        <button
                            type="button"
                            className="delete-btn"
                            onClick={() => onDelete(book.id)}
                        >
                            🗑️ Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default BookCard;