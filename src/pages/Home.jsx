import React from 'react';
import { useNavigate } from 'react-router-dom';
import { currentMovies } from '../data/movies';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="home-container">
      <h2>🎥 Now Showing in Cinemas</h2>
      <div className="movie-grid">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="movie-card" onClick={() => handleClick(movie.id)}>
            <img src={movie.poster} alt={movie.title} />
            <div className="movie-overlay">
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
