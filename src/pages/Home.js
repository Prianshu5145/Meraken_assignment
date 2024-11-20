import React from 'react';
import ImageSlider from '../components/ImageSlider'; // Adjust path based on your folder structure
import Navbar from '../components/Navbar'
import ButtonGrid from '../components/ButtonGrid';
import Listings from '../pages/Listings';

import MotivationSection from '../components/promotionposter';
import ProductFilter from '../components/ProductFilter';
import Footer from '../components/footer'
const Home = () => {
  return (
    <div>
      <Navbar/>

      {/* Image Slider below N/avbar */}
      <ImageSlider />
      <ProductFilter/>
      <Listings/>
      
      <MotivationSection/>
      
      <Footer/>
      {/* Other content of home page */}
    </div>
  );
};

export default Home;
