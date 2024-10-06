import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import RidesCarousel from './components/RidesCarousel';
import { lazy, Suspense, useEffect, useState } from 'react';
import Loading from './components/Loading';

const RidesPage = lazy(() => import('./components/RidesCarousel'));

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <Loading />
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/rides" element={<RidesCarousel />} />
          </Routes>
        </Suspense>
      )}

    </Router>
  );
};

export default App;
