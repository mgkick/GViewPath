// Map.js - 지도 컴포넌트 (단순화 버전)
import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { generateMockRoute } from '../utils/routeUtils';

// Kakao Maps 타일 레이어 URL
const KAKAO_MAP_URL = 'https://map{s}.daumcdn.net/map_2d/2212ejo/L{z}/{y}/{x}.png';

const Map = ({ originPoint, destinationPoint, greenPreference, onRouteData }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeLayerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 컴포넌트 마운트 시 지도 초기화
  useEffect(() => {
    if (!mapInstanceRef.current) {
      // 서울 좌표 (시청 중심)
      const seoul = [37.5665, 126.9780]; 
      
      // 지도 초기화
      const map = L.map(mapRef.current).setView(seoul, 13);
      
      // Kakao 지도 타일 레이어 추가
      L.tileLayer(KAKAO_MAP_URL, {
        subdomains: ['1', '2', '3', '4'],
        maxZoom: 19,
        attribution: '&copy; <a href="https://map.kakao.com">Kakao Maps</a>'
      }).addTo(map);
      
      // 나중에 사용할 수 있도록 지도 인스턴스 저장
      mapInstanceRef.current = map;
      
      // 경로 레이어 초기화
      routeLayerRef.current = L.layerGroup().addTo(map);
    }
    
    return () => {
      // 컴포넌트 언마운트 시 정리
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 출발점과 도착점이 변경될 때 경로 가져오기 및 표시
  useEffect(() => {
    const fetchRoute = async () => {
      if (!originPoint || !destinationPoint) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // 이전 경로 지우기
        if (routeLayerRef.current) {
          routeLayerRef.current.clearLayers();
        }
        
        // 가짜 경로 생성 (실제 백엔드 API 호출 대신)
        const { route, greenScore, distance, duration } = generateMockRoute(
          originPoint, 
          destinationPoint, 
          greenPreference
        );
        
        // 경로 데이터를 부모 컴포넌트로 전달
        onRouteData({
          distance,
          duration,
          greenScore,
          pointsCount: route.length
        });
        
        // 지도에 경로 그리기
        if (route && route.length > 0) {
          // 경로 점들을 LatLng 배열로 변환
          const routeCoordinates = route.map(point => [point.lat, point.lng]);
          
          // 경로 폴리라인 생성 및 스타일링
          const routeLine = L.polyline(routeCoordinates, {
            color: '#3388ff',
            weight: 5,
            opacity: 0.7
          }).addTo(routeLayerRef.current);
          
          // 출발지와 목적지에 마커 추가
          const originMarker = L.marker(originPoint, {
            title: '출발',
            icon: L.divIcon({
              className: 'origin-marker',
              html: '<div style="background-color: green; width: 15px; height: 15px; border-radius: 50%;"></div>',
              iconSize: [15, 15]
            })
          }).addTo(routeLayerRef.current);
          
          const destMarker = L.marker(destinationPoint, {
            title: '도착',
            icon: L.divIcon({
              className: 'destination-marker',
              html: '<div style="background-color: red; width: 15px; height: 15px; border-radius: 50%;"></div>',
              iconSize: [15, 15]
            })
          }).addTo(routeLayerRef.current);
          
          // 경로를 따라 녹색 점수 표시기 추가
          route.forEach((point, index) => {
            if (index % 10 === 0 && point.greenScore) { // 너무 많은 마커를 추가하지 않도록 10점마다 표시
              const markerColor = getColorFromScore(point.greenScore);
              L.circleMarker([point.lat, point.lng], {
                radius: 5,
                color: markerColor,
                fillColor: markerColor,
                fillOpacity: 0.8
              }).addTo(routeLayerRef.current);
            }
          });
          
          // 지도를 경로 전체를 볼 수 있도록 조정
          mapInstanceRef.current.fitBounds(routeLine.getBounds(), {
            padding: [50, 50]
          });
        }
      } catch (err) {
        console.error('경로 가져오기 오류:', err);
        setError('경로를 가져오지 못했습니다. 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoute();
  }, [originPoint, destinationPoint, greenPreference, onRouteData]);

  // 녹색 점수에 기반한 색상을 얻는 도우미 함수
  const getColorFromScore = (score) => {
    // 점수는 0에서 1 사이이며, 1이 가장 녹색
    if (score > 0.8) return '#00b300'; // 매우 녹색
    if (score > 0.6) return '#66cc00'; // 상당히 녹색
    if (score > 0.4) return '#cccc00'; // 중간
    if (score > 0.2) return '#cc6600'; // 낮은 녹색
    return '#cc0000'; // 매우 낮은 녹색
  };

  return (
    <div className="map-container">
      <div ref={mapRef} style={{ height: '600px', width: '100%' }} />
      {loading && <div className="map-loading">경로 로딩 중...</div>}
      {error && <div className="map-error">{error}</div>}
    </div>
  );
};

export default Map;