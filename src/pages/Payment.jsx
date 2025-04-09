import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  const [method, setMethod] = useState('card');

  if (!bookingData) {
    return <p>No booking data. Please go back and select seats.</p>;
  }

  const { showtime, seats, total, movieTitle } = bookingData;

  const handleConfirm = (e) => {
    e.preventDefault();

    const newBooking = {
      movieTitle: movieTitle || "Movie Title",
      showtime,
      selectedSeats: seats,
      total,
      date: new Date().toLocaleString()
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, newBooking]));

    alert(`Payment Successful via ${method.toUpperCase()}!`);
    navigate('/booking-history');
  };

  return (
    <div className="payment-container">
      <h2>Payment Options</h2>

      <div className="summary">
        <p><strong>Movie:</strong> {movieTitle}</p>
        <p><strong>Showtime:</strong> {showtime}</p>
        <p><strong>Seats:</strong> {seats.join(', ')}</p>
        <p><strong>Total:</strong> ₹{total}</p>
      </div>

      <div className="payment-methods">
        <label>
          <input
            type="radio"
            name="method"
            value="card"
            checked={method === 'card'}
            onChange={() => setMethod('card')}
          />
          Credit/Debit Card
        </label>
        <label>
          <input
            type="radio"
            name="method"
            value="upi"
            checked={method === 'upi'}
            onChange={() => setMethod('upi')}
          />
          UPI
        </label>
        <label>
          <input
            type="radio"
            name="method"
            value="wallet"
            checked={method === 'wallet'}
            onChange={() => setMethod('wallet')}
          />
          Wallet
        </label>
      </div>

      <form className="payment-form" onSubmit={handleConfirm}>
        {method === 'card' && (
          <>
            <input type="text" placeholder="Name on Card" required />
            <input type="text" placeholder="Card Number" maxLength={16} required />
            <div className="row">
              <input type="text" placeholder="MM/YY" maxLength={5} required />
              <input type="password" placeholder="CVV" maxLength={4} required />
            </div>
          </>
        )}

        {method === 'upi' && (
          <input type="text" placeholder="Enter UPI ID (e.g., user@upi)" required />
        )}

        {method === 'wallet' && (
          <select required>
            <option value="">Select Wallet</option>
            <option value="paytm">Paytm</option>
            <option value="phonepe">PhonePe</option>
            <option value="amazonpay">Amazon Pay</option>
          </select>
        )}

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default Payment;
