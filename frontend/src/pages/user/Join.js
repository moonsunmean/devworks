import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
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
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        birthDate: '',
        role: 'ROLE_USER'
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJoinData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
            e.preventDefault();
            console.log('Join Data:', joinData);
            try {
                const response = await axios.post('/join', joinData);
                console.log('Response Data:', response.data);
                alert('회원가입 완료');
                navigate('/login');
            } catch (error) {
                console.error('Error:', error);
                alert('회원가입 실패');
                if (error.response.data && error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
            }
        };

    return (
        <div>
            <Container className="text-white" style={{margin: "130px", padding: "50px", width: "600px", borderRadius: "10px", background: "black"}}>
                <Form onSubmit={handleSubmit}>
                    <h2 className="text-center my-5">회원가입</h2>
                    <div className="mb-3">
                        <label>아이디</label>
                        <input type="text" name="username" value={joinData.username} onChange={handleChange} required
                               className="form-control"
                               pattern="^(?=.*[a-z])[a-z0-9]{6,12}$"
                               title="영문 소문자로만 이루어진 아이디 또는 영문 소문자와 숫자의 조합으로 이루어진 6~12자리의 아이디를 입력하세요."/>
                        {errors.username && <span>{errors.username}</span>}
                    </div>
                    <div className="mb-3">
                        <label>비밀번호</label>
                        <input type="password" name="password" value={joinData.password} onChange={handleChange}
                               required pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,16}$"
                               className="form-control"
                               title="영문 대소문자, 숫자, 특수문자를 포함하여 8~16자리의 비밀번호를 입력하세요."/>
                        {errors.password && <span>{errors.password}</span>}
                    </div>
                    <div className="mb-3">
                        <label>이름</label>
                        <input type="text" name="firstName" value={joinData.firstName} onChange={handleChange}
                               className="form-control"
                               required/>
                        {errors.firstName && <span>{errors.firstName}</span>}
                    </div>
                    <div className="mb-3">
                        <label>성</label>
                        <input type="text" name="lastName" value={joinData.lastName} onChange={handleChange} className="form-control" required/>
                        {errors.lastName && <span>{errors.lastName}</span>}
                    </div>
                    <div className="mb-3">
                        <label>성별</label>
                        <input type="text" name="gender" value={joinData.gender} onChange={handleChange} className="form-control" required/>
                        {errors.gender && <span>{errors.gender}</span>}
                    </div>
                    <div className="mb-3">
                        <label>이메일</label>
                        <input type="email" name="email" value={joinData.email} onChange={handleChange} className="form-control" required/>
                        {errors.email && <span>{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label>생년월일</label>
                        <input type="date" name="birthDate" value={joinData.birthDate} onChange={handleChange}
                               className="form-control"
                               required/>
                        {errors.birthDate && <span>{errors.birthDate}</span>}
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
