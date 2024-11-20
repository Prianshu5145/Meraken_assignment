import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  // Image arrays for mobile and laptop views
  const mobileImages = [
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1732099734/Gemini_Generated_Image_lzbupolzbupolzbu_x1mdpf.jpg',
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1732099734/Gemini_Generated_Image_xaxqbwxaxqbwxaxq_fbw0au.jpg',
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1732099735/Gemini_Generated_Image_kfq7lnkfq7lnkfq7_j8nsfr.jpg',
    
  ];

  const laptopImages = [
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1732098563/freepik__dont-write-any-word-or-letter-in-empty-space-while__82509_hwxdnq.png',
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1732098563/freepik__dont-write-any-word-or-letter-in-empty-space-while__82508_qsuyzw.png',
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1732098564/freepik__expand__31544_tiicue.png',
   
   
    
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Automatically change the image every 1.7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (isMobile ? mobileImages.length : laptopImages.length));
    }, 1700);

    return () => clearInterval(interval);
  }, [isMobile, mobileImages.length, laptopImages.length]);

  // Detect if the screen size changes to switch between mobile and laptop images
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentImage = isMobile ? mobileImages[currentImageIndex] : laptopImages[currentImageIndex];

  return (
    <div className="relative w-full h-84 lg:h-[92vh] lg:w-full overflow-hidden rounded-sm">
      {/* Image slider */}
      <img
        src={currentImage}
        alt="Slideshow"
        className="w-full h-full object-cover transition-all duration-450 ease-in-out"
      />

      {/* Pagination indicators */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-2">
        {(isMobile ? mobileImages : laptopImages).map((_, index) => (
          <span
            key={index}
            className={`w-1 h-1 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
