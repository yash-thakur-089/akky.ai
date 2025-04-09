import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './SeatSelection.css';
import { currentMovies } from '../data/movies'; // import movie list

const seatMap = [
  { row: 'A', type: 'regular', price: 200 },
  { row: 'B', type: 'regular', price: 200 },
  { row: 'C', type: 'premium', price: 300 },
  { row: 'D', type: 'premium', price: 300 },
  { row: 'E', type: 'recliner', price: 400 }
];

const cols = 8;

const SeatSelection = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const showtime = searchParams.get('time');

  const [selectedSeats, setSelectedSeats] = useState([]);

  const movie = currentMovies.find((m) => m.id === parseInt(id));

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const getSeatPrice = (seatId) => {
    const rowLetter = seatId.charAt(0);
    const seatType = seatMap.find((s) => s.row === rowLetter);
    return seatType?.price || 0;
  };

  const totalAmount = selectedSeats.reduce((total, seat) => total + getSeatPrice(seat), 0);

  const handleProceed = () => {
    navigate('/payment', {
      state: {
        movieId: id,
        showtime,
        seats: selectedSeats,
        total: totalAmount,
        movieTitle: movie?.title || 'Untitled Movie'
      }
    });
  };

  return (
    <div className="seat-selection-container">
      <h2>Select Your Seats</h2>
      <p>Showtime: <strong>{showtime}</strong></p>

      <div className="screen-indicator">SCREEN THIS WAY</div>

      <div className="legend">
        <div><span className="legend-box recliner"></span> Recliner (₹400)</div>
        <div><span className="legend-box premium"></span> Premium (₹300)</div>
        <div><span className="legend-box regular"></span> Regular (₹200)</div>
      </div>

      <div className="seats-section">
        {seatMap.map(({ row, type, price }) => (
          <div key={row} className="seat-row">
            <span className="row-label">{row}</span>
            {[...Array(cols)].map((_, colIdx) => {
              const seatId = `${row}${colIdx + 1}`;
              return (
                <div
                  key={seatId}
                  className={`seat ${type} ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                  title={`${type.toUpperCase()} – ₹${price}`}
                  onClick={() => toggleSeat(seatId)}
                >
                  {seatId}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="selected-info">
        <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
        <p>Total: <strong>₹{totalAmount}</strong></p>
        <button
          className="proceed-button"
          disabled={selectedSeats.length === 0}
          onClick={handleProceed}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
