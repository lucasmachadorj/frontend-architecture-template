import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const goToBooks = () => {
    navigate("/books");
  };
  return (
    <>
      <h1>Home Page</h1>
      <button onClick={goToBooks}>Click me</button>
    </>
  );
};

export default HomePage;
