import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 초기 상태값 설정
const initialState = {
    loggedInUser: '',
    userId: '',
    setLoggedInUser: () => {},
    setUserId: () => {}
};

// Context 생성
export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [userId, setUserId] = useState('');

    // 페이지 로드 시 토큰에서 username 추출
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = token.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));
                setLoggedInUser(decodedPayload.username);
                // userId 조회
                axios.get(`/api/user/getId`, {
                    params: {
                        username: decodedPayload.username
                    }
                })
                .then(response => {
                    setUserId(parseInt(response.data));
                })
                .catch(error => {
                    console.error('Error fetching userId:', error);
                });
            } catch (error) {
                console.error('Error extracting username from token:', error);
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ loggedInUser, userId, setLoggedInUser, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};
