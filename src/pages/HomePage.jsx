import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // if you have one

function HomePage() {
  const navigate = useNavigate();

  const handlefun = () => {
    navigate('/search');
  };

  return (
    <div className='container'>
      <h1>Discover Delicious Recipes</h1>
      <p>Explore a world of mouthwatering dishes. Search by ingredients to find your perfect recipe!</p>
      <button onClick={handlefun}>Get Started</button>
    </div>
  );
}

export default HomePage;
