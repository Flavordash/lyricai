import React from 'react';
import './App.css';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import CreateLyrics from './Components/CreateLyrics.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <CreateLyrics />
      <Footer />
    </div>
  );
}

export default App;
