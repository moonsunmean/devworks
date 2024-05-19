import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faPerson } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../components/UserContext';

function JoinChallengeCard({ challengeData }) {
    const [progress, setProgress] = useState(0);
    const [participantCount, setParticipantCount] = useState(0);
    const [isJoined, setIsJoined] = useState(false);
    const { userId } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const startDate = new Date(challengeData.createdAt);
        const endDate = new Date(challengeData.deadline);
        const currentDate = new Date();

        const elapsedTime = currentDate.getTime() - startDate.getTime();
        const totalTime = endDate.getTime() - startDate.getTime();
        const progressPercentage = (elapsedTime/totalTime) * 100;

        setProgress(progressPercentage);

        const fetchParticipantCount = async () => {
            try {
                const response = await axios.get(`/api/challenge/participants/count/${challengeData.id}`);
                setParticipantCount(response.data);
            } catch (error) {
                console.error('참가자 수를 가져올 수 없습니다:', error);
            }
        };

        if (challengeData.type === 'GROUP') {
            fetchParticipantCount();
        }
    }, [challengeData]);

    useEffect(() => {
        const checkIfJoined = async () => {
            try {
                const response = await axios.get(`/api/challenge/my/${userId}`);
                const joinedChallenges = response.data;
                const isAlreadyJoined = joinedChallenges.some(challenge => challenge.id === challengeData.id);
                if (isAlreadyJoined) {
                    setIsJoined(true);
                }
            } catch (error) {
                console.error('가입한 챌린지 목록을 가져올 수 없습니다:', error);
            }
        };

        checkIfJoined();
    }, [userId]);

    const joinChallenge = async () => {
        if (isJoined) {
            alert('이미 가입한 챌린지입니다.');
            return;
        }

        try {
            await axios.post(`/api/challenge/join/${challengeData.id}`, null, {
                params: {userId: userId}
            });
            alert('챌린지에 가입되었습니다.');
        } catch (error) {
            alert('챌린지 가입에 실패하였습니다. : ' + error.response.data.message);
        }
    }

    return(
        <div className="challenge-card">
            <div className="main-image-section">
                <div className="type-icon-container">
                    {challengeData.type === 'GROUP' ? <FontAwesomeIcon icon={faPeopleGroup} /> : <FontAwesomeIcon icon={faPerson} />}
                </div>
            </div>
            <div className="text-section">
                <h5>{ challengeData.title }</h5>
                <h5>{ challengeData.id }</h5>
                {challengeData.type === 'GROUP' && (
                    <div className="participant-info">
                        {participantCount} / {challengeData.maxParticipants} 명
                    </div>
                )}
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }} />
                </div>
            </div>
            {isJoined ? <p>참여중</p> : <button onClick={joinChallenge}>챌린지 가입</button>}
        </div>
    );
}

export default JoinChallengeCard;
