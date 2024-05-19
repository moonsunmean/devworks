import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/challenge/css/ChallengeCategory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';


function ChallengeCategory() {
    const [isCategoryBoxOpen, setIsCategoryBoxOpen] = useState(true); //기본세팅은 열린상태
    const [isParentCategoryOpen, setIsParentCategoryOpen] = useState(false);
    const navigate = useNavigate();

    const toggleCategoryBox = () => {
        setIsCategoryBoxOpen(!isCategoryBoxOpen);
    }
    const toggleParentCategory = () => {
        setIsParentCategoryOpen(!isParentCategoryOpen);
    }
    const toggleCategory = (e) => {
        e.stopPropagation();
    }

    const handleNavigation = (path) => {
        navigate(path); // 경로 변경
    };

    return(
        <div className={`challenge-category-container ${isCategoryBoxOpen ? 'open' : 'closed'}`}>
            <div className={`challenge-category ${isCategoryBoxOpen ? 'open' : 'closed'}`}>
                {isCategoryBoxOpen && (
                    <div>
                        <ul className="categories">
                            <li className="parent-category" onClick={() => handleNavigation('/my-challenge')}> 참여중인 챌린지 </li>
                            <li className="parent-category" onClick={toggleParentCategory}>
                                챌린지 찾기
                                {isParentCategoryOpen && (
                                    <ul className="sub-category-container" onClick={toggleCategory}>
                                        <li className="sub-category" onClick={(e) => { e.stopPropagation(); handleNavigation('/ongoing'); }}>진행중인 챌린지</li>
                                        <li className="sub-category" onClick={(e) => { e.stopPropagation(); handleNavigation('/finished'); }}>종료된 챌린지</li>
                                    </ul>
                                )}
                            </li>
                            <li className="parent-category" onClick={() => handleNavigation('/edit-challenge')}>챌린지 관리</li>
                        </ul>
                    </div>
                )}
            </div>
            <button className="challenge-category-btn" onClick={toggleCategoryBox}>
                {isCategoryBoxOpen ? <FontAwesomeIcon icon={faAngleLeft} /> : <FontAwesomeIcon icon={faAngleRight} />}
            </button>
        </div>
    );
}

export default ChallengeCategory;