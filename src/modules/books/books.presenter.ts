import { makeAutoObservable, observable } from "mobx";
import { BooksDTO, BooksRepository } from "./books.repository";
import { ApolloQueryResult } from "@apollo/client";

export type BookVM = {
  id: string;
  title: string;
  author: string;
};

export class BooksPresenter {
  private books: BookVM[] = [];

  constructor(private booksRepository: BooksRepository) {
    makeAutoObservable(this);
    this.subscribeToBooks();
  }

  private subscribeToBooks() {
    return this.booksRepository.watchBooks({
      next: this.reload.bind(this),
      error: (error) => {
        console.error(error);
      },
    });
  }

  getBooks() {
    return this.books;
  }

  private reload({ data }: ApolloQueryResult<BooksDTO>) {
    if (!data) return;
    this.books = data.books.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
    }));
  }
}
