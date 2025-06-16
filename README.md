# 서울 녹색 경로 찾기 (Seoul Green Route Finder)

이 프로젝트는 서울의 공원으로 가는 녹색 경로를 찾아주는 웹 애플리케이션입니다. 사용자가 출발지와 목적지를 선택하면 녹지대가 많은 경로를 추천해줍니다.

## 주요 기능

- 출발지 선택 (주요 지하철역/랜드마크)
- 목적지 공원 선택
- 녹색 선호도 조절 (짧은 거리 vs 더 녹색 경로)
- 지도상에 경로 표시
- 경로 통계 정보 제공 (거리, 소요 시간, 녹색 점수)

## 기술 스택

- **프론트엔드**: React.js
- **지도 라이브러리**: Leaflet.js
- **지도 타일**: Kakao Maps

## 시작하기

### 필수 조건

- Node.js 14.0.0 이상
- npm 또는 yarn

### 설치

1. 저장소 클론
```bash
git clone https://github.com/mgkick/spark.git
cd spark
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm start
```

4. 브라우저에서 열기
```
http://localhost:3000
```

## 폴더 구조

```
seoul-green-routes-simple/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── data/
│       └── parks.json         # 서울 공원 데이터 (정적 파일)
├── src/
│   ├── components/
│   │   ├── Map.js            # 지도 컴포넌트
│   │   ├── RouteForm.js      # 경로 입력 폼
│   │   └── RouteDisplay.js   # 경로 정보 표시 컴포넌트
│   ├── data/
│   │   └── mockRoutes.js     # 미리 정의된 경로 데이터
│   ├── utils/
│   │   └── routeUtils.js     # 경로 계산 유틸리티
│   ├── App.js                # 메인 앱 컴포넌트
│   ├── App.css               # 스타일시트
│   └── index.js              # 진입점
└── package.json
```

## 프로젝트 구조 설명

- **components/**: React 컴포넌트들이 있는 폴더
  - **Map.js**: Leaflet.js를 사용한 지도 표시 및 경로 렌더링
  - **RouteForm.js**: 출발지와 목적지 입력 폼
  - **RouteDisplay.js**: 계산된 경로의 통계 정보 표시
  
- **utils/routeUtils.js**: 경로 계산 알고리즘 및 관련 함수

- **data/parks.json**: 서울시 주요 공원 정보가 담긴 정적 데이터

## MVP (Minimum Viable Product) 특징

이 버전은 MVP(최소 기능 제품)으로, 완전한 백엔드 서비스 없이 프론트엔드에서만 동작합니다:

1. 정적 데이터 사용 (실시간 API 호출 없음)
2. 간단한 경로 계산 알고리즘 (직선 경로에 약간의 변형 추가)
3. 모의 녹색 점수 생성

## 향후 개발 계획

- 실제 백엔드 API 연동
- Kakao Maps API를 사용한 실제 경로 검색
- 실제 녹색 점수 데이터 사용 (Green View Index)
- 사용자 위치 기반 출발지 설정 기능
- 모바일 최적화 개선