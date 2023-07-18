import { BooksRepository } from "./books.repository";

export class BooksController {
  constructor(private booksRepository: BooksRepository) {}

  addBook = (title: string, author: string) => {
    return this.booksRepository.addBook(title, author);
  };
}
