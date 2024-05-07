import React from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";



function MainPage() {
    return (
        <>
            <div className="bg-black" style={{height: "500px"}}>
                <section className="container">
                    <div className="row py-lg-5">
                        <div className="col-lg-8 py-5 mx-auto">
                            <h1 className="fw-light text-white">Nomoke</h1>
                            <h2 className="fw-light text-white">간편한 흡연 기록 서비스</h2>
                            <br/>
                            <p className="lead text-white">하루 흡연량을 간편하게 기록해서 흡연 습관을 개선해 보세요</p>
                            <p className="lead text-white">평균 흡연량을 한눈에 볼 수 있고 주간 분석 서비스를 경험해 보세요</p>
                            <p className="lead text-white">챌린지를 통해 금연에 대한 동기부여를 받아보세요</p>
                        </div>
                    </div>
                </section>
            </div>
            <div className="my-5" style={{height: "500px", background: "#1a1a1a"}}>
                <section className="container">
                    <div className="row py-lg-5 text-end">
                        <div className="col-lg-8 py-5 mx-auto">
                            <br/>
                            <h2 className="fw-light text-white">한번의 클릭으로 흡연량 기록!</h2>
                            <br/>
                            <p className="lead text-white">키보드로 입력할 필요 없이 빠르고 쉽게 오늘의 흡연량 기록</p>
                            <p className="lead text-white">기록한 데이터를 토대로 Nomoke 의 분석 서비스를 경험하실 수 있습니다</p>
                        </div>
                    </div>
                </section>
            </div>
            <div className=""
                 style={{height: "600px", backgroundImage: "linear-gradient(to bottom, #1c1c1c, #2f3c49)"}}>
                <section className="container">
                    <div className="row py-lg-5 text-center">
                        <div className="col-lg-8 py-5 mx-auto">
                            <br/>
                            <h2 className="fw-light text-white">흡연 분석 서비스</h2>
                            <br/>
                            <p className="lead text-white">Nomoke 에서 제공하는 다양한 분석 서비스를 통해</p>
                            <p className="lead text-white">보다 더 체계적으로 금연 가능성을 높일 수 있습니다!</p>
                            <div className="row">
                                <div className="col-6 text-white">
                                    <div className="card my-4" style={{height: "200px"}}></div>
                                    <h6>위험 질병 발병 확률 분석</h6>
                                </div>
                                <div className="col-6 text-white">
                                    <div className="card my-4" style={{height: "200px"}}></div>
                                    <h6>주간 평균 흡연량 분석</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className=""
                 style={{height: "600px", backgroundImage: "linear-gradient(to bottom, #2f3c49, #215a8f)"}}>
                <section className="container">
                    <div className="row py-lg-5 text-center">
                        <div className="col-lg-8 py-5 mx-auto">
                            <br/>
                            <h2 className="fw-light text-white">금연 지원 서비스</h2>
                            <br/>
                            <p className="lead text-white">전문적인 금연 지원 서비스도 제공하고 있습니다</p>
                            <div className="row">
                                <div className="col-6 text-white">
                                    <div className="card my-4" style={{height: "200px"}}></div>
                                    <h6>주변 금연 센터 정보 제공</h6>
                                </div>
                                <div className="col-6 text-white">
                                    <div className="card my-4" style={{height: "200px"}}></div>
                                    <h6>니코틴 의존도 자가진단</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="my-5" style={{height: "500px", background: "#1a1a1a"}}>
                <section className="container">
                    <div className="row py-lg-5 text-center">
                        <div className="col-lg-8 py-5 mx-auto">
                            <br/>
                            <h2 className="fw-light text-white">챌린지를 통해 지속적인 금연 동기부여를 받아보세요!</h2>
                            <br/>
                            <div className="row">
                                <div className="col-6 text-white">
                                    <h6>누구든지 손쉽게 챌린지를 만들고 참가할 수 있어요!</h6>
                                    <div className="card" style={{height: "200px"}}></div>
                                </div>
                                <div className="col-6 text-white">
                                    <h6>챌린지가 얼마나 달성됐는지 한눈에 확인해볼 수 있어요!</h6>
                                    <div className="card" style={{height: "200px"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}


function Main() {
    return (
        <div style={{ background: "#2d2d2d"}}>
            <Header/>
            <MainPage/>
            <Footer/>
        </div>
    );
}

export default Main;