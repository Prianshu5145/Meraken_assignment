import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ViewAllListings from './pages/viewALLListings';
import ViewDetails from './pages/viewdetails';
function App() {
  return (
    
      <div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-listings" element={< ViewAllListings/>} />
        <Route path="/listing/:listingId" element={<ViewDetails />} />
        </Routes>
      </div>
    
  );
}

export default App;
