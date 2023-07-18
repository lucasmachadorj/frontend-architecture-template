import { useState } from "react";

type Props = {
  addBook: (title: string, author: string) => void;
};

const AddBook = ({ addBook }: Props) => {
  const [book, setBook] = useState({ title: "", author: "" });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addBook(book.title, book.author);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={book.title}
        onChange={handleInputChange}
      />
      <label htmlFor="author">Author</label>
      <input
        type="text"
        name="author"
        id="author"
        value={book.author}
        onChange={handleInputChange}
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
