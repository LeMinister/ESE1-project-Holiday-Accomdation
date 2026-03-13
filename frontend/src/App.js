import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Properties from './pages/Properties';
import Login from './pages/Login';
import Register from './pages/Register';
import ManageBooking from './pages/ManageBooking';

function App() {
  const [currentPage, setCurrentPage] = useState('properties');

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'manageBooking':
        return <ManageBooking />;
      default:
        return <Properties />;
    }
  };

  return (
    <div className="App">
      <Header onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;