import React, { useState, useEffect } from "react";
import axios from "axios";
import 'react-responsive-modal/styles.css';
import './login.css'
import SignUp from './signup'
import { Modal } from 'react-responsive-modal';
import 'font-awesome/css/font-awesome.min.css';
import { HiUser, HiLockClosed } from "react-icons/hi";
import { BiSend } from "react-icons/bi";
import { GiHoodedAssassin } from "react-icons/gi";
import { Nav} from 'react-bootstrap'


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();

    const [status, setStatus] = useState("");

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
  
    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
      }
    }, []);
  
    // logout the user
    const handleLogout = () => {
      setUser({});
      setUsername("");
      setPassword("");
      localStorage.clear();
      window.location.reload();
    };
  
    // login the user
    const handleSubmit = async e => {
      if (username === "" || password === ""){
        e.preventDefault();
        setStatus("Empty Fields")
      }

      else{

      e.preventDefault();
      const user = { username, password };
      // send the username and password to the server
      axios.post(
        "https://tipcoinapi.herokuapp.com/auth/",
        user
      ).then(resp => {
        localStorage.setItem("token", JSON.stringify(resp.data));
        axios.get(
        `https://tipcoinapi.herokuapp.com/users/account/${username}/`,{ headers: {"accept": "application/json" , 'Authorization':`Token ${resp.data.token}`}}
      ).then(response => {setUser(response.data);
        // store the user in localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload()
      }
        )
      })
    }
    };
  
    // if there's a user show the message below
    if (user) {
      return (
        <div>
          <Nav.Link style={{padding:"0", fontSize:"22px"}} onClick={handleLogout}>Logout <GiHoodedAssassin fontSize="1.5em"/></Nav.Link>
        </div>
      );
    }
  
    // if there's no user, show the login form
    return (
      <div>
        
        <Nav.Link style={{padding:"0", fontSize:"22px"}} onClick={onOpenModal}>Login <GiHoodedAssassin fontSize="1.5em"/></Nav.Link>
      <Modal blockScroll={false} open={open} onClose={onCloseModal} center classNames={{
          overlay: 'customOverlay',
          modal: 'customModal',
        }}>
          
         <div className="form-asd" >
            <h1>Sign In</h1>
            <h5>{status}</h5>
            <label htmlFor="username" ><HiUser/>  E-mail address</label>
            <input
              type="text"
              className="form-control"
              value={username}
              placeholder="enter a username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <label htmlFor="password"><HiLockClosed/> Password</label>
            <form onSubmit={handleSubmit}>
            <input
              type="password"
              className="form-control"
              value={password}
              autoComplete="on"
              placeholder="enter a password"
              onChange={({ target }) => setPassword(target.value)}
            />
            </form>
            <button onClick={handleSubmit} className="btn btn-light" type="button"><BiSend fontSize="1.5em" /></button>
            <br/>
            <h5>New to tipscoin? <SignUp/></h5>
        </div>
        </Modal>
        </div>
    );
  };

export default Login;