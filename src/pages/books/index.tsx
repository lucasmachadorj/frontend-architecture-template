import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const BooksPage: React.FC = observer(() => {
  return (
    <>
      <h1>Books Page</h1>
      <Link to="/">Go to Home</Link>
    </>
  );
});

export default BooksPage;
