import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/Search';
import RecipePage from './pages/RecipeDetails';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function AnimatedRoutes({ favorites, setFavorites }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <HomePage />
          </motion.div>
        }/>
        <Route path="/search" element={
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <SearchPage favorites={favorites} setFavorites={setFavorites} />
          </motion.div>
        }/>
        <Route path="/recipe/:id" element={
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <RecipePage favorites={favorites} setFavorites={setFavorites} />
          </motion.div>
        }/>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [favorites, setFavorites] = useState([]);

  return (
    <Router>
      <AnimatedRoutes favorites={favorites} setFavorites={setFavorites} />
    </Router>
  );
}

export default App;
