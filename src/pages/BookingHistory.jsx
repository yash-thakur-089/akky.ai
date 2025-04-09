import React from "react";
import html2canvas from "html2canvas";
import "./BookingHistory.css";

const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

const BookingHistory = () => {
  const downloadTicket = async (index) => {
    const ticketElement = document.getElementById(`ticket-${index}`);
    if (!ticketElement) return;

    const canvas = await html2canvas(ticketElement);
    const link = document.createElement("a");
    link.download = `ticket-${index + 1}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="booking-history-container">
      <h2>🎟️ Your Booked Tickets</h2>
      {bookings.length === 0 ? (
        <p className="empty-msg">No past bookings found.</p>
      ) : (
        <div className="booking-grid">
          {bookings.map((booking, index) => (
            <div className="booking-card" key={index}>
              <div id={`ticket-${index}`} className="ticket-preview">
                <h3>{booking.movieTitle}</h3>
                <p><strong>Showtime:</strong> {booking.showtime}</p>
                <p><strong>Seats:</strong> {booking.selectedSeats.join(", ")}</p>
                <p><strong>Total:</strong> ₹{booking.total}</p>
                <p><strong>Booked On:</strong> {booking.date}</p>
              </div>
              <button className="download-btn" onClick={() => downloadTicket(index)}>
                Download Ticket 🎟️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
