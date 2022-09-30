import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

// import pages
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';

const App = () => {
  return (
    <div className='w-full mx-auto bg-white'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/property/:id' element={<PropertyDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;