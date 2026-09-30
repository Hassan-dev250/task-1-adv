import "./style.css";
import Book from "./classes/book";
import Library from "./classes/library";
// import ReferenceBook from "./classes/referenceBook";
import dataBook from "./assets/books.json";

// DOM elements
const booksGrid = document.querySelector<HTMLDivElement>(".books-grid")!;
const searchBox = document.querySelector<HTMLInputElement>("#search-box")!;
const categorySelect =
  document.querySelector<HTMLSelectElement>("#category-filter")!;

// Library
const library = new Library();

// Books
// const book1 = new Book(
//   1,
//   "The Great Gatsby",
//   "F. Scott Fitzgerald",
//   "classic",
//   false,
// );

// const book4 = new ReferenceBook(
//   4,
//   "title",
//   "ahmad",
//   "technology",
//   true,
//   "sss222ff",
// );

// library.addBook(book1);
// library.addBook(book4);

// console.log(book1.displayInfo());
// console.log(book4.displayInfo());

dataBook.forEach((book, index) => {
  const book1 = new Book(
    index + 1,
    book.title,
    book.author,
    book.category,
    book.isAvailable,
  );
  library.addBook(book1);
});
// Current filters
let searchTerm = "";
let selectedCategory = "all";

// Render books
const render = (books: Book[]): void => {
  booksGrid.innerHTML = "";

  if (books.length === 0) {
    booksGrid.innerHTML = `
      <p class="no-books">No books found.</p>
    `;
    return;
  }

  books.forEach((book) => {
    const bookCard = document.createElement("article");
    bookCard.classList.add("book-card");

    // Title
    const bookTitle = document.createElement("h2");
    bookTitle.textContent = book.getTitle();

    // Book info
    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");

    // Author
    const author = document.createElement("div");
    author.innerHTML = `
      <span class="label">Author:</span>
      <span>${book.getAuthor()}</span>
    `;

    // Category
    const category = document.createElement("div");
    category.innerHTML = `
      <span class="label">Category:</span>
      <span class="category ${book.getCategory().toLowerCase()}">
        ${book.getCategory()}
      </span>
    `;

    // Availability
    const availability = document.createElement("div");

    const isAvailable = book.getAvailability();

    availability.innerHTML = `
      <span class="label">Availability:</span>
      <span class="availability ${isAvailable ? "available" : "unavailable"}">
        ${isAvailable ? "Available" : "Unavailable"}
      </span>
    `;

    // Toggle
    const toggle = document.createElement("label");
    toggle.classList.add("toggle-container");

    toggle.innerHTML = `
      <input
        class="toggle-input"
        type="checkbox"
        data-id="${book.getId()}"
        ${isAvailable ? "checked" : ""}
      />

      <span class="toggle"></span>

      <span class="toggle-label">
        Toggle status
      </span>
    `;

    bookInfo.append(author, category, availability);

    bookCard.append(bookTitle, bookInfo, toggle);

    booksGrid.append(bookCard);
  });
};

// Apply search + category filters together
const updateBooks = (): void => {
  let books = library.getBooks();

  // Search
  if (searchTerm) {
    const term = searchTerm.toLowerCase().trim();

    books = books.filter(
      (book) =>
        book.getTitle().toLowerCase().includes(term) ||
        book.getAuthor().toLowerCase().includes(term),
    );
  }

  // Category
  if (selectedCategory !== "all") {
    books = books.filter(
      (book) =>
        book.getCategory().toLowerCase() === selectedCategory.toLowerCase(),
    );
  }

  render(books);
};

// Search event
searchBox.addEventListener("input", () => {
  searchTerm = searchBox.value;
  updateBooks();
});

// Category event
categorySelect.addEventListener("change", () => {
  selectedCategory = categorySelect.value;
  updateBooks();
});

// Toggle event
booksGrid.addEventListener("change", (event) => {
  const target = event.target as HTMLInputElement;

  if (target.matches(".toggle-input") && target.type === "checkbox") {
    const bookId = Number(target.dataset.id);

    if (!Number.isNaN(bookId)) {
      library.toggleAvailability(bookId);
      updateBooks();
    }
  }
});

// Initial render
updateBooks();
