import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import mellowIcon from '../assets/mellowIcon.png'
import Instagram from '../assets/instagram.png'
import Whatapp from '../assets/whatsapp.png'
import youtube from '../assets/youtube.png'
import Phone from '../assets/phone-call.png'
import Android from '../assets/android.png'
import Ios from '../assets/ios.png'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='footer' style={{backgroundColor:"black"}}>
            <Container>
                <Row className='align-item-center'>
                    <Col sm={4} className='mt-2'>
                    <h6  className="fw-bolder fs-3"> <img src="https://www.apcreation.in/wp-content/uploads/2023/01/AP-Creation-final-logo-2.png" style={{width:150}} alt="" /></h6>
                        <p>Download Our App for Android and IOS</p>
                        <div className='application mt-3 '>
                            <a href='/'><img src={Android} alt='instagram' /></a>
                            <a href='/'><img src={Ios} alt='linkedin' /></a>
                        </div>
                    </Col>
                    <Col sm={4}>
                    <div className='mt-4 mb-4' style={{fontSize:"18px"}}>
                        <Link className='mb-5 '  to="/products" style={{color: "white"}}>Shop</Link> <br />
                        <Link className='mb-5' to='/contact' style={{color: "white"}}>Contact Us</Link> <br />
                        <Link className='mb-5' to='/privacypolicy' style={{color: "white"}}>Privacy Policy</Link> <br />
                        <Link className='mb-5' to='/shipping_policy' style={{color: "white"}}>Shipping policy</Link> <br />
                         <Link className='mb-5' to='/TermsConditions' style={{color: "white"}}> Terms & Conditions</Link> <br />
                         <Link className='mb-5' to='/CookiesPolicy' style={{color: "white"}}> Cookies Policy</Link> <br />
                         <Link className='mb-5' to='/Disclaimer' style={{color: "white"}}>Disclaimer</Link> <br />
                         <Link className='mb-5' to='/ReturnRefundPolicy' style={{color: "white"}}>Return & Refund Policy</Link> <br />
                  </div>

                    </Col>
                    <Col sm={4}>
                        <p>Follow Me On</p>
                        <div className=' mt-4'>
                        <i className="fa-brands fa-square-instagram fs-3" style={{color:"red "}}></i>
                        <i className="fa-brands fa-square-whatsapp fs-3 ms-2" style={{color:"rgb(41,167,26)"}}></i>
                        <i className="fa-brands fa-square-facebook fs-3 ms-2" style={{ color:"#0866FF"}}></i>
                        </div>
                        <p>CopyRight ©2025 Mexdy technology All Rights Reserved </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer