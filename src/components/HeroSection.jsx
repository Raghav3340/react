import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Calendar, Users, Settings, MapPin, Clock } from 'lucide-react';
import logo from '../assets/RE-Logo.avif';
import backgroundGif from '../assets/1512x982.gif';

const SinglePageLayout = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: '#ART of MOTORCYCLING',
      subtitle: 'Y3K - THE FUTURE IS YOUR CANVAS',
    },
    {
      title: 'RIDE THE FUTURE',
      subtitle: 'EXPERIENCE NEXT-GEN MOTORCYCLES',
    },
    {
      title: 'CUSTOM BIKE SHOWCASE',
      subtitle: 'WITNESS EXTRAORDINARY DESIGNS',
    },
  ];

  const events = [
    { id: 1, title: 'Opening Ceremony', date: '2024-05-01', time: '10:00 AM', location: 'Main Stage' },
    { id: 2, title: 'Stunt Show', date: '2024-05-01', time: '2:00 PM', location: 'Performance Arena' },
    { id: 3, title: 'Custom Bike Showcase', date: '2024-05-02', time: '11:00 AM', location: 'Exhibition Hall' },
    { id: 4, title: 'Off-Road Adventure', date: '2024-05-02', time: '3:00 PM', location: 'Outdoor Track' },
    { id: 5, title: 'Motorcycle Tech Talk', date: '2024-05-03', time: '1:00 PM', location: 'Conference Room A' },
    { id: 6, title: 'Closing Party', date: '2024-05-03', time: '8:00 PM', location: 'Main Stage' },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-md">
        <div className="flex flex-col items-center py-8">
          <img src={logo} alt="Logo" className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-8 rounded-full bg-red-500" />
          <div className="w-full">
            <SidebarItem icon={Home} text="Home" />
            <SidebarItem icon={Calendar} text="2024 Theme" />
            <SidebarItem icon={Users} text="Jury" />
            <SidebarItem icon={Settings} text="T&C" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-red-500">AOM Y3K 2024</h1>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 md:px-6 py-2 rounded-full font-semibold transform hover:scale-105 transition-transform duration-200">
            Register Now
          </button>
        </nav>

        {/* Content wrapper */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero Section with GIF and Carousel */}
          <div className="relative h-[60vh] md:h-[calc(100vh-4rem)] overflow-hidden">
            {/* Background GIF */}
            <img
              src={backgroundGif}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>

            {/* Carousel Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{slides[currentSlide].title}</h2>
                <p className="text-lg md:text-2xl mb-4 md:mb-8">{slides[currentSlide].subtitle}</p>
                <button className="bg-red-500 hover:bg-red-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold text-lg transform hover:scale-105 transition-transform duration-200">
                  Learn More
                </button>
              </div>
            </div>

            {/* Navigation arrows */}
            <button onClick={prevSlide} className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-black p-2 md:p-3 rounded-full hover:bg-opacity-30 transition-all duration-200">
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-black p-2 md:p-3 rounded-full hover:bg-opacity-30 transition-all duration-200">
              <ChevronRight size={20} className="text-white" />
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-red-500 w-4 md:w-6' : 'bg-white bg-opacity-50'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                ></button>
              ))}
            </div>
          </div>

          {/* Scrollable Events Section */}
          <div className="p-4 md:p-6 bg-black">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-red-500">Event Schedule</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-[#3E2828] rounded-lg shadow-md p-4 md:p-6 transform hover:scale-105 transition-transform duration-200">
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-red-400">{event.title}</h3>
                  <div className="flex items-center text-gray-300 mb-1 md:mb-2">
                    <Calendar className="mr-2" size={14} md:size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-300 mb-1 md:mb-2">
                    <Clock className="mr-2" size={14} md:size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="mr-2" size={14} md:size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, text }) => (
  <div className="flex items-center py-2 px-4 md:py-3 md:px-6 hover:bg-gray-100 cursor-pointer transition-colors duration-200">
    <Icon className="mr-2 md:mr-4 text-red-500" size={20} md:size={24} />
    <span className="text-gray-900 text-sm md:text-base font-semibold">{text}</span>
  </div>
);

export default SinglePageLayout;
