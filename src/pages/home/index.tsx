import { useNavigate } from "react-router-dom";
import compositionRoot from "../../bootstrap/compositionRoot";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const goToBooks = () => {
    navigate("/books");
  };

  const { controller } = compositionRoot.getAuthHandlers();

  return (
    <>
      <h1>Home Page</h1>
      <button onClick={goToBooks}>Click me</button>
      <button onClick={controller.logout}>Logout</button>
    </>
  );
};

export default HomePage;
