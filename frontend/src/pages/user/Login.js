import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('/login', {
          username: username,
          password: password
        });

        console.log('Response:', response);

        const token = response.headers.authorization.split(' ')[1];

        console.log('Received token:', token);

        // 서버에서 받은 토큰을 로컬스토리지에 저장
        localStorage.setItem('token', token);

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
        <Link to="/join">회원가입</Link>
      </form>
    </div>
  );
}

export default Login;
