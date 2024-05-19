import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Container, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function JoinForm() {

    const navigate = useNavigate();

    const [joinData, setJoinData] = useState({
        username: '',
        password: '',
        name: '',
        gender: '',
        email: '',
        birthDate: '',
        role: 'ROLE_USER'
    });

    const [usernameAvailable, setUsernameAvailable] = useState(false);
    const [usernameAlert, setUsernameAlert] = useState(false);
    const [emailAvailable, setEmailAvailable] = useState(false);
    const [emailAlert, setEmailAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJoinData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'username') {
            setUsernameAvailable(false);
        }
        if (name === 'email') {
            setEmailAvailable(false);
        }
    };

    const handleDuplicateUsername = async () => {
        try {
            const response = await axios.post(`/check-duplicate/username`, { username: joinData.username });
            if(response.data) {
                setUsernameAvailable(!response.data);
                setUsernameAlert(response.data);
            } else{
                setUsernameAvailable(!response.data);
                setUsernameAlert(response.data);
                alert('사용 가능한 아이디입니다.');
            }
        } catch (error) {
            alert('중복 확인 실패');
        }
    }

    const handleDuplicateEmail = async () => {
        try {
            const response = await axios.post(`/check-duplicate/email`, { email: joinData.email });
            if(response.data) {
                setEmailAvailable(!response.data);
                setEmailAlert(response.data);
            } else{
                setEmailAvailable(!response.data);
                setEmailAlert(response.data);
                alert('사용 가능한 이메일입니다.');
            }
        } catch (error) {
            alert('중복 확인 실패');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Join Data:', joinData);
        if(!usernameAvailable){
            alert('아이디 중복확인을 진행하세요.')
            return;
        }
        if(!emailAvailable){
            alert('이메일 중복확인을 진행하세요.')
            return;
        }
        try {
            const response = await axios.post('/join', joinData);
            console.log('Response Data:', response.data);
            alert('회원가입 완료');
            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
            alert('회원가입 실패');
        }
    };

    // 현재 날짜 가져오기
    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <Container className="text-white" style={{margin: "130px auto 130px auto", padding: "50px", width: "600px", borderRadius: "10px", background: "black"}}>
                <Form onSubmit={handleSubmit}>
                    <h2 className="text-center my-5">회원가입</h2>
                    <div className="mb-3">
                        <label>아이디</label>
                        <input type="text" name="username" value={joinData.username} onChange={handleChange} required
                                className="form-control"
                                pattern="^(?=.*[a-z])[a-z0-9]{6,12}$"
                                title="영문 소문자로만 이루어진 아이디 또는 영문 소문자와 숫자의 조합으로 이루어진 6~12자리의 아이디를 입력하세요."/>
                        <Button onClick={() => handleDuplicateUsername()}>중복확인</Button>
                        {usernameAlert && <span style={{ color: 'red' }}>이미 존재하는 아이디입니다.</span>}
                    </div>
                    <div className="mb-3">
                        <label>비밀번호</label>
                        <input type="password" name="password" value={joinData.password} onChange={handleChange}
                               required pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,16}$"
                               className="form-control"
                               title="영문 대소문자, 숫자, 특수문자를 포함하여 8~16자리의 비밀번호를 입력하세요."/>
                    </div>
                    <div className="mb-3">
                        <label>이름</label>
                        <input type="text" name="name" value={joinData.name} onChange={handleChange}
                               className="form-control"
                               required pattern="[가-힣]{2,8}"
                               title="한글로만 이루어진 2-8자 사이의 이름을 입력하세요."/>
                    </div>
                    <div className="mb-3">
                        <label>성별</label>
                        <div>
                            <input type="radio" id="female" name="gender" value="f" onChange={handleChange} required />
                            <label htmlFor="female">여성</label>
                            <input type="radio" id="male" name="gender" value="m" onChange={handleChange} required />
                            <label htmlFor="male">남성</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label>이메일</label>
                        <input type="email" name="email" value={joinData.email} onChange={handleChange} className="form-control" required/>
                        <Button onClick={() => handleDuplicateEmail()}>중복확인</Button>
                        {emailAlert && <span style={{ color: 'red' }}>이미 존재하는 이메일입니다.</span>}
                    </div>
                    <div className="mb-3">
                        <label>생년월일</label>
                        <input type="date" name="birthDate" value={joinData.birthDate} onChange={handleChange}
                               max={getCurrentDate()}
                               className="form-control"
                               required/>
                    </div>
                    <div className="d-grid mt-5">
                        <Button type="submit" className="btn btn-danger">
                            회원가입
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

function Join() {
    return (
        <div style={{background: "#2d2d2d"}}>
            <Header/>
            <JoinForm/>
            <Footer/>
        </div>
    );
}

export default Join;
