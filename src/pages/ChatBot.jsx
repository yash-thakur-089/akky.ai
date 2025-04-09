import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentMovies } from "../data/movies";
import "./ChatBot.css";

const ChatBot = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const [bookingStep, setBookingStep] = useState("idle");
  const [bookingData, setBookingData] = useState({});

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    const updatedMsgs = [...messages, { sender: "user", text: userMsg }];
    setMessages(updatedMsgs);
    processChat(userMsg.toLowerCase(), updatedMsgs);
    setInput("");
  };

  const processChat = (text, msgs) => {
    if (bookingStep === "awaitingMovie") {
      const matchedMovie = currentMovies.find((movie) =>
        movie.title.toLowerCase().includes(text)
      );
      if (matchedMovie) {
        setBookingData({ movie: matchedMovie });
        setBookingStep("awaitingTime");
        botReply(`Awesome! Please pick a showtime: ${matchedMovie.showtimes.join(" | ")}`, msgs);
      } else {
        botReply("Couldn't find that movie. Try again?", msgs);
      }
      return;
    }

    if (bookingStep === "awaitingTime") {
      const typedTime = text.trim().toLowerCase();
      const matchedTime = bookingData.movie.showtimes.find(
        (t) => t.toLowerCase() === typedTime
      );

      if (matchedTime) {
        setBookingData((prev) => ({ ...prev, time: matchedTime }));
        setBookingStep("awaitingSeats");
        botReply("How many seats would you like to book?", msgs);
      } else {
        botReply("Invalid time. Please type an available showtime exactly as shown.", msgs);
      }
      return;
    }

    if (bookingStep === "awaitingSeats") {
      const numSeats = parseInt(text);
      if (isNaN(numSeats) || numSeats <= 0) {
        botReply("Please enter a valid number of seats.", msgs);
        return;
      }

      const finalBooking = {
        movie: bookingData.movie.title,
        time: bookingData.time,
        seats: Array.from({ length: numSeats }, (_, i) => `S${i + 1}`),
        total: numSeats * 200,
        timestamp: new Date().toLocaleString(),
      };

      const history = JSON.parse(localStorage.getItem("bookingHistory")) || [];
      history.push(finalBooking);
      localStorage.setItem("bookingHistory", JSON.stringify(history));

      botReply(
        `✅ Booking confirmed!\nMovie: ${finalBooking.movie}\nShowtime: ${finalBooking.time}\nSeats: ${finalBooking.seats.join(
          ", "
        )}\nTotal: ₹${finalBooking.total}`,
        msgs
      );
      setBookingStep("idle");
      setBookingData({});
      return;
    }

    // Normal bot commands
    if (text.includes("book")) {
      setBookingStep("awaitingMovie");
      botReply("Sure! Which movie would you like to watch?", msgs);
    } else if (text.includes("current movies")) {
      botReply("Redirecting to current movies...", msgs);
      navigate("/");
    } else if (text.includes("coming soon")) {
      botReply("Redirecting to coming soon movies...", msgs);
      navigate("/coming-soon");
    } else if (text.includes("booking history")) {
      botReply("Opening your booking history...", msgs);
      navigate("/booking-history");
    } else if (text.includes("nearby")) {
      botReply("Showing nearby cinemas...", msgs);
      navigate("/nearby-cinemas");
    } else if (text.includes("help")) {
      botReply(
        "Try commands like:\n- current movies\n- book ticket\n- booking history\n- coming soon\n- nearby cinemas",
        msgs
      );
    } else {
      botReply("Sorry, I didn't understand that. Type 'help' for options.", msgs);
    }
  };

  const botReply = (text, msgs) => {
    setTimeout(() => {
      setMessages([...msgs, { sender: "bot", text }]);
    }, 500);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbox">
          <div className="chat-header">🎬 MovieBot</div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>💬</button>
    </div>
  );
};

export default ChatBot;
