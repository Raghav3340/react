import React, { useState, useRef, useEffect } from 'react';
import bik1 from '../assets/1512x982.gif';  // First image
import bik2 from '../assets/oneride-2024-thumb.avif';

const Header = () => (
  <header className="p-4">
    <h1 className="text-4xl font-bold text-white">R!de</h1>
    <p className="text-base text-gray-400 mt-1">Rides exclusively curated and lead by RE.</p>
  </header>
);

const RideCard = ({ title, location, dateRange, imageSrc }) => (
    <div className="relative w-[90%] sm:w-[47%] mx-auto flex-shrink-0">
      <img
        className="object-cover h-[60vh] sm:h-[80vh] w-full rounded-sm"  // Increased height
        src={imageSrc}
        alt={title}
      />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
        <h2 className="text-lg sm:text-2xl font-bold text-white mb-1">{title}</h2>
        <p className="text-white text-xs flex items-center mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {location}
        </p>
        <p className="text-white text-xs flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {dateRange}
        </p>
      </div>
    </div>
  );
  

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const totalItems = items.length;

  // Calculate how many items to show based on screen width
  const itemsToShow = window.innerWidth < 640 ? 1 : 2;

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.style.transform = `translateX(-${currentIndex * (100 / itemsToShow)}%)`;
      carousel.style.transition = 'transform 0.5s ease-in-out';  // Increased transition duration
    }
  }, [currentIndex, itemsToShow]);


  return (
    <div className="relative overflow-hidden mt-4">
      <div ref={carouselRef} className="flex gap-2 sm:gap-4 px-2 sm:px-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`w-[100%] flex-shrink-0 transition-all duration-300`}
          >
            <RideCard {...item} />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-${index === currentIndex ? '6' : '4'} h-${index === currentIndex ? '2' : '1'} bg-${index === currentIndex ? 'white' : 'gray-400'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
     
    </div>
  );
};

const MobilePWALayout = () => {
  const rideItems = [
    {
      title: "Cosmic Caravan",
      location: "Rann Of Kutch",
      dateRange: "07 Aug - 14 Aug",
      imageSrc: bik1,  // First image
    },
    {
      title: "Mountain Adventure",
      location: "Himalayas",
      dateRange: "15 Sep - 22 Sep",
      imageSrc: bik2,  // Second different image
    },
    {
      title: "Coastal Cruise",
      location: "Goa",
      dateRange: "01 Oct - 07 Oct",
      imageSrc: bik1,  // Reuse first image or add another
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <Carousel items={rideItems} />
    </div>
  );
};

export default MobilePWALayout;
