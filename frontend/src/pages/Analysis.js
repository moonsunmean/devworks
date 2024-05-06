import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import '../styles/analysis.css';
import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from "moment";

const Analysis = () => {

  /*----------Calender Control*/
    // 캘린더 날짜관리 상태
    const [value, onChange] = useState(new Date());
    const [time, setTime] = useState();
    const [selectedDateTime, setSelectedDateTime] = useState([]);
    const [selectedTime, setSelectedTime] = useState();



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
        <div id="center_contents">
          <div id = "center_title">발병확률＋</div>
        </div>
        <div id="bottom_contents">
          주간분석 데이터
        </div>
    </div>
  );
};

export default Analysis;