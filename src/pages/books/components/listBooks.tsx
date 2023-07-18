import { BookVM } from "../../../modules/books/books.presenter";
import AddBook from "./addBooks";

type Props = {
  books: BookVM[];
};

const ListBooks = ({ books }: Props) => {
  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
};

export default ListBooks;
