import React, { useState, useEffect } from 'react';

const taglines = [
  "Conquer the Peaks",
  "Ride the Roof of the World",
  "Experience Breathtaking Journeys",
  "Unforgettable Mountain Adventures"
];

export default function Header() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
        setFadeIn(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative py-8 overflow-hidden text-white h-screen bg-gradient-to-b from-red-900 via-gray-900 to-black flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 animate-pulse">
          Himalayan Motorcycle Adventures
        </h1>
        <p 
          className={`text-lg md:text-xl lg:text-2xl italic mb-8 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        >
          {taglines[taglineIndex]}
        </p>
        <div className="mt-8">
          <button className="bg-red-700 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-red-600 transition-colors duration-300">
            Start Your Journey
          </button>
        </div>
      </div>
    </header>
  );
}