import React from 'react';

function Header() {
    return (
        <nav className="navbar navbar-expand-md sticky-top" style={{ background: "#212121" }}>
            <div className="container" style={{ width: "1000px" }}>
                <ul className="navbar-nav flex-grow-1">
                    <li className="nav-item"><a className="nav-link text-white" href="/">Nomoke</a></li>
                    <li className="nav-item"><a className="nav-link text-white" href="/record">기록</a></li>
                    <li className="nav-item"><a className="nav-link text-white" href="/analysis">통계</a></li>
                    <li className="nav-item"><a className="nav-link text-white" href="/challenge">챌린지</a></li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link text-white" href="/join">JOIN</a></li>
                    <li className="nav-item"><div className="nav-link text-white">|</div></li>
                    <li className="nav-item"><a className="nav-link text-white" href="/login">LOGIN</a></li>
                </ul>
            </div>
        </nav>
    );
}
export default Header;