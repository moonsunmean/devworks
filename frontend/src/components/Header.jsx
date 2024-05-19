import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 페이지가 로드될 때 현재 로그인 상태를 확인
        const token = localStorage.getItem('token');
        // 토큰이 있다면 로그인 상태로 설정
        setIsLoggedIn(!!token);
    }, []);

    // 로그아웃
    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    return (
        <nav className="navbar navbar-expand-md sticky-top" style={{ background: "#212121" }}>
            <div className="container" style={{ width: "1000px" }}>
                <ul className="navbar-nav flex-grow-1">
                    <li className="nav-item"><a className="nav-link text-white" href="/">Nomoke</a></li>
                    <li className="nav-item"><a className="nav-link text-white" href="/record">기록</a></li>
                    <li className="nav-item"><a className="nav-link text-white" href="/analysis">통계</a></li>
                    <li className="nav-item"><a className="nav-link text-white" href="/my-challenge">챌린지</a></li>
                    <li className="nav-item"><a className="nav-link text-white" href="/support">지원</a></li>
                </ul>
                <ul className="navbar-nav">
                    {isLoggedIn ? (
                        <React.Fragment>
                            <li className="nav-item"><Link className="nav-link text-white" to="/my-page">MYPAGE</Link></li>
                            <li className="nav-item"><div className="nav-link text-white">|</div></li>
                            <li className="nav-item"><button className="nav-link text-white" onClick={logout}>LOGOUT</button></li>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <li className="nav-item"><Link className="nav-link text-white" to="/join">JOIN</Link></li>
                            <li className="nav-item"><div className="nav-link text-white">|</div></li>
                            <li className="nav-item"><Link className="nav-link text-white" to="/login">LOGIN</Link></li>
                        </React.Fragment>
                    )}
                </ul>
            </div>
        </nav>
    );
}
export default Header;