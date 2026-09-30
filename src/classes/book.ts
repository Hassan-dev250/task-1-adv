export default class Book {
  private id: number;
  private title: string;
  private author: string;
  private category: string;
  private isAvailable: boolean;

  constructor(
    id: number,
    title: string,
    author: string,
    category: string,
    isAvailable: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.category = category;
    this.isAvailable = isAvailable;
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getAuthor(): string {
    return this.author;
  }

  getCategory(): string {
    return this.category;
  }

  getAvailability(): boolean {
    return this.isAvailable;
  }

  toggleAvailability(): void {
    this.isAvailable = !this.isAvailable;
  }
  displayInfo(): string {
    return `
       ID: ${this.id}
       Title: ${this.title}
       Author: ${this.author}
       Category: ${this.category}
       Availability: ${this.isAvailable ? "Available" : "Unavailable"}
     `;
  }
}
