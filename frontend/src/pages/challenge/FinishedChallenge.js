import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChallengeCategory from '../../components/challenge/ChallengeCategory.js';
import '../../styles/challenge/css/FinishedChallenge.css';
import ChallengeCard from '../../components/challenge/ChallengeCard.js';
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function FinishedChallenge() {
    const [challengeData, setChallengeData] = useState([]);

    useEffect(() => {
        async function fetchChallengeData(){
            try{
                const response = await axios.get('/api/challenge/finished');
                setChallengeData(response.data);
                console.log('challengeData:', response.data);
            } catch (error){
                console.error('챌린지 정보를 가져올 수 없습니다 : ', error);
            }
        }
        fetchChallengeData();
    }, []);

    return(
        <>
            <Header/>
                <div className="finished-challenge-container">
                    <ChallengeCategory />
                    <div className="finished-challenge-list">
                        {challengeData.map(challenge => (
                            <ChallengeCard key={challenge.id} challengeData={challenge} />
                        ))}
                    </div>
                </div>
            <Footer/>
        </>
    )
}

export default FinishedChallenge;
