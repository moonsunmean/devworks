import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Container, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function LoginForm() {
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
        <Container className="text-white" style={{margin: "130px", padding: "50px", width: "600px", borderRadius: "10px", background: "black"}}>
            {error && <div>{error}</div>}
            <Form onSubmit={handleLogin}>
                <h2 className="text-center my-5">로그인</h2>
                <div className="mb-3">
                    <label htmlFor="username">아이디 </label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="아이디를 입력해 주세요"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">비밀번호 </label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="비밀번호를 입력해 주세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="d-grid mt-5">
                    <Button type="submit" className="btn btn-danger">
                        로그인
                    </Button>
                </div>
                <p className="forgot-password text-white my-3">
                    <Link to="/join">회원가입 하러가기</Link>
                </p>
                <hr/>
                <div>
                    <h5 className="my-4 text-center"> 간편로그인 </h5>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <a href="http://34.64.51.56:5000/oauth2/authorization/kakao" style={{width: '75px'}}><img
                            src="img/kakao.png" alt="카카오로그인"/></a>
                        <a href="http://34.64.51.56:5000/oauth2/authorization/naver" style={{width: '75px%'}}><img
                            src="img/naver.png" alt="네이버로그인"/></a>
                        <a href="http://34.64.51.56:5000/oauth2/authorization/google" style={{width: '75px%'}}><img
                            src="img/google.png" alt="구글로그인"/></a>
                    </div>
                </div>
            </Form>
        </Container>
    </div>
  );
}

function Login() {
    return (
        <div style={{background: "#2d2d2d"}}>
            <Header/>
            <LoginForm/>
            <Footer/>
        </div>
    );
}

export default Login;
