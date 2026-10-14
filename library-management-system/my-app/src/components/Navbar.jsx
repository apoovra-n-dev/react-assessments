function Navbar() {
    return (
        <nav className="navbar">

            <div className="logo">
                <i className="fa-solid fa-book-open"></i>
                <h2>BookShelf</h2>
            </div>

            <div className="nav-links">

                <a href="#home">
                    <i className="fa-solid fa-house"></i> Home
                </a>

                <a href="#books">
                    <i className="fa-solid fa-book"></i> Books
                </a>

                <a href="#add-book">
                    <i className="fa-solid fa-plus"></i> Add Book
                </a>

            </div>

        </nav>
    );
}

export default Navbar;