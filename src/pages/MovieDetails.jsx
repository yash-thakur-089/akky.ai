import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { currentMovies } from '../data/movies';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = currentMovies.find((m) => m.id === parseInt(id));

  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="movie-details-container">
      <img src={movie.poster} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>

      <div className="showtimes">
        <h3>Available Showtimes</h3>
        <div className="showtime-buttons">
          {movie.showtimes.map((time, index) => (
            <button
              key={index}
              className="showtime-button"
              onClick={() =>
                navigate(`/seat-selection/${movie.id}?time=${encodeURIComponent(time)}`)
              }
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
