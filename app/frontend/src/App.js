import React from 'react';
import './App.css';
import Button from '@mui/material/Button';

import Navbar from './Components/Homebar'
import HomeAbout from './Components/Homeabout'
import HomeService from './Components/Homeservice'
import HomePortfolio from './Components/Homeportfolio'
import HomeContact from './Components/Homecontact';
import HomeFooter from './Components/Homefooter'

function App() {
  return (
    <div className="App" id='home'>
      <Navbar />
      <header className="App-header">
        <h1>
          Find Your Inner Peace
        </h1>
        <p>
          Because sometimes, all you need is a moment to 
          <br></br>
          relax your mind
        </p>
        <Button variant="contained" className="App-Button"><p>Get Started</p></Button>
      </header>

      <HomeAbout />
      <HomeService />
      <HomePortfolio />
      <HomeContact />
      <HomeFooter />
    </div>
  );
}

export default App;
