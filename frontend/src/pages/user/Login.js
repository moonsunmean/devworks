import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지 로드시 토큰 확인하여 로그인 상태 업데이트
    checkToken();
  }, [checkToken]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('/login', {
          username: username,
          password: password
        });

        const token = response.data.token;

        // 토큰을 쿠키에 저장
        document.cookie = `token=${token}; path=/`;

        setIsLoggedIn(true);

        // 로그인 성공 시 메인 화면으로 이동
        navigate('/');

    } catch (error) {
      if (error.response.status === 404) {
        setError('존재하지 않는 아이디입니다.');
      } else if (error.response.status === 401) {
        setError('비밀번호를 확인하세요.');
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleLogout = () => {
    // 토큰 삭제
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    setIsLoggedIn(false);

    // 로그아웃 후 로그인 페이지로 이동
    navigate('/login');
  };

  const checkToken = () => {
    // 쿠키에서 토큰 확인하여 로그인 상태 업데이트
    const token = getCookie('token');
    if (token) {
      setIsLoggedIn(true);
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  return (
    <div>
      <h2>로그인</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">아이디 </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호 </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
        {isLoggedIn && <button onClick={handleLogout}>로그아웃</button>}
      </form>
    </div>
  );
}

export default Login;
