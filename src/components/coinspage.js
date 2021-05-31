import React, {useState, useEffect, useReducer} from 'react'
import axios from 'axios'
import './coinspage.css'
import Login from './login.js'
import {Navbar, Nav} from 'react-bootstrap'
import { GiPoliceBadge, GiCoins} from "react-icons/gi";
import { ImFacebook, ImGoogle, ImInstagram, ImLinkedin2 } from "react-icons/im";
import { AiTwotoneHome } from "react-icons/ai";
import Coins from './coins'
import { FaDev } from "react-icons/fa";

const initialState = {
    loading:true,
    coins:{},
    error:''
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SUCCESS':
            return {
                loading:false,
                coins:action.payload,
                error:''
            }

        case 'ERROR':
            return {
                loading:true,
                coins:{},
                error:'Error in data fetching'

            }
        
        default:
            return {
                loading:false,
                coins:{},
                error:''

            }
    }
}


function CoinPage() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [user, setUser] = useState();
    const [token, setToken] = useState(false);
    const [alrtstate, setAlrtState] = useState(false)
    const [inpchk, setChk] = useState()


    const MINUTE_MS = 60000;

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const loggedInToken = localStorage.getItem("token");
        if (loggedInUser && loggedInToken) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
          setToken(JSON.parse(loggedInToken))
          setAlrtState(true)
        }
      }, []);


    useEffect(() => {
        if (alrtstate){
            axios.get(`https://tipcoinapi.herokuapp.com/users/setalert/${user.email}/?coin_name=${window.location.pathname.split('/')[2].charAt(0).toUpperCase() + window.location.pathname.split('/')[2].slice(1)}`, { headers: {"accept": "application/json" , 'Authorization':`Token ${token.token}`}})
            .then(resp => setChk(true))

    }

    });
    

    

    useEffect(() => {
        axios.get(`https://tipcoinapi.herokuapp.com/curr/${window.location.pathname.split('/')[2].charAt(0).toUpperCase() + window.location.pathname.split('/')[2].slice(1)}/`)
        .then(resp => {
            dispatch({type:'SUCCESS', payload:resp.data})
        })
        .catch(error => dispatch({type:'ERROR'}))
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
        axios.get(`https://tipcoinapi.herokuapp.com/curr/${window.location.pathname.split('/')[2].charAt(0).toUpperCase() + window.location.pathname.split('/')[2].slice(1)}/`)
        .then(resp => dispatch({type:'SUCCESS', payload:resp.data}))
        .catch(error => dispatch({type:'ERROR'}))
        
    }, MINUTE_MS );
        return () => clearInterval(interval);
    },[])




    const [cnv, setCnv] = useState('');
    const [inr, setInr] = useState('');
    const [usd, setUsd] = useState('');
    const [alert, setAlert] = useState('');

    const handleSetalrt =(val) =>{
        if (val === true) {
        const data = {'user_email' : user.email, 'coin_name' : state.coins.currency_name };
        axios.post(
            "https://tipcoinapi.herokuapp.com/users/setalert/",
            data, { headers: {"accept": "application/json" , 'Authorization':`Token ${token.token}`}}
          ).then(resp => { setAlert('Alert Set')})
          .catch(error => {setAlrtState(true); setChk(false); setAlert('Error, Try Again')})
        }
        else {
            axios.delete(`https://tipcoinapi.herokuapp.com/users/setalert/${user.email}/?coin_name=${state.coins.currency_name}`, { headers: {"accept": "application/json" , 'Authorization':`Token ${token.token}`}})
            .then(resp => setAlert('Alert Removed'))
            .catch(error => {setAlrtState(true); setAlert('Error, Please try again later');})
        }
    }

    const handleSetcnv = (val) => {
        setCnv(val)
        setInr( state.coins.inr_price > 1 ?  val*state.coins.inr_price.toFixed(4) : val*state.coins.inr_price.toFixed(10));
        setUsd( state.coins.usd_price > 1 ? val*state.coins.usd_price.toFixed(4) : val*state.coins.usd_price.toFixed(10) );
        if(val===''){setInr('');setUsd('')}
    }

    const handleSetinr = (val) => {
        setInr(val);
        setCnv((val/state.coins.inr_price).toFixed(8));
        setUsd(val*(state.coins.inr_price/state.coins.usd_price).toFixed(4))
        if(val===''){setCnv('');setUsd('')}
    }

    const handleSetusd = (val) => {
        setInr(val*(state.coins.inr_price/state.coins.usd_price).toFixed(4));
        setCnv((val/state.coins.usd_price).toFixed(8));
        setUsd(val)
        if(val===''){setInr('');setCnv('')}
    }
    return (
        <React.Fragment>
        {state.loading ? 
        <div className="coin-hero-bg">
            <div className="overlay-coin">
                <header>
                    <Navbar  bg="transparent" expand="lg">
                        <a href="/">tipzcoin.in</a>              
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="basic-navbar-nav">
                            <Nav className="justify-content-end" style={{ width: "95%" }}>
                                <Nav.Link style={{fontSize:"22px"}} onClick={() => {window.location.href=`${window.location.origin}/creater/`}}>Creater <FaDev fontSize="1.5em"/></Nav.Link>
                                <Nav.Link style={{fontSize:"22px"}} onClick={() => {window.location.href=`${window.location.origin}/`}}>Home <AiTwotoneHome fontSize="1.5em"/></Nav.Link>
                                <Nav.Link style={{fontSize:"22px"}} onClick={() => {window.location.href=`${window.location.origin}/coins/`}} >Coins <GiCoins fontSize="1.5em"/></Nav.Link>
                                <Nav.Link ><Login/></Nav.Link> 
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </header>
            
            </div>
            <div className="loading">Loading...</div>
        </div>
        :
        <div className="coin-main-bg">
        <div className="overlay-coin">
                <header>
                    <Navbar  bg="transparent" expand="lg">
                        <a href="/">tipzcoin.in</a>              
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="basic-navbar-nav">
                            <Nav className="justify-content-end" style={{ width: "95%" }}>
                                <Nav.Link style={{fontSize:"22px"}} onClick={() => {window.location.href=`${window.location.origin}/creater/`}}>Creater <FaDev fontSize="1.5em"/></Nav.Link>
                                <Nav.Link style={{fontSize:"22px"}} onClick={() => {window.location.href=`${window.location.origin}/`}}>Home <AiTwotoneHome fontSize="1.5em"/></Nav.Link>
                                <Nav.Link style={{fontSize:"22px"}} onClick={() => {window.location.href=`${window.location.origin}/coins/`}} >Coins <GiCoins fontSize="1.5em"/></Nav.Link>
                                <Nav.Link ><Login/></Nav.Link> 
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </header>
        </div>
            <div className="coin-hero-bg" >
                    <div className="top-div-span">
                    <div className="top-div">
                            <div className='top-div-ele1'>
                                <img src={state.coins.image_url} height='60' width='60' alt="" />
                                <span className="top-div-ele-ele">{state.coins.currency_name}</span>
                                <span className="top-div-ele-ele">Rank#{state.coins.rank}</span>
                            </div>
                            <div className="top-div-ele2">
                                <div>
                                    <h5>USD</h5>
                                    <h1 style={state.coins.percent_change_24h > 0 ? {color:'#16C784'} : {color:'#EA3943'}} >${state.coins.usd_price > 1 ? state.coins.usd_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : state.coins.usd_price.toFixed(8).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                                    <span style={state.coins.percent_change_24h > 0 ? {background:'#16C784'} : {background:'#EA3943'}} className="top-div-ele2-ele"><i className={state.coins.percent_change_24h > 0 ?"fa fa-caret-up":"fa fa-caret-down"}/> {state.coins.percent_change_24h.toFixed(2)}%</span>
                                </div>
                                <div>
                                    <h5>INR</h5>
                                    <h1 style={state.coins.percent_change_24h > 0 ? {color:'#16C784'} : {color:'#EA3943'}}>{ state.coins.inr_price > 1 ? state.coins.inr_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : state.coins.inr_price.toFixed(8).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₹</h1>
                                    <span style={state.coins.percent_change_24h > 0 ? {background:'#16C784'} : {background:'#EA3943'}} className="top-div-ele2-ele"><i className={state.coins.percent_change_24h > 0 ?"fa fa-caret-up":"fa fa-caret-down"}/> {state.coins.percent_change_24h.toFixed(2)}%</span>
                                </div>
                            </div>
                    </div>
                    </div>
                    <div className='bottom-div'>
                        <div className="bottom-div-header">{state.coins.currency_symbol} Statistics</div>
                        <div className='bottom-div-ele'>
                            <h5><span className='stat-name'>Volume</span>24h</h5>
                            <h5 style={{color:"gray"}}>{state.coins.volume_24h.toFixed(2)}</h5>
                        </div>
                        <div className='bottom-div-ele'>
                            <h5><span className='stat-name'>Percentage</span>1h</h5>
                            <h5 style={state.coins.percent_change_1h > 0 ? {color:'green'} : {color:'#EA3943'}}><i className={state.coins.percent_change_1h > 0 ?"fa fa-caret-up":"fa fa-caret-down"}/> {state.coins.percent_change_1h.toFixed(2)}%</h5>
                        </div>
                        <div className='bottom-div-ele'>
                            <h5><span className='stat-name'>Percentage</span>24h</h5>
                            <h5 style={state.coins.percent_change_24h > 0 ? {color:'green'} : {color:'#EA3943'}}><i className={state.coins.percent_change_24h > 0 ?"fa fa-caret-up":"fa fa-caret-down"}/> {state.coins.percent_change_24h.toFixed(2)}%</h5>
                        </div>
                        <div className='bottom-div-ele'>
                            <h5><span className='stat-name'>Percentage</span>7h</h5>
                            <h5 style={state.coins.percent_change_7d > 0 ? {color:'green'} : {color:'#EA3943'}}><i className={state.coins.percent_change_7d > 0 ?"fa fa-caret-up":"fa fa-caret-down"}/> {state.coins.percent_change_7d.toFixed(2)}%</h5>
                        </div>
                        <div className='bottom-div-ele'>
                            <h5><span className='stat-name'>Percentage</span>30d</h5>
                            <h5 style={state.coins.percent_change_30d > 0 ? {color:'green'} : {color:'#EA3943'}}><i className={state.coins.percent_change_30d > 0 ?"fa fa-caret-up":"fa fa-caret-down"}/> {state.coins.percent_change_30d.toFixed(2)}%</h5>
                        </div>
                        <div className='bottom-div-ele'>
                            <h5><span className='stat-name'>Percentage</span>60d</h5>
                            <h5 style={state.coins.percent_change_60d > 0 ? {color:'green'} : {color:'#EA3943'}}><i className={state.coins.percent_change_60d > 0 ?"fa fa-caret-up":"fa fa-caret-down"}/> {state.coins.percent_change_60d.toFixed(2)}%</h5>
                        </div>
                        <div className='bottom-div-ele'>
                            <h5><span className='stat-name'>Percentage</span>90d</h5>
                            <h5 style={state.coins.percent_change_90d > 0 ? {color:'green'} : {color:'#EA3943'}}><i className={state.coins.percent_change_90d > 0 ?"fa fa-caret-up":"fa fa-caret-down"}/> {state.coins.percent_change_90d.toFixed(2)}%</h5>
                        </div>
                        <div className='bottom-div-ele'>
                            <h5><span className='stat-name'>Top 100</span>Market Rank</h5>
                            <h5 > #{state.coins.rank}</h5>
                        </div>
                    </div>
            </div>
            <div className="bottom-div-cnvrt">
                <div className="coin-input">
                    <img src={state.coins.image_url} height='50' width='50' alt="" />
                    <h5>{state.coins.currency_symbol}</h5>
                    <input type="number" value={cnv} onChange={({ target }) => handleSetcnv(target.value)} maxLength="8"></input>
                </div>
                <div style={{background:'white'}} className="coin-input">
                    <img src='https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/USD.svg' height='50' width='50' alt="" />
                    <h5>USD</h5>
                    <input type="number"  maxLength="8" value={usd} onChange={({ target }) => handleSetusd(target.value)} style={{background:'white'}}></input>
                </div>
                <div  className="coin-input">
                    <img src='https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/INR.svg' height='50' width='50' alt="" />
                    <h5>INR</h5>
                    <input type="number" maxLength="8" value={inr} onChange={({ target }) => handleSetinr(target.value)}></input>
                </div>
            </div>
             
            <div className="bottom-div-alert">
                 
                <div className='bottom-div-alert-input'>
                { alrtstate ?
                <>
                    <h1>Send Me {state.coins.currency_symbol} Alerts</h1>
                    <input defaultChecked={inpchk} value={inpchk} onChange={({ target }) => handleSetalrt(target.checked)} type="checkbox"/>   
                    </> :
                <>
                    <h1>Login To set Alert</h1>
                    <input type="checkbox" disabled/>  
                </>
                }
                </div>
                <h5>{alert}</h5>
            </div>

            <div className="bottom-div-alert">
                <h5>Personalized Alerts coming soon...</h5>
            </div>
            </div>

    
}
            <div className="top-5-cn" >
                <h5 style={{textAlign:"center", margin:"1em 1em 1em 1em"}} >Top Coins</h5>
                <Coins/>
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
    </React.Fragment>
    )
}

export default CoinPage