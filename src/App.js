import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
