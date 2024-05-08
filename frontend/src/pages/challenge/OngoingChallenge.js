import React, { useState, useEffect } from 'react';
import axios from '../../services/AxiosConfig.js';
import ChallengeCategory from '../../components/challenge/ChallengeCategory.js';
import '../../styles/challenge/css/OngoingChallenge.css';
import ChallengeCard from '../../components/challenge/ChallengeCard.js';

function OngoingChallenge() {
    const [challengeData, setChallengeData] = useState([]);

    useEffect(() => {
        async function fetchChallengeData(){
            try{
                const response = await axios.get('/api/challenge/ongoing');
                setChallengeData(response.data);
                console.log('challengeData:', response.data);
            } catch (error){
                console.error('챌린지 정보를 가져올 수 없습니다 : ', error);
            }
        }
        fetchChallengeData();
    }, []);

    return(
        <div className="ongoing-challenge-container">
            <ChallengeCategory />
            <div className="ongoing-challenge-list">
                {challengeData.map(challenge => (
                    <ChallengeCard key={challenge.id} challengeData={challenge} />
                ))}
            </div>
        </div>
    )
}

export default OngoingChallenge;
