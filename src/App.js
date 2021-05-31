import "./App.css";
import img1 from "./images/bg3.jpg"
import Coins from './components/coins.js'
import CoinForm from './components/suggestion.js'
import Login from './components/login.js'
import {Navbar, Nav} from 'react-bootstrap'
import { GiPoliceBadge, GiCoins } from "react-icons/gi";
import { ImStatsDots, ImFacebook, ImGoogle, ImInstagram, ImLinkedin2 } from "react-icons/im";
import { FaDev } from "react-icons/fa";



function App() {
  return (
    <div className="App">
    <div className="hero-bg">
    <div className="overlay">
        <header>
          <Navbar  bg="transparent" expand="lg">
              <a href="/">tipzcoin.in</a>              
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse className="basic-navbar-nav">
                  <Nav className="justify-content-end" style={{ width: "95%" }}>
                    <Nav.Link style={{fontSize:"22px"}} onClick={() => {window.location.href=`${window.location.origin}/creater/`}}>Creater <FaDev fontSize="1.5em"/></Nav.Link>
                    <Nav.Link style={{fontSize:"22px"}} onClick={() => {window.location.href=`${window.location.origin}/coins/`}} >Coins <GiCoins fontSize="1.5em"/></Nav.Link>
                    <Nav.Link ><Login/></Nav.Link> 
                  </Nav>
              </Navbar.Collapse>
          </Navbar>
        </header>
    </div>
        <section className="top">
        
            <h1><span>Keep Your investment</span> up-to-date</h1>

            <p>Why invest on the bases of chance,<br/>when you have tipscoin at your service.</p>

            <div className="form-container">
                <CoinForm/>
            </div>
        </section>
    </div>

    <div className="second-bg">
    <section className="coin-preface">
        <div className="right-col">
            <h2>COINS <GiCoins/></h2>
            <p>This is an inevitable truth that crypto is not going anywhere and it has turned the fortunes for some people in this 12-year small life. Although, some say it is a game of luck, 
                why leave your money to luck when you can keep a keen look at your favourite coins and set alerts so you never miss a chance to buy or sell and be in the game.</p>
        </div>
        <img src={img1} alt="Charts and bar."/>
    </section>
    </div>
    <div className="coins">
      <h2>LIVE CHART <ImStatsDots fontSize="1.5em"/></h2>
    <Coins/>
    </div>
    <footer className="footer">
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

  );
}

export default App;
