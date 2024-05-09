/*global kakao*/
import React, { useEffect } from 'react';
import useGeolocation from 'react-hook-geolocation';
import '../styles/analysis.css';

function MapContent() {
  // 현재 좌표를 받아옴
  const geolocation = useGeolocation();

  useEffect(() => {
    // 지도가 로드될 컨테이너를 설정
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(geolocation.latitude, geolocation.longitude), // 초기 중심 좌표 설정
      level: 3, // 레벨
    };

    const map = new kakao.maps.Map(container, options);

    // 현재 위치 마커
    const coords = new kakao.maps.LatLng(geolocation.latitude, geolocation.longitude);
    const marker = new kakao.maps.Marker({
      map: map,
      position: coords,
    });

    // 지오코드 서비스를 이용하여 좌표 -> 주소 변환
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(geolocation.longitude, geolocation.latitude, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const addressName = result[0].address.address_name;
        console.log(result[0].address);
         if (!addressName) {
                 return <div>Loading...</div>;
         }
        // 인포윈도우에 표시할 주소 내용
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:200px;text-align:center;padding:6px 0;font-size:10px;">${addressName}</div>`,
        });
        infowindow.open(map, marker);

        // 마커에 마우스 이벤트를 추가
        kakao.maps.event.addListener(marker, 'mouseover', () => infowindow.open(map, marker));
        kakao.maps.event.addListener(marker, 'mouseout', () => infowindow.close());
      }
    });

    // 지도 중심 설정
    map.setCenter(coords);
  }, [geolocation]);

  return (
    <div
      id="map"
      style={{
        width: '550px',
        height: '400px',
      }}
    ></div>
  );
}

export default MapContent;
