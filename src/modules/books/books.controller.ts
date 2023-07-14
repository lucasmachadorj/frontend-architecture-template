import { BooksRepository } from "./books.repository";

export class BooksController {
  constructor(private booksRepository: BooksRepository) {}
}
