import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import { GiPoliceBadge, GiCoins } from "react-icons/gi";
import Login from './login.js';
import './createrpage.css'
import crp from  '../images/crp.jpg'
import { SiDjango, SiReact } from "react-icons/si";
import { TiTick } from "react-icons/ti";
import { GrSend } from "react-icons/gr";
import { AiFillGithub, AiFillLinkedin,AiFillInstagram } from "react-icons/ai";
import {ImFacebook, ImGoogle, ImInstagram, ImLinkedin2 } from "react-icons/im";
import { AiTwotoneHome } from "react-icons/ai";




export default function createrpage() {
    return (
            <React.Fragment>
                <div className="main-hero-bg">
                <div className="overlay">
                    <header>
                        <Navbar  bg="transparent" expand="lg">
                            <a href="/">tipzcoin.in</a>              
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse className="basic-navbar-nav">
                                <Nav className="justify-content-end" style={{ width: "95%" }}>
                                    <Nav.Link style={{fontSize:"22px"}} onClick={() => {window.location.href=`${window.location.origin}/`}}>Home <AiTwotoneHome fontSize="1.5em"/></Nav.Link>
                                    <Nav.Link style={{fontSize:"22px"}} onClick={() => {window.location.href=`${window.location.origin}/coins/`}} >Coins <GiCoins fontSize="1.5em"/></Nav.Link>
                                    <Nav.Link ><Login/></Nav.Link> 
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </header>
                </div>
                <div className="creater-hero-bg">
                    <div className="image"><img src={crp} className="img-fluid" alt="Creater"/></div>
                    <div className="hero-text">
                        <p><span className="hey"> // Hey,</span><br/> Stranger My name is <span className="name">Paritosh</span> and i am a <span className="full-stack"> Fullstack Web Developer</span>, I build Scalable and Documented Backend and Restfull APIs on <span className="django">Django <SiDjango/></span> <span className="and">&&</span> Cross-Device frontends using <span className="react">React js <SiReact/></span> & HTML/CSS.</p>
                    </div>
                </div>
                <div className="tool-info">
                    <div className="web-pro-head"><span className="tipcoin">tipzcoin</span> is built on</div>
                    <div className="web-pro-info">
                        <div className="front-end">
                            <p>Frontend</p>
                            <h4>React.js<TiTick color="green"/></h4>
                            <h4>HTML<TiTick color="green"/></h4>
                            <h4>CSS<TiTick color="green"/></h4>
                        </div>
                        <div className="back-end">
                            <p>Backend</p>
                            <h4>Python<TiTick color="green"/></h4>
                            <h4>Django<TiTick color="green"/></h4>
                            <h4>REST API<TiTick color="green"/></h4>
                        </div>
                    </div>
                    <div className="backend">
                        Backend Documentation
                    </div>
                    <div className="web-pro-info">
                        <div onClick={() => {window.location.href=`https://tipcoinapi.herokuapp.com/redoc/`}} className="redoc">
                            <p >REDOC<br/><GrSend/></p>
                        </div>
                        <div onClick={() => {window.location.href=`https://tipcoinapi.herokuapp.com/swagger-doc-tipz/`}} className="swagger">
                            <p >SWAGGER<br/><GrSend/></p>
                        </div>
                    </div>
                </div>
                <div className="follow-user" >Know Me Better At...</div>
                <div className="follow">
                    <div onClick={() => {window.location.href=`https://www.linkedin.com/in/paritosh-thakur-211b531a4/`}} className="linkedin">
                        <AiFillLinkedin fontSize="4em"/>
                    </div>
                    <div onClick={() => {window.location.href=`https://github.com/Paritosh404`}} className="github">
                        <AiFillGithub fontSize="4em"/>
                    </div>
                    <div onClick={() => {window.location.href=`https://www.instagram.com/paritosh._.rajput/`}} className="instagram">
                        <AiFillInstagram fontSize="4em"/>
                    </div>
                </div>
                <footer style={{margin:"0 0 0 0"}} className="footer">
                    <p>Contact Us!</p>
                    <div>
                        <GiPoliceBadge /><span className="footer-icon"/>
                        <ImFacebook/> <span className="footer-icon"/>
                        <ImGoogle/><span className="footer-icon"/>
                        <ImInstagram/><span className="footer-icon"/>
                    <ImLinkedin2/>
                    </div>
                    <br/>
                © 2021 tipscoin. All rights reserved
                </footer>
                </div>
            </React.Fragment>

    )
}
