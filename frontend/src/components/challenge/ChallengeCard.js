import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faPerson } from '@fortawesome/free-solid-svg-icons';
import '../../styles/challenge/css/ChallengeCard.css';

function ChallengeCard({ challengeData }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const startDate = new Date(challengeData.createdAt);
        const endDate = new Date(challengeData.deadline);
        const currentDate = new Date();

        const elapsedTime = currentDate.getTime() - startDate.getTime();
        const totalTime = endDate.getTime() - startDate.getTime();
        const progressPercentage = (elapsedTime/totalTime) * 100;

        setProgress(progressPercentage);
    }, [challengeData]);

    return(
        <div className="challenge-card">
            <div className="main-image-section">
                <div className="type-icon-container">
                    {challengeData.type === 'GROUP' ? <FontAwesomeIcon icon={faPeopleGroup} /> : <FontAwesomeIcon icon={faPerson} />}
                </div>
            </div>
            <div className="text-section">
                <h5>{ challengeData.title }</h5>
                {/* 그룹챌일경우에 현재인원/최대인원수 -> 테이블만들기 */}
                <div className="progress-bar">
                </div>
            </div>
        </div>
    );
}

export default ChallengeCard;
