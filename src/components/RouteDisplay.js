// RouteDisplay.js - 경로 정보 표시 컴포넌트
import React from 'react';

const RouteDisplay = ({ routeData, greenPreference }) => {
  const { distance, duration, greenScore } = routeData;
  
  // 거리를 km 단위로 변환
  const distanceKm = (distance / 1000).toFixed(1);
  
  // 소요 시간을 분 단위로 변환
  const durationMin = Math.round(duration / 60);
  
  // 녹색 점수에 맞게 바 채우기 비율 계산
  const greenScorePercentage = Math.round(greenScore * 100);
  
  return (
    <div className="route-display">
      <h3>경로 정보</h3>
      
      <div className="route-stats">
        <div className="stat-card">
          <h4>총 거리</h4>
          <p>{distanceKm} km</p>
        </div>
        
        <div className="stat-card">
          <h4>예상 소요 시간</h4>
          <p>{durationMin} 분</p>
        </div>
        
        <div className="stat-card">
          <h4>녹색 점수</h4>
          <p>{greenScorePercentage}%</p>
          <div className="green-score-bar">
            <div 
              className="green-score-fill" 
              style={{ width: `${greenScorePercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="stat-card">
          <h4>현재 설정</h4>
          <p>녹색 선호도: {Math.round(greenPreference * 100)}%</p>
        </div>
      </div>
      
      <div className="route-tips">
        <h4>경로 팁</h4>
        <ul>
          <li>이 경로는 {greenScorePercentage}%의 녹색 환경을 지나갑니다.</li>
          <li>이 경로를 따라 걸으면 약 {Math.round(greenScore * 15)} 그루의 나무를 볼 수 있습니다.</li>
          <li>이 경로는 {greenScore > 0.6 ? '매우 쾌적한' : '보통의'} 도시 환경을 제공합니다.</li>
        </ul>
      </div>
    </div>
  );
};

export default RouteDisplay;