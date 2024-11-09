import React, { useState } from 'react';
import Grid from './Grid';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="App">
      <header className="app-header">
        <div className="left-side">
          <i className="bi bi-arrow-left icon-large"></i>
          <h2>Romantic Comedy</h2>
        </div>
        <div className="right-side">
          <button className="search-button">
            <i className="bi bi-search icon-large" />
          </button>
        </div>
      </header>
      <Grid searchQuery={searchQuery} />
    </div>
  );
}

export default App;
