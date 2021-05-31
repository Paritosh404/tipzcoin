import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Coinmain from './components/coinmain'
import CoinPage from './components/coinspage'
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom'
import createrpage from './components/createrpage';

function Router() {
  return(
    <BrowserRouter>
      <Switch>
      <Route exact path='/' component = {App}/>
      <Route exact path='/coins' component = {Coinmain}/>
      <Route exact path='/coins/:name' component = {CoinPage}/>
      <Route exact path='/creater/' component = {createrpage}/>
      <Route render={() => <Redirect to={{pathname: "/"}} />} />
    </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
