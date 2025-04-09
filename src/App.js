import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SeatSelection from './pages/SeatSelection';
import Payment from './pages/Payment';
import ComingSoon from './pages/ComingSoon';
import NearbyCinemas from './pages/NearbyCinemas';
import BookingHistory from './pages/BookingHistory';
import ChatBot from './pages/ChatBot';
import './App.css';

const App = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <Router>
      <Navbar toggleChatbot={() => setChatbotOpen(prev => !prev)} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/seat-selection/:id" element={<SeatSelection />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/nearby-cinemas" element={<NearbyCinemas />} />
          <Route path="/booking-history" element={<BookingHistory />} />
        </Routes>
      </div>
      <ChatBot isOpen={chatbotOpen} setIsOpen={setChatbotOpen} />
    </Router>
  );
};

export default App;
