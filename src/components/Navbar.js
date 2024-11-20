import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBars, FaTimes ,FaEnvelope} from 'react-icons/fa'; 


const Navbar = () => {
  
  

  

  
  return (
    <nav className="bg-white p-1 flex justify-between items-center z-50 relative border-t-1 border-b border-gray-300 shadow-sm">
  {/* Logo */}
  <Link to="/" className="text-lg font-bold">
    <img src="https://res.cloudinary.com/dztz5ltuq/image/upload/v1732073953/Screenshot_2005_dlvoia.png" alt="Trust N Ride Logo" className="h-12 w-auto" />
  </Link>
  <Link to="/contact" className="flex items-center p-0 text-black text-lg hover:underline hover:text-blue-600 transition duration-300">
  <FaEnvelope className="mr-2 h-5 w-5" /> {/* Icon with spacing */}
  Contact Us
</Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-black">
        <Link to="/Buy Electronics" className="hover:text-gray-400">Buy Electronics</Link>
        <Link to="/Exchange Product" className="hover:text-gray-400">Exchange Product</Link>
        <Link to="/" className="hover:text-gray-400">Buy Home appliances</Link>

        
          <Link to="/login" className="hover:text-gray-400">Sign In/Register</Link>
         

              
            
          </div>
        
     
      {/* Mobile Menu Button */}
      <div className="md:hidden">
  

    <Link to="/login" className="text-black text-lg">Sign In</Link>

   
    
</div>


      
        
    </nav>
  );
};

export default Navbar;
