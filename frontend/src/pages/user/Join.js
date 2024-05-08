import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Join() {

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
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>아이디:</label>
                    <input type="text" name="username" value={joinData.username} onChange={handleChange} required pattern="^(?=.*[a-z])[a-z0-9]{6,12}$" title="영문 소문자로만 이루어진 아이디 또는 영문 소문자와 숫자의 조합으로 이루어진 6~12자리의 아이디를 입력하세요." />
                    {errors.username && <span>{errors.username}</span>}
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input type="password" name="password" value={joinData.password} onChange={handleChange} required pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,16}$" title="영문 대소문자, 숫자, 특수문자를 포함하여 8~16자리의 비밀번호를 입력하세요." />
                    {errors.password && <span>{errors.password}</span>}
                </div>
                <div>
                    <label>이름:</label>
                    <input type="text" name="firstName" value={joinData.firstName} onChange={handleChange} required />
                    {errors.firstName && <span>{errors.firstName}</span>}
                </div>
                <div>
                    <label>성:</label>
                    <input type="text" name="lastName" value={joinData.lastName} onChange={handleChange} required />
                    {errors.lastName && <span>{errors.lastName}</span>}
                </div>
                <div>
                    <label>성별:</label>
                    <input type="text" name="gender" value={joinData.gender} onChange={handleChange} required />
                    {errors.gender && <span>{errors.gender}</span>}
                </div>
                <div>
                    <label>이메일:</label>
                    <input type="email" name="email" value={joinData.email} onChange={handleChange} required />
                    {errors.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <label>생년월일:</label>
                    <input type="date" name="birthDate" value={joinData.birthDate} onChange={handleChange} required />
                    {errors.birthDate && <span>{errors.birthDate}</span>}
                </div>
                <button type="submit">가입하기</button>
            </form>
        </div>
    );
}

export default Join;
