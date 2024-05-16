import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../components/UserContext';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from 'react-router-dom';

function EditUser() {
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const [updatedUserData, setUpdatedUserData] = useState({
        username: '',
        email: '',
        name: '',
        gender: '',
        birthDate: ''
    });

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userDataResponse = await axios.get(`/api/user/${userId}`);
                setUserData(userDataResponse.data);
            } catch(error) {
                console.error('회원정보 조회 실패: ', error);
            }
        }
        fetchUserData();
    }, [userId]);


    async function updateUser() {
        try{
            await axios.put(`api/user/${userId}`, updatedUserData);
            setUserData(prevUserData => ({
                ...prevUserData,
                ...updatedUserData
            }));
            setUpdatedUserData({
                username: '',
                email: '',
                name: '',
                gender: '',
                birthDate: ''
            });
            alert('회원정보 수정 성공');
            window.location.href = '/my-page';
        } catch (error) {
            console.error('회원정보 수정 실패: ', error);
            alert('회원정보 수정 실패.');
        }
    }

    async function deleteUser() {
        const confirmDelete = window.confirm('정말로 탈퇴하시겠습니까?');
        if (confirmDelete) {
            try{
                await axios.delete(`api/user/${userId}`);
                setUserData(null);
                localStorage.removeItem('token');
                alert('탈퇴되었습니다.');
                navigate('/');
            } catch (error) {
                console.error('회원 탈퇴 실패: ', error);
            }
        }
    }

    return (
        <>
        <Header />
        <h2> 회원 정보 수정 </h2>
        <div className = "user-edit">
            {userData && (
                <div>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            placeholder={userData.username}
                            value={updatedUserData.username}
                            onChange={(e) => setUpdatedUserData({ ...updatedUserData, username: e.target.value })}
                            pattern="^(?=.*[a-z])[a-z0-9]{6,12}$"
                            title="영문 소문자로만 이루어진 아이디 또는 영문 소문자와 숫자의 조합으로 이루어진 6~12자리의 아이디를 입력하세요."
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            placeholder={userData.email}
                            value={updatedUserData.email}
                            onChange={(e) => setUpdatedUserData({ ...updatedUserData, email: e.target.value })}
                            pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
                            title="유효한 이메일 주소를 입력하세요."
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            placeholder={userData.name}
                            value={updatedUserData.name}
                            onChange={(e) => setUpdatedUserData({ ...updatedUserData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="gender">Gender:</label>
                        <label>
                            여성
                            <input
                                type="checkbox"
                                value="f"
                                checked={updatedUserData.gender === 'f'}
                                onChange={(e) => setUpdatedUserData({ ...updatedUserData, gender: e.target.checked ? 'f' : 'm' })}
                            />
                        </label>
                        <label>
                            남성
                            <input
                                type="checkbox"
                                value="m"
                                checked={updatedUserData.gender === 'm'}
                                onChange={(e) => setUpdatedUserData({ ...updatedUserData, gender: e.target.checked ? 'm' : 'f' })}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="birthDate">Birth Date:</label>
                        <input
                            type="date"
                            value={updatedUserData.birthDate}
                            onChange={(e) => setUpdatedUserData({ ...updatedUserData, birthDate: e.target.value })}
                        />
                    </div>
                    <button onClick={updateUser}>수정하기</button>
                    <button onClick={deleteUser}>회원 탈퇴</button>
                </div>
            )}
        </div>
        <Footer />
        </>
    )
}

export default EditUser;