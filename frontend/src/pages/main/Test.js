// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
//
// function Test() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [loggedInUser, setLoggedInUser] = useState('');
//
//     useEffect(() => {
//         // 페이지가 로드될 때 현재 로그인 상태를 확인
//         const token = localStorage.getItem('token');
//         if (token) {
//             // 토큰이 있다면 로그인 상태로 설정
//             setIsLoggedIn(true);
//             try {
//                 // 토큰을 분해하여 payload를 추출
//                 const payload = token.split('.')[1];
//                 // base64 디코딩 후 JSON 파싱하여 사용자 정보 추출
//                 const decodedPayload = JSON.parse(atob(payload));
//                 // 사용자 정보를 상태에 저장
//                 setLoggedInUser(decodedPayload.username);
//             } catch (error) {
//                 console.error('Error extracting username from token:', error);
//                 // 사용자 정보를 가져오는데 실패한 경우 로그아웃 처리
//                 logout();
//             }
//         } else{
//             setIsLoggedIn(false);
//             setLoggedInUser('');
//         }
//         console.log("isLoggedIn 상태값:", isLoggedIn);
//     }, [isLoggedIn]);
//
//     // 로그아웃
//     const logout = () => {
//         localStorage.removeItem('token');
//         setIsLoggedIn(false);
//         setLoggedInUser('');
//     };
//
//     return (
//         <div>
//             <h2>메인 화면</h2>
//             {isLoggedIn ? (
//                 <div>
//                     <p>{`안녕하세요, ${loggedInUser} 님`}</p>
//                     <button onClick={logout}>로그아웃</button>
//                     <Link to="/hello-test">테스트 페이지로 이동하기</Link>
//                 </div>
//             ) : (
//                 <div>
//                     <p>로그인이 필요합니다.</p>
//                     <Link to="/login">로그인하러 가기</Link>
//                 </div>
//             )}
//         </div>
//     );
// }
//
// export default Test;
