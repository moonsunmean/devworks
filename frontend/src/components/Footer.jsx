import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="py-5 bg-black text-white" style={{height: "300px"}}>
            <Container>
                <Row className="text-white">
                    <Col className=" border-end">
                        <h4>devWorks</h4>
                        <br/>
                        <ul className="list-unstyled text-small">
                            <Row>
                                <Col>
                                    김찬혁
                                </Col>
                                <Col>
                                    문선민
                                </Col>
                                <Col>
                                    강주연
                                </Col>
                            </Row>
                        </ul>
                    </Col>
                    <Col className="text-end">
                        <h2>Nomoke</h2>
                        <p>여러분의 금연을 응원합니다</p>
                        <br/>
                        <Row>
                            <Col xs={10}>
                                <a href="https://twitter.com/nomoke" target="_blank"
                                   rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} className="text-white"
                                                                              style={{fontSize: "25px"}}/></a>
                            </Col>
                            <Col xs={1}>
                                <a href="https://www.instagram.com/nomoke/" target="_blank"
                                   rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} className="text-white"
                                                                              style={{fontSize: "25px"}}/></a>
                            </Col>
                            <Col xs={1}>
                                <a href="https://www.linkedin.com/company/nomoke/" target="_blank"
                                   rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} className="text-white"
                                                                              style={{fontSize: "25px"}}/></a>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                                <p>&copy; 2024 Nomoke. All rights reserved.</p>
                                <p>문의 사항이 있으시면 언제든지 연락주세요.</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </footer>

    );
}

export default Footer;