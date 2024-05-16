import React, { createContext, useState, useEffect } from 'react';

// 초기 상태값 설정
const initialState = {
    userId: '',
    setUserId: () => {}
};

// Context 생성
export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            const userId = decodedPayload.userId;
            setUserId(userId);
        }
    }, []);

    const setUser = (userData) => {
        setUserId(userData.userId);
    };

    return (
        <UserContext.Provider value={{ userId, setUserId, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
