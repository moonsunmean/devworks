import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Col, Container, Form, Row, Table} from "react-bootstrap";

function Nicotine() {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 열림/닫힘 상태를 관리하는 상태
    const [resultModalOpen, setResultModalOpen] = useState(false); // 모달 열기 함수
    const [answers, setAnswers] = useState({}); // 각 질문에 대한 라디오 버튼의 선택값을 추적하는 상태
    const [totalScore, setTotalScore] = useState(0); // 총합을 저장하는 상태
    const [resultMessage, setResultMessage] = useState(''); // 결과 메시지를 저장하는 상태
    const [resultDescription, setResultDescription] = useState(''); // 결과 메시지를 저장하는 상태

    const openModal = () => {
        setIsModalOpen(true);
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // 결과 모달 열기 함수
    const showResultModal = () => {
        // 각 질문에 대한 선택값을 합산하여 총합을 계산
        const score = Object.values(answers).reduce((acc, val) => acc + val, 0);
        setTotalScore(score);
        // 결과에 따른 메시지 설정
        if (score >= 0 && score <= 3) {
            setResultMessage('낮은 의존도');
            setResultDescription('현재 니코틴 의존도가 아주 낮은 수준입니다.\n\n' +
                '니코틴 의존도는 흡연량이 많아지거나 흡연한 시간이 길면 길수록 더 높아지게 되어 있습니다.\n' +
                '‘지금은 좀 피우고 나중에 완전 끊어야지’, ‘나는 하루에 얼마 피지 않으니깐 괜찮아’라고 생각할 수 있는데,\n' +
                '이렇게 지속적으로 늘리다보면 나중에 완전 금연하는 것이 지금보다 훨씬 더 힘들 것입니다.\n' +
                '그래서 가장 쉽게 금연할 수 있는 때가 바로 지금입니다.\n' +
                '점점 니코틴 의존도가 늘어가기 전에 지금 바로 완전 금연하세요!')
        } else if (score >= 4 && score <= 6) {
            setResultMessage('중간 의존도')
            setResultDescription('현재 니코틴 중독으로 인한 구체적인 증상은 나타나지 않습니다.\n' +
                '아직은 큰 고통 없이 담배를 끊을 수 있으리라 생각됩니다.\n' +
                '대신 쉽게 다시 담배를 피우게 되어 결국 금연에 실패하는 경우도 많겠습니다.\n' +
                '장기간 담배를 피우다 보면 누구라도 심리적, 신체적 의존을 일으키게 됩니다. 일단 의존에 빠지게 되면 자신을 조절하기 힘들어지므로 담배를 끊는 것은 쉽지 않은 일이 되어 버립니다.\n' +
                '잠재적인 중독의 위험성과 건강에 해가 된다는 점을 생각하면 지금이 바로 금연을 시작해야 할 시기인 것입니다.')
        } else if (score >= 7 && score <= 10) {
            setResultMessage('높은 의존도');
            setResultDescription('정도의 차이는 있겠으나 심리적, 신체적으로 니코틴에 대한 의존이 생긴 상태입니다.\n' +
                '니코틴은 뇌에 흡수되어 여러 가지 약리 작용을 일으키는 물질입니다.\n' +
                '하지만, 신경에 작용하는 약물 중에는 중독을 일으키기 쉬운 것들이 있으며,\n' +
                '니코틴도 예외는 아닙니다. 니코틴이 몸에서 빠져나가 혈중 농도가 떨어지면 금단증상을 경험하게 됩니다.\n' +
                '‘한 대만 피웠으면…’ 하는 조바심도 금단 증상의 한 모습일 뿐입니다.\n' +
                '담배를 끊기 어려운 이유는 이처럼 금단증상과 내 마음이 뒤섞여 버려 생활의 일부가 되어버리기 때문입니다.\n' +
                '갑자기 담배를 중단하면, 금단증상으로 금연을 지속하기 어려워질 수 있으므로,\n' +
                '니코틴 패치 등을 적절히 사용하는 것이 도움이 됩니다.')
        } else {
            setResultMessage('모든 질문에 답변해주세요');
            closeResultModal()
        }
        // 총합을 보여주기 위해 모달 열기
        setResultModalOpen(true);
    };

    // 결과 모달 닫기 함수
    const closeResultModal = () => {
        setResultModalOpen(false);
    };

    // 각 질문에 대한 라디오 버튼의 선택값을 업데이트하는 함수
    const handleAnswerChange = (questionNumber, value) => {
        setAnswers(prevState => ({
            ...prevState,
            [questionNumber]: value
        }));
    };


    return (
        <Container style={{margin: "100px auto 150px auto"}}>
            <Row className="justify-content-center">
                <Col>
                    <h1 className="text-white text-center my-5">나의 니코틴 의존도는 어느정도 일까?</h1>
                    <h3 className="text-white text-center my-5">현재 본인이 얼마나 담배에 의존하고 있는지 진단해 보세요!</h3>
                    <div className="text-center my-5">
                        <Button className="btn btn-danger btn-lg"
                                style={{width: "600px", height: "100px", fontSize: "40px"}}
                                onClick={openModal}>
                            니코틴 의존도 자가진단 👉
                        </Button>
                        <Modal show={isModalOpen} onHide={closeModal}
                               size="lg"
                               aria-labelledby="contained-modal-title-vcenter"
                               centered>
                            <Modal.Header>
                                <Modal.Title>니코틴 의존도 자가진단</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Table striped bordered style={{fontSize: "13px"}}>
                                    <thead>
                                        <tr className="text-center">
                                            <th style={{width: "310px"}} >질문</th>
                                            <th style={{width: "220px"}} >응답범주</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-left">⑴ 하루에 보통 몇 개비나 피우십니까?</td>
                                            <td>
                                                <Form>
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio1"
                                                        label="10개비 이하"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(1, 0)}
                                                        style={{width: "130px"}}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio2"
                                                        label="11~20개비"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(1, 1)}
                                                        style={{width: "130px"}}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio3"
                                                        label="21~30개비"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(1, 2)}
                                                        style={{width: "130px"}}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio3"
                                                        label="31개비 이상"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(1, 3)}
                                                        style={{width: "130px"}}
                                                    />
                                                </Form>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-left">⑵ 아침에 일어나서 얼마 만에 첫 담배를 피우십니까?</td>
                                            <td>
                                                <Form>
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio1"
                                                        label="1시간 이후"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(2, 0)}
                                                        style={{width: "130px"}}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio2"
                                                        label="31분~1시간 사이"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(2, 1)}
                                                        style={{width: "130px"}}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio3"
                                                        label="6~30분 사이"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(2, 2)}
                                                        style={{width: "130px"}}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio3"
                                                        label="5분 이내"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(2, 3)}
                                                        style={{width: "130px"}}
                                                    />
                                                </Form>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-left">⑶ 금연구역(도서관, 극장, 병원 등)에서 담배를 참기가 어렵습니까?</td>
                                            <td>
                                                <Form>
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio1"
                                                        label="예"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(3, 1)}
                                                        style={{width: "130px"}}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio2"
                                                        label="아니오"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(3, 0)}
                                                        style={{width: "130px"}}
                                                    />
                                                </Form>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-left">⑷ 하루 중 담배 맛이 가장 좋은 때는 언제입니까?</td>
                                            <td>
                                                <Form>
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio1"
                                                        label="아침 첫 담배"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(4, 1)}
                                                        style={{width: "130px"}}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio2"
                                                        label="그 외의 담배"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(4, 0)}
                                                        style={{width: "130px"}}
                                                    />
                                                </Form>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-left">⑸ 오후와 저녁시간보다 오전 중에 담배를 더 자주 피우십니까?</td>
                                            <td>
                                                <Form>
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio1"
                                                        label="예"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(5, 0)}
                                                        style={{width: "130px"}}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio2"
                                                        label="아니오"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(5, 1)}
                                                        style={{width: "130px"}}
                                                    />
                                                </Form>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>⑹ 몸이 아파 하루 종일 누워있을 때에도 담배를 피우십니까?</td>
                                            <td>
                                                <Form>
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio1"
                                                        label="예"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(6, 0)}
                                                        style={{width: "130px"}}
                                                    />
                                                    <Form.Check
                                                        inline
                                                        type="radio"
                                                        id="radio2"
                                                        label="아니오"
                                                        name="radioGroup"
                                                        className="radios"
                                                        onChange={() => handleAnswerChange(6, 1)}
                                                        style={{width: "130px"}}
                                                    />
                                                </Form>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn_close" variant="secondary" onClick={closeModal}>
                                    닫기
                                </Button>
                                <Button className="btn" variant="danger" onClick={showResultModal}>
                                    진단 결과 보기
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={resultModalOpen} onHide={closeResultModal}
                               size="lg"
                               aria-labelledby="contained-modal-title-vcenter"
                               centered>
                            <Modal.Header>
                                <Modal.Title>진단 결과</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h4>{resultMessage}</h4>
                                <p style={{fontSize: "14px"}}>{resultDescription}</p>
                                {/* 점수에 따른 메시지 표시나 다른 결과 정보를 추가할 수 있습니다. */}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn_close" variant="secondary" onClick={closeResultModal}>
                                    닫기
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Nicotine;
