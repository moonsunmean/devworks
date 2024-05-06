import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import React, { useEffect,useState } from 'react';
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

                내 평균<br />
                <h3>하루 00값</h3>
                <img src="https://firebasestorage.googleapis.com/v0/b/nomo-62b92.appspot.com/o/siga.png?alt=media&token=39d3ec72-e13b-49b4-a043-822363c4e0c5" alt="담배 이미지"/>

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
          질병통계 데이터
        </div>
        <div id="bottom_contents">
          주간분석 데이터
        </div>
    </div>
  );
};

export default Analysis;