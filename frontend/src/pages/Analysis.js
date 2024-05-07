import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import '../styles/analysis.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from "moment";
import WeeklyReportChart from '../components/WeeklyReportChart';

const Analysis = () => {

  /*----------Calender Control*/
    // 캘린더 날짜관리 상태
    const [value, onChange] = useState(new Date());
    const [time, setTime] = useState();
    const [selectedDateTime, setSelectedDateTime] = useState([]);
    const [selectedTime, setSelectedTime] = useState();

    const [weekData, setWeekData] = useState(null);
    const id = 1;
     useEffect(() => {

           const fetchWeekData = async () => {
             try {
               console.log(id);
               const response = await axios.get(`/analysis/${id}`);
               console.log(response);
               const weekData = response.data;

               setWeekData(weekData);
               console.log(weekData);
             } catch (error) {
               console.error('주간분석 정보 가져오기 실패.', error);
             }

           };

           fetchWeekData();
     }, [id]);
    const sampleDiseaseData = [
      { disease: "심장병", risk: 52, info: "보통의 기준 보다 발병 확률 52%", imageUrl:"https://firebasestorage.googleapis.com/v0/b/nomo-62b92.appspot.com/o/heart.png?alt=media&token=070b14f4-ef5b-4d40-b0cd-f9b040fef297" },
      { disease: "폐암", risk: 52, info: "20대 흡연자 발병률", imageUrl:"https://firebasestorage.googleapis.com/v0/b/nomo-62b92.appspot.com/o/2.png?alt=media&token=ccc647a9-6d5a-47d0-8229-4a9fb1d7c7d1" },
      { disease: "식도염", risk: 52, info: "20대 흡연자 발병률",imageUrl:"https://firebasestorage.googleapis.com/v0/b/nomo-62b92.appspot.com/o/3.png?alt=media&token=dd23de6a-95d5-4835-84c6-43c53b810b56" },
      { disease: "후두염", risk: 52, info: "20대 흡연자 발병률",imageUrl:"https://firebasestorage.googleapis.com/v0/b/nomo-62b92.appspot.com/o/4.png?alt=media&token=f2c28e7d-1acf-4ad9-9a1a-b6f26cdc4374" }
    ];

  return (
    <div className="analysis-page">
        <div id="top_contents">
            <div className = "userinfo-area">
                <div id = "userinfo">
                    내 평균<br /> <h1>하루 00값</h1>
                    <img src="https://firebasestorage.googleapis.com/v0/b/nomo-62b92.appspot.com/o/siga.png?alt=media&token=39d3ec72-e13b-49b4-a043-822363c4e0c5" alt="담배 이미지"/>
                </div>
                <div id = "otherinfo">
                   <div id = "avginfo"> 평균 흡연자<br /><h2> 하루 00개비</h2></div>
                   <div id = "nomokeinfo"> Nomoke 사용자<br /><h2> 하루 00개비</h2></div>
                </div>
            </div>

            <div className="calender-area">
               <h3> <span id="highlight-red">흡연달력</span></h3>
               <br /><span id="highlight-red">No</span>Moke calendar
               <div><Calendar
                  value={value}
                  formatDay={(locale, date) => moment(date).format("DD")}>
               </Calendar></div>
            </div>
        </div>
        <span id = "center_title"><h2>발병확률＋</h2></span>
        <div id="center_contents">
          <div className="disease-cards-container">
              {sampleDiseaseData.map((data, index) => (
                  <div className="disease-card" key={index}>
                      <h4>{data.disease}</h4>
                      <img src={data.imageUrl} alt={`${data.disease} 이미지`} style={{ width: '100px', height: '100px' }} />
                      <p>발병 확률 {data.risk}%</p>
                      <p>{data.info}</p>
                  </div>
              ))}
          </div>
        </div>
        <div id="bottom_contents">
          주간분석 데이터<br />
          <div id = "chart-area">
            <WeeklyReportChart />
          </div>
          <img src="https://firebasestorage.googleapis.com/v0/b/nomo-62b92.appspot.com/o/%EC%B1%BB%E3%85%81.png?alt=media&token=39328b24-b3a0-4762-9947-20ef187c7c9a" alt="담배 이미지"/>
          00개비
          <br/><img src="https://firebasestorage.googleapis.com/v0/b/nomo-62b92.appspot.com/o/money.png?alt=media&token=c85da960-4f30-482c-b313-f2e08218bef1" alt="돈 이미지"/>
          00소비
          <br/><img src="https://firebasestorage.googleapis.com/v0/b/nomo-62b92.appspot.com/o/time.png?alt=media&token=a0ffc1dd-205b-46e2-9e87-bf4367e865d6" alt="담배 이미지"/>
           0시간 0분0초 생명감소
        </div>
    </div>
  );
};

export default Analysis;