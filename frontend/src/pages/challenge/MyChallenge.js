import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ChallengeCard from '../../components/challenge/ChallengeCard.js';
import ChallengeCategory from '../../components/challenge/ChallengeCategory.js';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { UserContext } from '../../components/UserContext';

function MyChallenge() {
    const { userId } = useContext(UserContext);
    const [challengeData, setChallengeData] = useState([]);

    useEffect(() => {
        async function fetchChallengeData(){
            if (!userId) return;
            try{
                console.log('userId:', userId);
                const response = await axios.get(`/api/challenge/my/${userId}`);
                setChallengeData(response.data);
                console.log('challengeData:', response.data);
            } catch (error){
                console.error('챌린지 정보를 가져올 수 없습니다 : ', error);
            }
        }
        fetchChallengeData();
    }, [userId]);


    return(
        <>
            <Header/>
                    <ChallengeCategory />
                        {challengeData.map(challenge => (
                            <ChallengeCard key={challenge.id} challengeData={challenge} />
                        ))}
            <Footer/>
        </>
    )
}

export default MyChallenge;