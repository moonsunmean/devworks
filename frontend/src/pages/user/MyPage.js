import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../components/UserContext';

function MyPage() {
    const { loggedInUser, userId } = useContext(UserContext);
    const [ userData, setUserData ] = useState(null);

    useEffect(() => {

        async function fetchUserData(userId) {
            try {
                const userDataResponse = await axios.get(`/api/user/${userId}`);
                setUserData(userDataResponse.data);
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        }

        fetchUserData();
    }, [userId]);

    async function updateUser() {
        try{
            const response = await axios.put(`api/user/${userId}`, userData);
            setUserData(response.data);
        } catch (error) {
            console.error('Error updating user: ', error);
        }
    }

    async function deleteUser() {
        try{
            await axios.delete(`api/user/${userId}`);
            setUserData(null);
            //추가 ㄱㄱ
        } catch (error) {
            console.error('Error deleting user: ', error);
        }
    }

    if(!userData) {
        return (
        <div>
            <h2> 로딩중 . . . </h2>
            <div> username : {loggedInUser} </div>
            <div> id : {userId} </div>
        </div>
        )
    }

    return (
        <div>
            <p> userContext test : {loggedInUser} </p>
            <h1> {userData.name} 님 안녕하세요 </h1>
            <p>ID: {userData.id}</p>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>Name: {userData.name}</p>
            <p>Gender: {userData.gender}</p>
            <p>Birth Date: {userData.birthDate}</p>
        </div>
    )
}

export default MyPage;