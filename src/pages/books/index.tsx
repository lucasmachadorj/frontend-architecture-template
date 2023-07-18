import { Link } from "react-router-dom";
import compositionRoot from "../../bootstrap/compositionRoot";
import { observer } from "mobx-react";
import ListBooks from "./components/listBooks";
import AddBook from "./components/addBooks";

const BooksPage: React.FC = observer(() => {
  const { controller, presenter } = compositionRoot.getBooksHandlers();

  return (
    <>
      <h1>Books Page</h1>
      <Link to="/">Go to Home</Link>
      <ListBooks books={presenter.getBooks()} />
      <AddBook addBook={controller.addBook} />
    </>
  );
});

export default BooksPage;
