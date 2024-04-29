import React, { useState } from 'react';
import '../../styles/challenge/css/ChallengeCategory.css';

function ChallengeCategory() {
    const [isCategoryBoxOpen, setIsCategoryBoxOpen] = useState(true); //기본세팅은 열린상태
    const [isParentCategoryOpen, setIsParentCategoryOpen] = useState(false);

    const toggleCategoryBox = () => {
        setIsCategoryBoxOpen(!isCategoryBoxOpen);
    }
    const toggleParentCategory = () => {
        setIsParentCategoryOpen(!isParentCategoryOpen);
    }

    return(
        <div className={`challenge-category ${isCategoryBoxOpen ? 'open' : 'closed'}`}>
            <button className="challenge-category-btn" onClick={toggleCategoryBox}>
                {isCategoryBoxOpen ? '접기' : '펼치기'}
            </button>
            {isCategoryBoxOpen && (
                <div>
                    <ul>
                        <li> 참여중인 챌린지 </li>
                        <li onClick={toggleParentCategory}>
                            챌린지 찾기
                            {isParentCategoryOpen && (
                                <ul>
                                    <li> 진행중인 챌린지 </li>
                                    <li> 종료된 챌린지 </li>
                                </ul>
                            )}
                        </li>
                        <li> 챌린지 관리 </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ChallengeCategory;