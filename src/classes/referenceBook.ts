import Book from "./book";

export default class ReferenceBook extends Book {
  private locationCode: string;

  constructor(
    id: number,
    title: string,
    author: string,
    category: string,
    isAvailable: boolean,
    locationCode: string,
  ) {
    super(id, title, author, category, isAvailable);

    this.locationCode = locationCode;
  }

  getLocationCode(): string {
    return this.locationCode;
  }

  displayInfo(): string {
    return `${super.displayInfo()}
    Location Code: ${this.locationCode}
      `;
  }
}
