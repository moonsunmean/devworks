import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { UserContext } from '../../components/UserContext';

function CreateChallenge() {
    const { userId } = useContext(UserContext);
    const currentDate = new Date().toISOString().split('T')[0];
    const getDefaultMaxParticipants = (type) => {
        return type === 'INDIVIDUAL' ? 1 : 2;
    }

    const [formData, setFormData] = useState({
        userId: userId,
        title: '',
        text: '',
        deadline: '',
        mainImageUrl: '',
        type: 'INDIVIDUAL',
        recordType: 'CLICK',
        challengeStatus: 'ONGOING',
        maxParticipants: getDefaultMaxParticipants('INDIVIDUAL'),
    });

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            userId: userId
        }));
    }, [userId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if(!token) {
            alert('로그인 하세요');
            return;
        }

        try{
            await axios.post(`/api/challenge`, formData);
            console.log(formData);

            alert('챌린지가 생성되었습니다.');
        } catch (error) {
            console.log(formData);
            console.error('챌린지 생성 중 오류 발생: ', error);
            alert('챌린지 생성에 실패하였습니다.');
        }
    }

    const renderMaxParticipantsField = () => {
        if (formData.type === 'GROUP') {
            return (
                <div>
                    <label>최대 참가 인원</label>
                    <input
                        type="number"
                        name="maxParticipants"
                        value={formData.maxParticipants}
                        onChange={handleChange}
                        required
                        min="2" // 그룹 챌린지일 경우 최소 2명 이상
                        max="20"
                    />
                </div>
            );
        }
    }

    return (
    <>
        <Header />
        <form onSubmit={handleSubmit}>
            <h2>{userId}</h2>
            <div>
                <label>챌린지 제목</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    maxLength={20}
                />
            </div>
            <div>
                <label>챌린지 설명</label>
                <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>마감일</label>
                <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    min={currentDate}
                    required
                />
            </div>
            <div>
                <label>메인 이미지 URL</label>
                <input
                    type="text"
                    name="mainImageUrl"
                    value={formData.mainImageUrl}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>챌린지 타입</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value="INDIVIDUAL">INDIVIDUAL</option>
                    <option value="GROUP">GROUP</option>
                </select>
            </div>
            {renderMaxParticipantsField()}
            <div>
                <label>기록 타입</label>
                <select
                    name="recordType"
                    value={formData.recordType}
                    onChange={handleChange}
                >
                    <option value="CLICK">클릭형식</option>
                    <option value="DIARY">일기형식</option>
                </select>
            </div>
            <button type="submit">챌린지 생성</button>
        </form>
        <Footer />
    </>
    );
}

export default CreateChallenge;