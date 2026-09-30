import Book from "./book";

export default class Library {
  private books: Book[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }

  removeBook(bookId: number): void {
    this.books = this.books.filter((book) => book.getId() !== bookId);
  }

  searchBooks(searchTerm: string): Book[] {
    const term = searchTerm.toLowerCase().trim();

    if (!term) {
      return this.books;
    }

    return this.books.filter(
      (book) =>
        book.getTitle().toLowerCase().includes(term) ||
        book.getAuthor().toLowerCase().includes(term),
    );
  }

  filterByCategory(category: string): Book[] {
    if (category === "all") {
      return this.books;
    }

    return this.books.filter(
      (book) => book.getCategory().toLowerCase() === category.toLowerCase(),
    );
  }

  toggleAvailability(bookId: number): void {
    const book = this.books.find((book) => book.getId() === bookId);

    if (book) {
      book.toggleAvailability();
    }
  }

  getBooks(): Book[] {
    return this.books;
  }
}
