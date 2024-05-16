import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../components/UserContext';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function MyPage() {
    const { userId } = useContext(UserContext);
    const [ userData, setUserData ] = useState(null);
    const [userAge, setUserAge] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserData() {
            try {
                console.log({userId});
                const userDataResponse = await axios.get(`/api/user/${userId}`);
                setUserData(userDataResponse.data);

                //나이계산
                const birthDate = new Date(userDataResponse.data.birthDate);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    setUserAge(age - 1);
                } else {
                    setUserAge(age);
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        }
        fetchUserData();
    }, [userId]);

    if(!userData) {
        return (
        <div>
            <h2> 로딩중 . . . </h2>
            <div> id : {userId} </div>
        </div>
        )
    }

    const handleEditButtonClick = () => {
        navigate('/edit-user'); // EditUser 페이지 경로로 이동
    };

    return (
        <>
            <Header/ >
            <div>
                <h1> {userData.name} 님 안녕하세요 </h1>
                <button onClick={handleEditButtonClick}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <p>Username: {userData.username}</p>
                <p>Email: {userData.email}</p>
                <p>Name: {userData.name}</p>
                <p>Gender: {userData.gender === 'f' ? '여성' : '남성'}</p>
                <p>Birth Date: {userData.birthDate}</p>
                <p>Age: {userAge}세 </p>
                <p>가입일: {userData.createdAt}</p>
            </div>
            <Footer/ >
        </>
    )
}

export default MyPage;