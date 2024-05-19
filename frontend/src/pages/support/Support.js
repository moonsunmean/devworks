import React, {useState} from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Nicotine from "./Nicotine";
import MapContent from "../../components/MapContent";
function Info() {
    return (
        <div className="bg-black" style={{height: "600px"}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col">
                        <h1 className="text-white" style={{marginTop: "100px"}}>금연에 대해 더 깊게 알고싶으시면</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Center() {
    return (
        <div style={{margin: "50px auto 150px auto"}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col">
                        <div className="my-5">
                            <button className="btn btn-danger btn-lg"
                                    style={{width: "400px", height: "60px", fontSize: "30px"}}>
                                주변 금연 센터 정보
                            </button>
                            <MapContent/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Support() {
    return (
        <div style={{background: "#2d2d2d"}}>
            <Header/>
            <Nicotine/>
            <Info/>
            <Center/>
            <Footer/>
        </div>
    );
}

export default Support;