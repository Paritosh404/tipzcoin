import axios from 'axios'
import "./coins.css";
import React, {useEffect, useReducer} from 'react'

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

function Coin_map(con) {
     
    return con.map(coin => {
        var usd, inr = 0
        var style1h = {color:"#16C784"}
        var style7d = {color:"#16C784"}
        var style24h = {color:"#16C784"}
        var style1hcnd = true
        var style7dcnd = true
        var style24cnd = true
        if ((coin.usd_price).toFixed(2) === '0.00')
            usd =  (coin.usd_price).toFixed(7)
        
        else 
            usd =  (coin.usd_price).toFixed(2)

        if ((coin.inr_price).toFixed(2) === '0.00')
            inr =  (coin.inr_price).toFixed(7)
        
        else 
            inr =  (coin.inr_price).toFixed(2)
        if (coin.percent_change_1h < 0) { style1h = {color:"#EA3943"}; style1hcnd = false}
        if (coin.percent_change_24h < 0) {style24h = {color:"#EA3943"}; style24cnd = false}
        if (coin.percent_change_7d < 0) {style7d = {color:"#EA3943"}; style7dcnd = false}
        return (
                <tr className="footer" key={coin.rank}>
                    <th scope="row">{coin.rank}</th>
                    <td ><img onClick={()=> window.location.href=(`${window.location.origin}/coins/${coin.currency_name}`)} src={coin.image_url} height='50' width='50' alt="" /> {coin.currency_name}</td>
                    <td >${(usd).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    <td >{(inr).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₹</td>
                    <td style={style1h}><i className={style1hcnd ?"fa fa-caret-up":"fa fa-caret-down"}></i> {coin.percent_change_1h.toFixed(2)}</td>
                    <td style={style24h}><i className={style24cnd ?"fa fa-caret-up":"fa fa-caret-down"}></i> {coin.percent_change_24h.toFixed(2)}</td>
                    <td style={style7d}><i className={style7dcnd ?"fa fa-caret-up":"fa fa-caret-down"}></i> {coin.percent_change_7d.toFixed(2)}</td>
                    <td >{Math.round(coin.volume_24h).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
        )
    
    })
}

function Table() {

    const [state, dispatch] = useReducer(reducer, initialState)

    const MINUTE_MS = 60000;

    useEffect(() => {
        axios.get('https://tipcoinapi.herokuapp.com/curr/')
        .then(resp => {
            dispatch({type:'SUCCESS', payload:resp.data.results})
        })
        .catch(error => dispatch({type:'ERROR'}))
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
        axios.get('https://tipcoinapi.herokuapp.com/curr/')
        .then(resp => dispatch({type:'SUCCESS', payload:resp.data.results}))
        .catch(error => dispatch({type:'ERROR'}))
        
    }, MINUTE_MS );
        return () => clearInterval(interval);
    },[])


    return (
    <table className="table">
        {state.loading ? <caption>Loading...</caption> : 
                <tbody>
            <tr className="header">
                    <th scope="col">Rank</th>
                    <th scope="col">Name</th>  
                    <th scope="col">USD</th>
                    <th scope="col">INR</th>
                    <th scope="col">1h%</th>
                    <th scope="col">24h%</th>
                    <th scope="col">7d%</th>
                    <th scope="col">Volume(24h)</th>
            </tr>
            {Coin_map(state.coins)}
            </tbody>
            
    }
    </table>
    )
}



function Coins() {
    
    return (
        <div className="table-responsive">
            <Table/>
        </div>
    )

}

export default Coins;