import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Map, Users, ShieldCheck, Thermometer, Droplet, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import bik1 from '../assets/training-cover-image.avif';
import bik2 from '../assets/oneride-2024-thumb.avif';
import bik3 from '../assets/uncover-north-east-main-2.jpg';
import bik4 from '../assets/1366x625.avif';
import Header from './Header';

const rides = [
  {
    title: 'Himalayan Adventure Everest Base Camp 2024',
    date: '29th Sept - 09th Oct 2024',
    status: 'RIDE CANCELLED',
    image: bik1,
    duration: '10 Days',
    description: 'Experience the breathtaking beauty of Everest Base Camp on this unforgettable journey.',
    difficulty: 'Challenging',
    groupSize: '8-12 riders',
  },
  {
    title: 'Himalayan Odyssey 2024',
    date: '03rd Aug - 20th Aug 2024',
    image: bik4,
    duration: '18 Days',
    description: 'Embark on an epic adventure through the majestic Himalayan landscapes.',
    difficulty: 'Moderate',
    groupSize: '10-15 riders',
  },
  {
    title: 'Himalayan Adventure Changthang 2024',
    date: '31st Aug - 8th Sep 2024',
    image: bik2,
    duration: '08 Days',
    description: 'Discover the hidden gems of Changthang on this thrilling motorcycle expedition.',
    difficulty: 'Moderate to Challenging',
    groupSize: '6-10 riders',
  },
  {
    title: 'Moto Himalaya Zanskar 2024',
    date: '10th Aug - 18th Aug 2024',
    image: bik3,
    duration: '08 Days',
    description: 'Ride through the stunning Zanskar Valley on this adrenaline-pumping journey.',
    difficulty: 'Challenging',
    groupSize: '8-12 riders',
  },
];



  const routes = {
    'Manali-Leh Highway': {
      distance: '490 km',
      duration: '5-7 days',
      difficulty: 'Challenging',
      highlights: ['Rohtang Pass', 'Baralacha La', 'Gata Loops', 'Moore Plains'],
    },
    'Spiti Circuit': {
      distance: '650 km',
      duration: '7-10 days',
      difficulty: 'Moderate to Challenging',
      highlights: ['Kunzum Pass', 'Key Monastery', 'Chandratal Lake', 'Kaza'],
    },
    'Northeast Explorer': {
      distance: '1500 km',
      duration: '14-18 days',
      difficulty: 'Challenging',
      highlights: ['Darjeeling', 'Gangtok', 'Tawang', 'Kaziranga National Park'],
    },
    'Bhutan Thunder Dragon': {
      distance: '800 km',
      duration: '10-12 days',
      difficulty: 'Moderate',
      highlights: ['Paro', 'Thimphu', 'Punakha', 'Bumthang'],
    },
  };

  const skillLevels = ['beginner', 'intermediate', 'advanced', 'expert'];

  const generateRideRecommendations = () => {
    let recommendations = [];

    if (groupSize <= 4) {
      recommendations.push("Consider appointing a lead rider and a sweep rider.");
    } else {
      recommendations.push("For larger groups, use a buddy system and have multiple experienced riders.");
    }

    if (skillLevel === 'beginner' || skillLevel === 'intermediate') {
      recommendations.push("Plan for more frequent rest stops and allow extra time for challenging sections.");
    }

    if (selectedRoute === 'Manali-Leh Highway' || selectedRoute === 'Spiti Circuit') {
      recommendations.push("Acclimatization days are crucial. Plan at least one rest day for every 2-3 days of riding.");
    }

    if (groupSize > 8) {
      recommendations.push("Consider splitting into smaller sub-groups during the day, with designated meeting points.");
    }

    return recommendations;
  };

const bikeImages = [bik1, bik2, bik3];

const RidesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [customColor, setCustomColor] = useState('#FF0000');
  const [selectedUpgrades, setSelectedUpgrades] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [packingList, setPackingList] = useState([]);
  const [groupSize, setGroupSize] = useState(4);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [skillLevel, setSkillLevel] = useState('intermediate');

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const weatherInfo = {
    'January': { temp: '−2°C to 12°C', precipitation: 'Low', wind: 'Moderate' },
    'February': { temp: '0°C to 14°C', precipitation: 'Low', wind: 'Moderate' },
    'March': { temp: '4°C to 18°C', precipitation: 'Low', wind: 'High' },
    'April': { temp: '8°C to 22°C', precipitation: 'Moderate', wind: 'High' },
    'May': { temp: '12°C to 26°C', precipitation: 'Moderate', wind: 'Moderate' },
    'June': { temp: '16°C to 30°C', precipitation: 'High', wind: 'Low' },
    'July': { temp: '18°C to 32°C', precipitation: 'Very High', wind: 'Low' },
    'August': { temp: '18°C to 32°C', precipitation: 'Very High', wind: 'Low' },
    'September': { temp: '14°C to 28°C', precipitation: 'High', wind: 'Low' },
    'October': { temp: '8°C to 22°C', precipitation: 'Low', wind: 'Moderate' },
    'November': { temp: '2°C to 16°C', precipitation: 'Low', wind: 'Moderate' },
    'December': { temp: '−2°C to 12°C', precipitation: 'Low', wind: 'Moderate' }
  };

  const generatePackingList = (month) => {
    const baseList = [
      'Motorcycle gear (helmet, jacket, pants, boots, gloves)',
      'Base layers',
      'Waterproof jacket and pants',
      'First aid kit',
      'Toolkit',
      'Maps and GPS device',
      'Snacks and water bottles',
    ];

    const weather = weatherInfo[month];
    if (weather.temp.includes('−') || parseInt(weather.temp) < 10) {
      baseList.push('Thermal underwear', 'Warm fleece', 'Winter gloves');
    }
    if (weather.precipitation === 'High' || weather.precipitation === 'Very High') {
      baseList.push('Extra waterproof gear', 'Quick-dry towels');
    }
    if (weather.wind === 'High') {
      baseList.push('Windproof layer', 'Neck gaiter');
    }

    setPackingList(baseList);
  };

  useEffect(() => {
    if (selectedMonth) {
      generatePackingList(selectedMonth);
    }
  }, [selectedMonth]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % rides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? rides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  };

  const handleUpgradeToggle = (upgrade) => {
    setSelectedUpgrades(prev => 
      prev.includes(upgrade)
        ? prev.filter(item => item !== upgrade)
        : [...prev, upgrade]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-8 mt-4">
        <section className="relative w-full mb-12 overflow-hidden rounded-lg shadow-2xl">
          <div className="aspect-w-16 aspect-h-9">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  <img
                    src={rides[currentSlide].image}
                    alt={rides[currentSlide].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h2 className="text-3xl text-white md:text-4xl font-bold mb-2">{rides[currentSlide].title}</h2>
                      <p className="text-lg text-white md:text-xl mb-4">{rides[currentSlide].description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                        <span className="flex items-center"><Calendar className="mr-2" /> {rides[currentSlide].date}</span>
                        <span className="flex items-center"><Clock className="mr-2" /> {rides[currentSlide].duration}</span>
                        <span className="flex items-center"><Map className="mr-2" /> {rides[currentSlide].difficulty}</span>
                        <span className="flex items-center"><Users className="mr-2" /> {rides[currentSlide].groupSize}</span>
                      </div>
                      {rides[currentSlide].status && (
                        <span className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          {rides[currentSlide].status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white rounded-full p-2 md:p-3 hover:bg-white/40 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white rounded-full p-2 md:p-3 hover:bg-white/40 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Adventure Motorcycles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bikeImages.map((src, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img src={src} alt={`Adventure Bike ${index + 1}`} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">Adventure Bike {index + 1}</h3>
                  <p className="text-gray-400">Conquer Himalayan terrain with ease</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Expert Guides', icon: Users },
              { title: 'Breathtaking Routes', icon: Map },
              { title: 'Safety First', icon: ShieldCheck }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <feature.icon className="w-12 h-12 mb-4 text-blue-500" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">Experience the Himalayas like never before with our {feature.title.toLowerCase()}.</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Bike Customization Workshop</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Personalize Your Adventure Bike</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-3">Choose Your Color</h4>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-12 h-12 rounded-full"
                  />
                  <span>Selected: {customColor}</span>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">Select Upgrades</h4>
                <div className="space-y-2">
                  {['Off-road Tires', 'Enhanced Suspension', 'Auxiliary Lights', 'Larger Fuel Tank'].map((upgrade) => (
                    <motion.button
                      key={upgrade}
                      className={`px-4 py-2 rounded-full ${
                        selectedUpgrades.includes(upgrade) ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleUpgradeToggle(upgrade)}
                    >
                      {upgrade}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-3">Your Customized Bike</h4>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p>Color: <span style={{color: customColor}}>{customColor}</span></p>
                <p>Upgrades: {selectedUpgrades.join(', ') || 'None selected'}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Ride Planner</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Plan Your Himalayan Adventure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-3">Select Your Ride Month</h4>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded-md"
                >
                  <option value="">Choose a month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              {selectedMonth && (
                <div>
                  <h4 className="text-xl font-semibold mb-3">Weather Information</h4>
                  <div className="space-y-2">
                    <p><Thermometer className="inline mr-2" /> Temperature: {weatherInfo[selectedMonth].temp}</p>
                    <p><Droplet className="inline mr-2" /> Precipitation: {weatherInfo[selectedMonth].precipitation}</p>
                    <p><Wind className="inline mr-2" /> Wind: {weatherInfo[selectedMonth].wind}</p>
                  </div>
                </div>
              )}
            </div>
            {selectedMonth && (
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-3">Suggested Packing List</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {packingList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Group Ride Planner</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Plan Your Epic Group Adventure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-3">Choose Your Route</h4>
                <select
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded-md"
                >
                  <option value="">Select a route</option>
                  {Object.keys(routes).map((route) => (
                    <option key={route} value={route}>{route}</option>
                  ))}
                </select>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">Group Size</h4>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="2"
                    max="20"
                    value={groupSize}
                    onChange={(e) => setGroupSize(parseInt(e.target.value))}
                    className="w-full mr-4"
                  />
                  <span>{groupSize} riders</span>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">Skill Level</h4>
                <select
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded-md"
                >
                  {skillLevels.map((level) => (
                    <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {selectedRoute && (
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-3">Route Information</h4>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="mb-2"><Route className="inline mr-2" /> Distance: {routes[selectedRoute].distance}</p>
                  <p className="mb-2"><Clock className="inline mr-2" /> Duration: {routes[selectedRoute].duration}</p>
                  <p className="mb-2"><Star className="inline mr-2" /> Difficulty: {routes[selectedRoute].difficulty}</p>
                  <p className="mb-2"><Mountain className="inline mr-2" /> Highlights: {routes[selectedRoute].highlights.join(', ')}</p>
                </div>
              </div>
            )}

            {selectedRoute && (
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-3">Group Ride Recommendations</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {generateRideRecommendations().map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 mt-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400">&copy; 2024 Himalayan Motorcycle Adventures. All rights reserved.</p>
          <div className="flex justify-center mt-4 space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RidesCarousel;