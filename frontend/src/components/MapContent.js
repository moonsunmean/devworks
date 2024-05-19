/*global kakao*/
import React, { useEffect, useState } from 'react';
import useGeolocation from 'react-hook-geolocation';
import '../styles/analysis.css';
import axios from "axios";

function MapContent() {
  // 현재 좌표를 받아옴
  const geolocation = useGeolocation();
  const [healthCenters, setHealthCenters] = useState([]);
  const [phone, setPhone] = useState("위치 클릭 시 확인이 가능합니다.");
  const [positionName, setPositionName] =  useState(null);
  const [realAddress, setRealAddress] = useState("위치 클릭 시 확인이 가능합니다.");
  const [counselor, setCounselor] = useState("위치 클릭 시 확인이 가능합니다.");
   useEffect(() => {
          // API 호출로 데이터 가져오기
          const fetchHealthCenters = async () => {
              try {
                  const response = await axios.get(`/analysis`);
                  setHealthCenters(response.data);
              } catch (error) {
                  console.error("Error fetching health centers:", error);
              }
          };

          fetchHealthCenters();
      }, []);


  useEffect(() => {
    // 지도가 로드될 컨테이너
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(geolocation.latitude, geolocation.longitude), // 초기 중심 좌표 설정
      level: 7, // 레벨(API 깊이)
    };

    const map = new kakao.maps.Map(container, options);

    // 현재 위치 마커
    const coords = new kakao.maps.LatLng(geolocation.latitude, geolocation.longitude);
    // add new marker image
    var imageSrc = 'https://firebasestorage.googleapis.com/v0/b/nomo-62b92.appspot.com/o/free-icon-location-7009867.png?alt=media&token=c9a90685-39de-4778-9083-cc618769861e', // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기
        imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션( 마커의 좌표와 일치시킬 이미지 안에서의 좌표)

    // 새로운 이미지 마커
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    const myMarker = new kakao.maps.Marker({
          map: map,
          position: coords,
          image: markerImage // 마커이미지 설정
    });

    // 지오코드 서비스를 이용하여 좌표 -> 주소 변환
    const geocoder = new kakao.maps.services.Geocoder();

    // 금연지원서비스를 제공하는 장소이름 -> 좌표 -> 주소 이름
    var ps = new kakao.maps.services.Places();
    function createPlacesSearchCB(counselorCount) {
      return function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          var bounds = new kakao.maps.LatLngBounds();// 좌표
          displayMarker(data[0], counselorCount);  // 마커 찍기
          bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
          // 검색된 장소 위치를 기준 지도 범위를 재설정
          // map.setBounds(bounds);
        }
      };
    }

    function displayMarker(place, counselorCount) {

      var infowindow = new kakao.maps.InfoWindow({zIndex:1});
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });

      kakao.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.setContent(`<div style="width:250px;text-align:center;padding:5px;font-size:10px;">${place.place_name} - 상담원 수: ${counselorCount}</div>`);
        infowindow.open(map, marker);
      });

      kakao.maps.event.addListener(marker, 'mouseout', function() {
        infowindow.close();
      });

      kakao.maps.event.addListener(marker, 'click', function() {
        place.phone ? setPhone(place.phone) : setPhone("전화번호 정보 없음");
        place.address_name ? setRealAddress(place.address_name) : setRealAddress("위치 정보 없음");
        setCounselor(counselorCount+ "명");
        setPositionName("("+place.place_name+")");

      });
    }

    // In useEffect where you set up keywordSearch
    for (var i=0; i<healthCenters.length; i++) {
      const myPlace = ps.keywordSearch(healthCenters[i].name, createPlacesSearchCB(healthCenters[i].counselorCount));
    }
    // 현위치
    geocoder.coord2Address(geolocation.longitude, geolocation.latitude, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const addressName = result[0].address.address_name;
        console.log(result[0].address);
        if (!addressName) {
          return <div>Loading...</div>;
        }
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:200px;text-align:center;padding:6px 0;font-size:10px;"><strong>내 위치</strong> : ${addressName}</div>`,
        });
        infowindow.open(map, myMarker);

        // 마커에 마우스 이벤트
        kakao.maps.event.addListener(myMarker, 'mouseover', () => infowindow.open(map, myMarker));
        kakao.maps.event.addListener(myMarker, 'mouseout', () => infowindow.close());
      }
    });

    // 지도 중심 설정 -> 현위치 값으로
    map.setCenter(coords);
  }, [geolocation]);

  return (
  <>
    <div
      id="map"
      style={{
        width: '550px',
        height: '400px',
      }}
    ></div>
    <br />
    <div style ={{ color:"white"}}>
      <div><strong>주소 : </strong> {realAddress} {positionName}</div>
      <div><strong>전화번호 :</strong> {phone} </div>
      <div><strong>상담원 수 :</strong> {counselor} </div>
    </div>
    </>
  );
}

export default MapContent;
