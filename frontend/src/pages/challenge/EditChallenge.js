import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { UserContext } from '../../components/UserContext';
import { useNavigate } from 'react-router-dom';
import ChallengeCard from '../../components/challenge/ChallengeCard.js';
import ChallengeCategory from '../../components/challenge/ChallengeCategory.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function EditChallenge() {
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();
    const [myCreatorChallenges, setMyCreatorChallenges] = useState([]);

    useEffect(() => {
        const fetchMyCreatorChallenges = async () => {
            try {
                const response = await axios.get(`/api/challenge/creator/${userId}`);
                setMyCreatorChallenges(response.data);
            } catch (error) {
                console.error('내 챌린지 목록을 가져올 수 없습니다:', error);
            }
        };

        fetchMyCreatorChallenges();
    }, [userId]);

    const handleCreateChallenge = () => {
        navigate('/create-challenge');
    };

    return(
        <>
            <Header />
            <ChallengeCategory />
            <div className="edit-challenge-container">
                <div className="create-challenge">
                    <span>새로운 챌린지 생성하기</span>
                    <FontAwesomeIcon
                        icon={faPlus}
                        className="create-challenge-icon"
                        onClick={handleCreateChallenge}
                    />
                </div>
                <div className="my-challenges-list">
                    {myCreatorChallenges.map(challenge => (
                        <ChallengeCard key={challenge.id} challengeData={challenge} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default EditChallenge;