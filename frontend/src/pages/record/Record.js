import React, {useContext, useEffect, useState} from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import moment from "moment/moment";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import {Card, CardBody, CardHeader, Col, Container, Row} from "react-bootstrap";
import {UserContext} from "../../components/UserContext";
import Button from "react-bootstrap/Button";

function RecordPage() {
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState("");
    const [records, setRecords] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const { userId } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    // 저장 버튼 클릭 시 호출되는 함수

    useEffect(() => {
        // 페이지가 로드될 때 한 번만 실행되도록 설정
        axios.get(`/api/record/${userId}`)
            .then(response => {
                // 성공적으로 데이터를 받아오면 상태 업데이트
                setRecords(response.data);
            })
            .catch(error => {
                console.error("데이터를 가져오는 중 에러 발생:", error);
            });
    }, [userId]);
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const recordForDate = records.find(record => moment(record.recordDate).isSame(date, 'day'));
            if (recordForDate) {
                let redDotCount = Math.ceil(recordForDate.recordAmount / 20); // 흡연량에 따라 빨간 점 개수 결정
                if (redDotCount > 3) redDotCount = 3; // 최대 3개의 빨간 점만 허용
                const redDots = Array.from({ length: redDotCount }, (_, index) => (
                    <div key={index} style={{ backgroundColor: 'red', width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', marginRight: '2px' }}></div>
                ));
                return <div>{redDots}</div>;
            }
        }
    };

    const getRecordsForSelectedDate = () => {
        return records.filter(record => moment(record.recordDate).isSame(selectedDate, 'day'));
    };

    const handleSave = () => {
        // 입력값이 있을 경우에만 저장 요청
        if (amount) {
            axios.post("/api/record", {
                recordAmount: amount,
                recordDate: date,
                recordUserId: userId
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.status === 200) {
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
                    alert("저장 요청 중 에러 발생");
                });
        } else {
            alert("입력값이 없습니다.");
            console.log("입력값이 없습니다.");
        }
    };

    const handleEdit = () => {
        setIsEditing(true); // 수정 모드로 변경
        setIsButtonVisible(false); // 수정 버튼 클릭 시 버튼 숨김
    };

    const handleSaveEdit = (newAmount) => {
        if (newAmount) {
            axios.put("/api/record", {
                recordAmount: newAmount,
                recordDate: date,
                recordUserId: userId
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        console.log(newAmount);
                        // 저장 후 어떤 작업을 수행할 수 있습니다.
                        alert("수정되었습니다");
                    } else {
                        console.error("수정 실패!");
                        alert("숫자만 입력해 주세요!");
                    }
                })
                .catch(error => {
                    console.error("수정 요청 중 에러 발생:", error);
                    alert("수정 요청 중 에러 발생");
                });
        } else {
            alert("입력값이 없습니다.");
            console.log("입력값이 없습니다.");
        }

        setIsEditing(false); // 수정 모드 종료
        setIsButtonVisible(true); // 저장 버튼 클릭 시 버튼 표시
    };

    const handleDelete = () => {
        // 삭제할 기록의 ID를 찾습니다. 이 예시에서는 날짜로 기록을 찾았으나 실제로는 더 구체적인 식별자가 필요할 수 있습니다.
        const recordToDelete = records.find(record => moment(record.recordDate).isSame(selectedDate, 'day'));

        if (recordToDelete) {
            axios.delete(`/api/record/${recordToDelete.id}`)
                .then(response => {
                    if (response.status === 200) {
                        // 삭제가 성공하면, records 상태를 업데이트합니다.
                        setRecords(records.filter(record => record.id !== recordToDelete.id));
                        alert("기록이 삭제되었습니다");
                    } else {
                        console.error("삭제 실패!");
                        alert("기록 삭제에 실패했습니다");
                    }
                })
                .catch(error => {
                    console.error("삭제 요청 중 에러 발생:", error);
                    alert("기록 삭제 요청 중 에러 발생");
                });
        } else {
            alert("삭제할 기록이 없습니다.");
            console.log("삭제할 기록이 없습니다.");
        }
    };
    const isSmokeFreeDay = () => {
        return getRecordsForSelectedDate().length === 0; // 담배 달력에 기록이 없는 경우
    };
    return (
        <>
            <Container className="py-4" style={{width: "1100px"}}>
                <div className="p-5 m-4 rounded-3" style={{background: "#5e5e5e", padding: "100px"}}>
                    <div className="container-fluid py-5">
                        <h2 className="display-5 fw-bold text-white">오늘 나의 흡연량은?</h2>
                        <label className="text-white my-2" htmlFor="date">날짜를 선택하세요 :
                            <input type="date"
                                   id="date"
                                   className="form-control my-2"
                                   value={moment(date).format("YYYY-MM-DD")} // Bind value to selected date
                                   onChange={(e) => setDate(new Date(e.target.value))}/>
                        </label>
                        <input
                            className="form-control form-control-lg my-3"
                            type="text"
                            placeholder="숫자만 입력해주세요 (개비)"
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
            </Container>
            <div className="container py-4" style={{width: "1100px"}}>
                <div className="p-5 m-4 rounded-3" style={{background: "#5e5e5e"}}>
                    <div className="container-fluid py-5">
                        <h2 className="display-5 fw-bold text-white">담배 달력</h2>
                        <br/>
                        <div className="row">
                            <Calendar
                                className="col-6"
                                value={date}
                                onChange={(newDate) => {
                                    setDate(newDate);
                                    setSelectedDate(newDate);
                                }}
                                formatDay={(locale, date) => moment(date).format("DD")}
                                tileContent={tileContent}
                            />
                            <div className="col-6">
                                <Card className="w-100" style={{height: "335px"}}>
                                    <CardHeader>
                                            <input disabled
                                                   id="date"
                                                   className="form-control my-2"
                                                   value={moment(date).format("YYYY-MM-DD")} // Bind value to selected date
                                                   onChange={(e) => setDate(new Date(e.target.value))}/>
                                    </CardHeader>
                                    <CardBody className="text-center">
                                        <br/>
                                        <h4>나의 흡연량은?</h4>
                                        <br/>
                                        {isEditing ? (
                                            <div>
                                                <input
                                                    className="form-control form-control-lg mb-3"
                                                    type="number"
                                                    placeholder="숫자만 입력해주세요 (개비)"
                                                    aria-label=".form-control-lg example"
                                                    value={amount} // 수정할 내용은 상태로 관리
                                                    onChange={(e) => setAmount(e.target.value)}
                                                />
                                                <Button
                                                    className="btn btn-success btn-lg"
                                                    type="button"
                                                    onClick={() => handleSaveEdit(amount)} // 수정 내용을 저장하고 수정 모드 종료
                                                >
                                                    저장
                                                </Button>
                                            </div>
                                        ) : (
                                            <h3>
                                                {getRecordsForSelectedDate().length > 0 ? (
                                                    getRecordsForSelectedDate().map(record => (
                                                        <div>{record.recordAmount} 개비</div>
                                                    ))
                                                ) : (
                                                    "오늘은 금연 성공!"
                                                )}
                                            </h3>
                                        )}
                                        {isButtonVisible && !isEditing && !isSmokeFreeDay() && (
                                            <>
                                                <Row className="my-4">
                                                    <Col>
                                                        <Button
                                                            className="btn btn-warning btn-lg"
                                                            type="button"
                                                            style={{ width: "100px" }}
                                                            onClick={handleEdit}
                                                        >
                                                            수정
                                                        </Button>
                                                    </Col>
                                                    <Col>
                                                        <Button
                                                            className="btn btn-danger btn-lg"
                                                            type="button"
                                                            style={{ width: "100px" }}
                                                            onClick={handleDelete}
                                                        >
                                                            삭제
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </>
                                        )}
                                    </CardBody>
                                </Card>
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