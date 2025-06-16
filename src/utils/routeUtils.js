// 경로 계산을 위한 유틸리티 함수

// 두 지점 간의 직선 거리 계산 (하버사인 공식)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // 지구 반경 (미터)
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
  
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
  };
  
  // 중간점 계산
  const calculateMidpoint = (lat1, lon1, lat2, lon2, ratio) => {
    return {
      lat: lat1 + (lat2 - lat1) * ratio,
      lng: lon1 + (lon2 - lon1) * ratio
    };
  };
  
  // 경로의 중간에 약간의 랜덤성 추가
  const addRandomness = (point, amount) => {
    return {
      lat: point.lat + (Math.random() - 0.5) * amount,
      lng: point.lng + (Math.random() - 0.5) * amount
    };
  };
  
  // 모의 녹색 점수 생성
  const generateGreenScore = (lat, lng, baseScore) => {
    // 실제로는 사전 계산된 녹색 점수 데이터를 사용해야 하지만,
    // 이 예제에서는 위치에 따라 약간의 변화가 있는 무작위 점수를 생성합니다
    const latVariation = Math.sin(lat * 10) * 0.2;
    const lngVariation = Math.cos(lng * 10) * 0.2;
    
    let score = baseScore + latVariation + lngVariation;
    
    // 0과 1 사이로 제한
    score = Math.max(0, Math.min(1, score));
    
    return score;
  };
  
  // 가짜 경로 생성 함수
  export const generateMockRoute = (origin, destination, greenPreference) => {
    const [originLat, originLng] = origin;
    const [destLat, destLng] = destination;
    
    // 거리 계산
    const directDistance = calculateDistance(originLat, originLng, destLat, destLng);
    
    // 녹색 선호도에 따른 경로 복잡성 결정
    // 녹색 선호도가 높을수록 더 복잡한(직접적이지 않은) 경로
    const complexity = 1 + greenPreference * 2;
    
    // 모의 경로 거리 (녹색 선호도가 높을수록 더 긴 경로)
    const routeDistance = directDistance * (1 + greenPreference * 0.3);
    
    // 모의 소요 시간 (초) - 평균 보행 속도 5km/h로 가정
    const duration = (routeDistance / 1400) * 3600; // 1.4 m/s = 5 km/h
    
    // 포인트 수 결정 (거리에 비례)
    const pointsCount = Math.max(10, Math.round(routeDistance / 100));
    
    // 경로 생성
    const route = [];
    
    // 기본 녹색 점수 (녹색 선호도에 따라)
    const baseGreenScore = 0.3 + greenPreference * 0.5;
    
    // 경로 점들 생성
    for (let i = 0; i < pointsCount; i++) {
      const ratio = i / (pointsCount - 1);
      
      // 기본 중간점 계산
      const midpoint = calculateMidpoint(originLat, originLng, destLat, destLng, ratio);
      
      // 녹색 선호도에 따라 랜덤성 추가 (높을수록 더 많은 곡선)
      const randomnessAmount = 0.001 * complexity;
      const point = addRandomness(midpoint, randomnessAmount);
      
      // 해당 지점의 녹색 점수 생성
      const pointGreenScore = generateGreenScore(point.lat, point.lng, baseGreenScore);
      
      route.push({
        ...point,
        greenScore: pointGreenScore
      });
    }
    
    // 출발점과 도착점의 좌표 덮어쓰기 (정확한 시작점과 끝점 보장)
    route[0] = { lat: originLat, lng: originLng, greenScore: generateGreenScore(originLat, originLng, baseGreenScore) };
    route[route.length - 1] = { lat: destLat, lng: destLng, greenScore: generateGreenScore(destLat, destLng, baseGreenScore) };
    
    // 전체 경로의 녹색 점수 계산 (각 점의 평균)
    const avgGreenScore = route.reduce((sum, point) => sum + point.greenScore, 0) / route.length;
    
    return {
      route,
      distance: routeDistance,
      duration,
      greenScore: avgGreenScore
    };
  };
  
  // 실제 경로 서비스를 사용할 경우 여기에 추가 함수 구현