// data/mockRoutes.js
// 공원 경로 데이터 목록

const mockRoutes = [
    {
      id: 1,
      name: '서울숲 공원',
      description: '서울 성동구에 위치한 도시 숲 공원입니다.',
      distance: 3.5,
      duration: 60,
      difficulty: '쉬움',
      attractions: ['생태숲', '꽃사과나무길', '습지생태원'],
      coordinates: [
        { lat: 37.5446, lng: 127.0379 },
        { lat: 37.5469, lng: 127.0409 },
        { lat: 37.5485, lng: 127.0421 },
        { lat: 37.5472, lng: 127.0456 }
      ]
    },
    {
      id: 2,
      name: '한강공원 여의도',
      description: '여의도에 위치한 한강변 공원입니다.',
      distance: 5.0,
      duration: 90,
      difficulty: '중간',
      attractions: ['여의도 벚꽃길', '물빛광장', '샛강생태공원'],
      coordinates: [
        { lat: 37.5266, lng: 126.9340 },
        { lat: 37.5285, lng: 126.9312 },
        { lat: 37.5308, lng: 126.9278 },
        { lat: 37.5321, lng: 126.9246 }
      ]
    },
    {
      id: 3,
      name: '올림픽공원',
      description: '서울 송파구에 위치한 대규모 공원입니다.',
      distance: 4.2,
      duration: 75,
      difficulty: '중간',
      attractions: ['평화의 문', '몽촌토성', '장미정원'],
      coordinates: [
        { lat: 37.5190, lng: 127.1212 },
        { lat: 37.5210, lng: 127.1240 },
        { lat: 37.5230, lng: 127.1265 },
        { lat: 37.5204, lng: 127.1280 }
      ]
    },
    {
      id: 4,
      name: '북한산국립공원',
      description: '서울 북부에 위치한 국립공원입니다.',
      distance: 8.0,
      duration: 180,
      difficulty: '어려움',
      attractions: ['백운대', '인수봉', '대동문'],
      coordinates: [
        { lat: 37.6588, lng: 126.9841 },
        { lat: 37.6614, lng: 126.9867 },
        { lat: 37.6639, lng: 126.9903 },
        { lat: 37.6621, lng: 126.9941 }
      ]
    },
    {
      id: 5,
      name: '낙산공원',
      description: '서울 성북구에 위치한 역사적인 공원입니다.',
      distance: 2.5,
      duration: 45,
      difficulty: '쉬움',
      attractions: ['낙산 성곽길', '전망대', '이화마을'],
      coordinates: [
        { lat: 37.5811, lng: 127.0070 },
        { lat: 37.5824, lng: 127.0084 },
        { lat: 37.5839, lng: 127.0075 },
        { lat: 37.5826, lng: 127.0063 }
      ]
    }
  ];
  
  export default mockRoutes;