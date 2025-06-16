// App.js - 메인 애플리케이션 컴포넌트
import React, { useState, useCallback, useEffect } from 'react';
import Map from './components/Map';
import RouteForm from './components/RouteForm';
import RouteDisplay from './components/RouteDisplay';
import './App.css';

const App = () => {
  const [routeData, setRouteData] = useState(null);
  const [originPoint, setOriginPoint] = useState(null);
  const [destinationPoint, setDestinationPoint] = useState(null);
  const [greenPreference, setGreenPreference] = useState(0.5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoize the onRouteData function to prevent unnecessary re-renders
  const handleRouteData = useCallback((data) => {
    setRouteData(data);
  }, []);

  // Fetch route data when originPoint, destinationPoint, or greenPreference changes
  useEffect(() => {
    const fetchRoute = async () => {
      if (!originPoint || !destinationPoint) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch route logic here...
        handleRouteData({ distance: 0, duration: 0, greenScore: 0, pointsCount: 0 }); // Example data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [originPoint, destinationPoint, greenPreference]);

  const handleRouteSubmit = ({ origin, destination, greenPreference }) => {
    setOriginPoint(origin);
    setDestinationPoint(destination);
    setGreenPreference(greenPreference);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>서울 녹색 경로 찾기</h1>
        <p>서울의 아름다운 공원으로 가는 가장 녹색 경로를 찾으세요</p>
      </header>
      
      <main className="app-main">
        <div className="sidebar">
          <RouteForm onRouteSubmit={handleRouteSubmit} />
          
          {routeData && (
            <RouteDisplay 
              routeData={routeData}
              greenPreference={greenPreference}
            />
          )}
        </div>
        
        <div className="map-section">
          <Map 
            originPoint={originPoint}
            destinationPoint={destinationPoint}
            greenPreference={greenPreference}
            onRouteData={handleRouteData}
          />
        </div>
      </main>
      
      <footer className="app-footer">
        <p>서울 녹색 경로 찾기 &copy; 2025</p>
        <p>Leaflet과 Kakao Maps 사용</p>
      </footer>
    </div>
  );
};

export default App;