import React from 'react';
import { comingSoon } from '../data/movies';
import './ComingSoon.css';

const ComingSoon = () => {
  return (
    <div className="coming-page">
      <h2>🎬 Coming Soon to Theaters</h2>
      <div className="coming-movie-grid">
        {comingSoon.map((movie) => (
          <div className="coming-movie-card" key={movie.id}>
            <img src={movie.poster} alt={movie.title} />
            <div className="movie-overlay">
              <h3>{movie.title}</h3>
              <span className="release-date">{movie.releaseDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComingSoon;
