// MotivationSection.js
import React from 'react';
import { Link } from 'react-router-dom';
const MotivationSection = () => {
    const cards = [
        {
            image: "https://res.cloudinary.com/dztz5ltuq/image/upload/v1732074517/istockphoto-1440149713-612x612_gg1i0n.jpg",
            description: "Explore 1000+ High-Quality Products at Your Fingertips",
        },
        {
            image: "https://res.cloudinary.com/dztz5ltuq/image/upload/v1732074517/happy-cheerful-smiling-young-adult-man-doing-online-shopping-e-satisfied-entrepreneur-making-payment-paying-service-goods-155845536_ninrpj.webp",
            description: "Make Secure Payments with Ease and Confidence",
        },
        {
            image: "https://res.cloudinary.com/dztz5ltuq/image/upload/v1732074517/istockphoto-939051730-612x612_keeaji.jpg",
            description: "Enjoy Fast, Reliable Delivery to Your Doorstep",
        },
    ];

    return (
        <div className="p-7 border-b border-gray-300">
            {/* Border Above Section */}
            <div className="border-t border-gray-300 mb-6"></div>

            {/* Heading Section */}
            <div className="mb-6">
                <h2 className="text-3xl font-extrabold text-gray-800 text-center tracking-wide">
                DON’T MISS OUT, SHOP TODAY!
                </h2>
                {/* Underline below Heading */}
                <div className="border-b-2 border-blue-500 w-24 mx-auto mt-2"></div>
            </div>

            {/* Card Section */}
            <div className="overflow-hidden">
                <div className="flex gap-6 overflow-x-scroll snap-x sm:overflow-visible sm:grid sm:grid-cols-3">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-4/5 sm:w-auto bg-white rounded-lg shadow-lg border border-gray-100 transition-transform duration-300 hover:scale-105 snap-center"
                        >
                            <img
                                src={card.image}
                                alt={`Card ${index + 1}`}
                                className="w-full h-52 object-cover rounded-t-lg"
                            />
                            <div className="p-6 space-y-2">
                                <p className="text-lg font-medium text-gray-800">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sell Your Car Button */}
            <div className="flex justify-center mt-3 mb-1">
            <Link to="/all-listings">
    <button className="bg-white text-blue-600 px-5 py-3 rounded-full shadow-md border border-blue-600 hover:bg-blue-50 transition-transform duration-200 hover:scale-105">
        Order NOw
    </button>
</Link>
            </div>
        </div>
    );
};

export default MotivationSection;
