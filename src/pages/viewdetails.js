

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
const ViewDetails = () => {
    const { listingId } = useParams();
    const [listing, setListing] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [tireImages, setTireImages] = useState([]); // Array to hold tire images
    const [currentTireIndex, setCurrentTireIndex] = useState(0); // Track current tire index
    const [isTireImage, setIsTireImage] = useState(false); // Track if the image is a tire image
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(`https://trustnride-backend-production.up.railway.app/api/listings/assgnfind/${listingId}`);
                setListing(response.data);
                console.log('m',listingId);
                console.log('l',listing);

                // Extract tire images from the listing data
                const extractedTireImages = Object.values(response.data.inspectionReport.exterior)
                    .map(item => item.image)
                    .filter(image => image); // Filter out any undefined images
                setTireImages(extractedTireImages); // Set tire images
            } catch (error) {
                console.error('Error fetching listing:', error);
            }
            finally {
                setIsLoading(false); // Stop spinner after fetching
              }
        };

        fetchListing();
    }, [listingId]);

    const openImageModal = (index, image, isTire = false) => {
        setSelectedImageIndex(index);
        setCurrentImage(image);
        if (isTire) {
            setCurrentTireIndex(index); // Set current tire index if it's a tire image
            setIsTireImage(true); // Mark it as a tire image
        } else {
            setCurrentTireIndex(0); // Reset tire index if it's a listing image
            setIsTireImage(false); // Mark it as a listing image
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const goToNextImage = () => {
        if (isTireImage) {
            setCurrentTireIndex((prevIndex) => (prevIndex === tireImages.length - 1 ? 0 : prevIndex + 1));
            setCurrentImage(tireImages[(currentTireIndex + 1) % tireImages.length]); // Update current image based on tire images
        } else {
            setSelectedImageIndex((prevIndex) => (prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1));
            setCurrentImage(listing.images[(selectedImageIndex + 1) % listing.images.length]); // Update current image based on listing images
        }
    };

    const goToPrevImage = () => {
        if (isTireImage) {
            setCurrentTireIndex((prevIndex) => (prevIndex === 0 ? tireImages.length - 1 : prevIndex - 1));
            setCurrentImage(tireImages[(currentTireIndex - 1 + tireImages.length) % tireImages.length]); // Update current image based on tire images
        } else {
            setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1));
            setCurrentImage(listing.images[(selectedImageIndex - 1 + listing.images.length) % listing.images.length]); // Update current image based on listing images
        }
    };
    

    // Loop through the keys of the Specification object
    // Arrays to hold keys and values
    let specKeysArray = [];
let specValuesArray = [];

// Check if listing and listing.Specification are defined
if (listing && listing.Specification) {
  // Loop through listing.Specification to populate both arrays
  for (const key in listing.Specification) {
    if (listing.Specification.hasOwnProperty(key)) {
      specKeysArray.push(key);               // Push key to specKeysArray
      specValuesArray.push(listing.Specification[key]);  // Push corresponding value to specValuesArray
    }
  }

  // Output the arrays
  console.log("Keys Array:", specKeysArray);
  console.log("Values Array:", specValuesArray);

  // Example: Accessing the first key and its corresponding value
  console.log("First Key:", specKeysArray[0]);
  console.log("First Value:", specValuesArray[0]);
} else {
  console.log("Specification is not available or is null.");
}



    return (
        <div>
          <Navbar />
          <div className="container mx-auto px-4 py-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-screen bg-white">
                {/* Spinner Container */}
                <div className="relative w-28 h-28">
                  {/* Outer Circle with Gradient */}
                  <div className="absolute w-full h-full border-4 border-t-transparent border-b-transparent border-l-blue-500 border-r-blue-300 rounded-full animate-spin"></div>
    
                  {/* Inner Circle */}
                  <div className="absolute top-2 left-2 w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center">
                    {/* Logo with Flip Animation */}
                    <img
                      src="https://res.cloudinary.com/dztz5ltuq/image/upload/v1732073953/Screenshot_2005_dlvoia.png" // Replace with your car logo path
                      alt=" Logo"
                      className="w-12 h-12 animate-flip"
                    />
                  </div>
                </div>
    
                {/* Text Section */}
                <p className="mt-6 text-sm lg:text-md font-semibold text-gray-500">
                  <p className="mt-8 text-xl md:text-2xl font-bold text-gray-800 text-center">
                    Wait is Over We're Bringing {' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                      your Product....
                    </span>
                  </p>
                  
                </p>
              </div>
            ) : (
              listing && (
                <>
                  {/* Image Carousel */}
                  <div className="rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200">
                    {/* Image Swiper Section */}
                    <div className="rounded-t-lg overflow-hidden">
                      <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                      >
                        {listing.images.map((image, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={image}
                              alt={`Image ${index + 1}`}
                              className="w-full h-96 lg:w-full lg:h-[93vh] object-cover cursor-pointer"
                              onClick={() => openImageModal(index, image)} // Pass image to the modal function
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
    
                    {/* Text Content Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800">{listing.title}</h3>
                      <p className="mt-2 text-sm text-gray-600 truncate">{listing.description}</p>
    
                      {/* Overview: Fuel Type, KM, and RTO */}
                      <div className="flex justify-between items-center mt-4 space-x-1">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm">
                          Fuel: {listing.Specification.ModelID}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm">
                          KM: {listing.Category}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg text-sm">
                          RTO Code: {listing.Specification.Type}
                        </span>
                      </div>
                      
                      {/* Price and Fair Market Value */}
                      <div className="mt-6 space-y-4">
                        {/* Fair Market Value Section */}
                        <div className="relative rounded-lg overflow-hidden bg-gray-100 p-1">
                          <div className="absolute inset-y-0 left-0 w-1/2 bg-green-100"></div> {/* Half-covered box */}
                          <div className="relative flex justify-between items-center">
                            <p className="text-sm text-gray-700">OfferPrice</p>
                            <p className="text-xl font-semibold">₹{listing.offerPrice}</p>
                          </div>
                        </div>
    
                        {/* Price Section */}
                        <div className="relative rounded-lg overflow-hidden bg-gray-100 p-1">
                          <div className="absolute inset-y-0 left-0 w-1/2 bg-blue-100"></div> {/* Half-covered box */}
                          <div className="relative flex justify-between items-center">
                            <p className="text-sm text-gray-700">MRP</p>
                            <p className="text-xl font-semibold">₹{listing.MRP}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
    
                  <div className="flex items-center justify-center  bg-white">
                    <div className="bg-white mt-4 rounded-lg mb-0">
                      <Link
                        to={{
                          pathname: '/Make a Deal',
                        }}
                        state={{
                          title: listing.title,
                          MRP: listing.MRP,
                          offerPrice: listing.offerprice,
                          Carid: listingId,
                        }}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 font-semibold text-lg"
                      >
                        Make a Deal
                      </Link>
                    </div>
                  </div>
                  
                  {/* Specification Section */}
                  <div className="mt-8 rounded-lg bg-white p-6 shadow-lg transition-transform transform hover:scale-105">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
                      Specification
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
                        <p className="font-semibold text-gray-700">
                          <strong>{specKeysArray[0]}:</strong>
                        </p>
                        <p className="text-gray-600">{specValuesArray[0]}</p>
                      </div>
                      <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
                        <p className="font-semibold text-gray-700">
                          <strong>{specKeysArray[1]}:</strong>
                        </p>
                        <p className="text-gray-600">{specValuesArray[1]}</p>
                      </div>
                      <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
                        <p className="font-semibold text-gray-700">
                          <strong>{specKeysArray[2]}:</strong>
                        </p>
                        <p className="text-gray-600">{specValuesArray[2]}</p>
                      </div>
                      <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
                        <p className="font-semibold text-gray-700">
                          <strong>{specKeysArray[3]}:</strong>
                        </p>
                        <p className="text-gray-600">{specValuesArray[3]}</p>
                      </div>
                      <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
                        <p className="font-semibold text-gray-700">
                          <strong>{specKeysArray[4]}:</strong>
                        </p>
                        <p className="text-gray-600">{specValuesArray[4]}</p>
                      </div>
                      <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
                        <p className="font-semibold text-gray-700">
                          <strong>{specKeysArray[5]}:</strong>
                        </p>
                        <p className="text-gray-600">{specValuesArray[5]}</p>
                      </div>
                      <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
                        <p className="font-semibold text-gray-700">
                          <strong>{specKeysArray[6]}:</strong>
                        </p>
                        <p className="text-gray-600">{specValuesArray[6]}</p>
                      </div>
                      <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
                        <p className="font-semibold text-gray-700">
                          <strong>{specKeysArray[6]}:</strong>
                        </p>
                        <p className="text-gray-600">{specValuesArray[6]}</p>
                      </div>
                    </div>
                  </div>
                 
   

<div className="mt-8 rounded-lg bg-white p-6 shadow-lg transition-transform transform hover:scale-105">
   <h4 className="text-2xl font-semibold text-gray-800 border-b-2 border-green-500 pb-2">Dimensions</h4>

   <div className="mt-4 space-y-4">
       <div className="flex justify-between bg-green-50 rounded-lg p-4 shadow-lg border-l-4 border-green-500 hover:bg-green-100 transition duration-300">
           <p className="font-semibold text-gray-800"><strong>Width:</strong></p>
           <p className="text-gray-600">{listing.Physical.Dimension.Width}</p>
       </div>
       <div className="flex justify-between bg-green-50 rounded-lg p-4 shadow-lg border-l-4 border-green-500 hover:bg-green-100 transition duration-300">
           <p className="font-semibold text-gray-800"><strong>Height:</strong></p>
           <p className="text-gray-600">{listing.Physical.Dimension.Height}</p>
       </div>
       <div className="flex justify-between bg-green-50 rounded-lg p-4 shadow-lg border-l-4 border-green-500 hover:bg-green-100 transition duration-300">
           <p className="font-semibold text-gray-800"><strong>Depth:</strong></p>
           <p className="text-gray-600">{listing.Physical.Dimension.Depth}</p>
       </div>
       <div className="flex justify-between bg-green-50 rounded-lg p-4 shadow-lg border-l-4 border-green-500 hover:bg-green-100 transition duration-300">
           <p className="font-semibold text-gray-800"><strong>Weight:</strong></p>
           <p className="text-gray-600">{listing.Physical.Dimension.Weight}</p>
       </div>
       <div className="flex justify-between bg-green-50 rounded-lg p-4 shadow-lg border-l-4 border-green-500 hover:bg-green-100 transition duration-300">
           <p className="font-semibold text-gray-800"><strong>Volume:</strong></p>
           <p className="text-gray-600">{listing.Physical.Dimension.Volume}</p>
       </div>
   </div>
</div>

                </>
              )
            )}
          </div>
        </div>
      );
};

export default ViewDetails;
