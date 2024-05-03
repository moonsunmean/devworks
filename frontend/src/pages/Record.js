import React, {useEffect, useState} from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import moment from "moment/moment";
import Calendar from "react-calendar";

function RecordPage() {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState();
    const [selectedDateTime, setSelectedDateTime] = useState([]);
    const [selectedTime, setSelectedTime] = useState();
    const [amount, setAmount] = useState("");
    const [selectedDayAmount, setSelectedDayAmount] = useState(null);
    // 저장 버튼 클릭 시 호출되는 함수

    const fetchSmokingRecord = (date) => {
        // Assuming your API endpoint is /api/record/:date
        fetch(`/api/record/${moment(date).format("YYYY-MM-DD")}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to fetch smoking record');
            })
            .then(data => {
                setSelectedDayAmount(data.amount);
            })
            .catch(error => {
                console.error("Failed to fetch smoking record:", error);
                setSelectedDayAmount(null);
            });
    };

    // Fetch smoking record when date changes
    useEffect(() => {
        fetchSmokingRecord(date);
    }, [date]);

    const handleSave = () => {
        // 입력값이 있을 경우에만 저장 요청
        if (amount) {
            fetch("/api/record", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ recordAmount: amount, recordDate: date }) // 입력값을 JSON 형태로 변환하여 전송
            })
                .then(response => {
                    if (response.ok) {
                        console.log(amount);
                        // 저장 후 어떤 작업을 수행할 수 있습니다.
                        setAmount("");
                        alert("저장되었습니다");
                    } else {
                        console.error("저장 실패!");
                        alert("숫자만 입력해 주세요!");
                    }
                })
                .catch(error => {
                    console.error("저장 요청 중 에러 발생:", error);
                });
        } else {
            alert("입력값이 없습니다.")
            console.log("입력값이 없습니다.");
        }
    };
    return (
        <>
            <div className="container py-4" style={{width: "1100px"}}>
                <div className="p-5 m-4 rounded-3" style={{background: "#5e5e5e", height: "400px"}}>
                    <div className="container-fluid py-5">
                        <h2 className="display-5 fw-bold text-white">오늘 나의 흡연량은?</h2>
                        <label className="text-white" htmlFor="date">날짜를 선택하세요:
                            <input type="date"
                                   id="date"
                                   value={moment(date).format("YYYY-MM-DD")} // Bind value to selected date
                                   onChange={(e) => setDate(new Date(e.target.value))}/>
                        </label>
                        <input
                            className="form-control form-control-lg my-4"
                            type="text"
                            placeholder="숫자만 입력해주세요"
                            aria-label=".form-control-lg example"
                            value={amount} // 입력값과 상태를 바인딩
                            onChange={(e) => setAmount(e.target.value)} // 입력값이 변경될 때마다 상태 업데이트
                        />
                        <button
                            className="btn btn-danger btn-lg float-end"
                            type="button"
                            onClick={handleSave} // 저장 버튼 클릭 시 handleSave 함수 호출
                        >
                            저장
                        </button>
                    </div>
                </div>
            </div>
            <div className="container py-4" style={{width: "1100px"}}>
                <div className="p-5 m-4 rounded-3" style={{background: "#5e5e5e"}}>
                    <div className="container-fluid py-5">
                        <h2 className="display-5 fw-bold text-white">이번달 흡연량</h2>
                        <br/>
                        <div className="row">
                            <Calendar className="col-6"
                                      value={date}
                                      onChange={setDate}
                                      formatDay={(locale, date) => moment(date).format("DD")}>
                            </Calendar>
                            <div className="col-6">
                                <h3>흡연량: {selectedDayAmount !== null ? selectedDayAmount : "데이터 없음"}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


function Record() {
    return (
        <div style={{background: "#2d2d2d"}}>
            <Header/>
            <RecordPage/>
            <Footer/>
        </div>
    );
}

export default Record;