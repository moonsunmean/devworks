import React from 'react';
import '../styles/MainPage.css';
import {Link, useNavigate} from "react-router-dom";
// import {useAuth} from "../api/AuthProvider";


function Navigation(){
//     const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

//     const handleLogout = () => {
//         console.log("로그아웃 버튼이 클릭되었습니다.");
//         logout();
//     };

    return (
        <nav id="navibar">
            <div>
                <a href="/">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/nomo-62b92.appspot.com/o/Nomoke.png?alt=media&token=9713a8be-3608-41e8-b8bb-bf5becd57922"/>
                </a>
            </div>
            <div id="menu">
                <Link to="/*">기록</Link>
                <Link to="/analysis" id="news">통계</Link>
                <Link to="/*">챌린지</Link>
            </div>

            <div>
            <Link to="/*">
                    <img id="searchIcon" src="https://lh3.googleusercontent.com/fife/ALs6j_HvauUn3aoeAxPoM-QtBTMHvcj9BtF78kU3iiizmRvd3lptcWkS7pZB3v_rgNb2PV1Vl8CWP1xEHZP76kJ-18fglvcmLlJUfxa7U4ueKBzIxWWbJo4sIZvb6Omo24bHT705iNelhwiQMOfH70nl691FZ8CNBuZnUrsyYOgYZZ2TffEilo6UV4LOlVKmxeoYZVOiKhrGbN5bCvC2cXj3y2b_kyYH4AaJCEEAsf5SUqt_R1UsS0nA7aWDbYXs5MPYxKUexUSqZXGvLU3h5iCHNAWUr3XJCFE6UdrRzQyS5cpZGVJ4vumNjlM_GjhBi6_tZyOgtbIcrNFkWGUFR9lvqc-7eYDrt8z_GAKa4YnS_ATQ7RsIJTz2waDvX3WfKQH5AsYZwNhg3-Ok-rMT1mUrLqHhqFfqVAvfrIIsw-dtlSxywlT7IluGq9Fa83rAS_dr-SiECLAiYDHNXinJD9nNusnwO_rStpmya73dn7pphcXI7pKYX4jH-AfgCt2ekYDev8HsGocMGXm1LyUyBXuPLLOPlq_BP3JKKQY4tGLwfIR-u82PLs3nvxQ3yAlq1vvcbbxO6UzT0IxJYC8wlm6AeG-_c-54N-cKrr1JgX32tltA2o43MYYzeTayd4OFHiw8_6WiUZDc9HIPlHg3eqyZVit_CjaFmUxDCIhGHVOEox-kJt_-ZaupH6qEhemrJFrGgFrPBNggXRSvnP2pcU0styCffIayuKpGiavcEk559HQ3DYw1aheFA8SjE-HBh4roTjoaPM_-vCkV1SuTVzQCKXiRY9CzSpOJ2o-An0dO5ha9bCmXyK5I9LQmzxCwZb3fMNPyJWy8PW2ysI-PPIBOY0fBZL9GBcoUGYOZWh3_mEE9dJzPLTL4MIjxtScWEoV07XhxBP_K-Z90HJYTaknq2j1ZrHNlLAbvaUDnDvyj699xYihz0uyKkY9PgBRpkdhMRLjcNFw2Y8fxYgMrXQLeX6CKNJ4h-lnsLCeUtnDSUhJaxZxexEOEikdKJqW7oqr3VrykuJn6sA2mXIcmMx8MjytTubZGwH1TawD0zNNuuYI3C-BA8GMhoChX8-ICYSb_-aNLGcIx5TpEcu7_2x3dR8Wsy3nJ4LWkthvN1y-WYyUrj5rDga1XAuuB0hm-uEbHTmpG-1Yx3_E8rW7QleuvcfAoBHkxrM8qJKDR5v4NqWkfm695YeN0QP7hcxqlH71o018xW0JXK-z2JMp1DN4wluXh4TkLpSptmkXUVeZtTzIYWb9F-M8mgNzVbLBk-qWypPOdVI7zzx57hq9HvkdMaLkrhxkKhO0SzG73gIf4k2hmz7LdoQawYpmZzj0bP7D6YMeVPt3oLeQ-ldFfAb0LnHxPkXKAwgl8QiSnLs2_-aE0hUgTFl3toprZ0dGD0GoQiwKoEGQnmGhyj2vX7t4Wo_GmS9jXjTzm9vxLNlV2Q1qjepTCRyhRt-SkcODuWXY2yYUVCD3NNNKT_eVLFy46iHHx_zQVCGtaU01i9_HuCvDzp1XlC3jT6OgCNtwrNO5dpSA9GWjnNgs8Qx7-TSPZJ5q6ZMIeK02kHUfzC1tOYb5LDxbhwsLQMut6ScbMm_YDchJ_Kcxo91gVA6c3D0jL7-FhyDvQVJ94ELshVQ3S9s1zNOZsOQqFgA=w1920-h969"/>
            </Link>
               <Link to="/login" id="rightbar">Login</Link>
               <Link to="/signup">Signup</Link>
            </div>
        </nav>
    );
}


export default Navigation;