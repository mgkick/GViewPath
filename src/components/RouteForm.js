// RouteForm.js - 경로 입력 폼 컴포넌트 (단순화 버전)
import React, { useState, useEffect } from 'react';

const RouteForm = ({ onRouteSubmit }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [greenPreference, setGreenPreference] = useState(0.5);
  const [parksList, setParksList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 컴포넌트 마운트 시 공원 목록 가져오기 (정적 데이터)
  useEffect(() => {
    const fetchParks = async () => {
      try {
        setLoading(true);
        // 정적 JSON 파일에서 공원 데이터 로드
        const response = await fetch('/parks.json');
        const data = await response.json();
        setParksList(data);
      } catch (err) {
        console.error('공원 목록 가져오기 오류:', err);
        setError('공원 목록을 가져오지 못했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchParks();
  }, []);

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!origin || !destination) {
      setError('출발지와 목적지를 모두 선택해주세요');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // 선택된 공원 찾기
      const selectedPark = parksList.find(park => park.name === destination);
      
      // 출발지 좌표 (임시 하드코딩 - 실제로는 지오코딩 필요)
      const originCoords = originCoordinates[origin] || [37.5665, 126.9780]; // 기본값은 서울시청
      
      // 경로 요청을 부모 컴포넌트로 전달
      onRouteSubmit({
        origin: originCoords,
        destination: [selectedPark.lat, selectedPark.lng],
        greenPreference: greenPreference
      });
    } catch (err) {
      console.error('경로 요청 처리 오류:', err);
      setError('경로 요청을 처리하지 못했습니다');
    } finally {
      setLoading(false);
    }
  };

  // 미리 정의된 출발지 좌표 (실제 서비스에서는 지오코딩 API 사용)
  const originCoordinates = {
    '서울역': [37.5559, 126.9723],
    '강남역': [37.4980, 127.0276],
    '홍대입구역': [37.5568, 126.9227],
    '여의도': [37.5229, 126.9236],
    '광화문': [37.5724, 126.9765]
  };

  // 미리 정의된 출발지 옵션
  const originOptions = Object.keys(originCoordinates);

  return (
    <div className="route-form">
      <h2>녹색 경로 찾기</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="origin">출발지:</label>
          <select
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          >
            <option value="">출발지 선택</option>
            {originOptions.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="destination">목적지 공원:</label>
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          >
            <option value="">공원 선택</option>
            {parksList.map(park => (
              <option key={park.id} value={park.name}>
                {park.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="green-preference">
            녹색 선호도: {Math.round(greenPreference * 100)}%
          </label>
          <input
            type="range"
            id="green-preference"
            min="0"
            max="1"
            step="0.1"
            value={greenPreference}
            onChange={(e) => setGreenPreference(parseFloat(e.target.value))}
          />
          <div className="preference-labels">
            <span>짧은 거리</span>
            <span>더 녹색 경로</span>
          </div>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? '경로 찾는 중...' : '경로 찾기'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default RouteForm;