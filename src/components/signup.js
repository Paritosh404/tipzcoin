import React, { useState } from "react";
import axios from "axios";
import 'react-responsive-modal/styles.css';
import './signup.css'
import { Modal } from 'react-responsive-modal';
import 'font-awesome/css/font-awesome.min.css';
import { HiUser, HiLockClosed } from "react-icons/hi";
import { AiTwotoneMail, AiFillPhone } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import { BiArrowFromBottom } from "react-icons/bi";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phoneno, setPhone] = useState("");

    const [status, setStatus] = useState("");

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
  
  
  
    // login the user
    const handleSubmit = async e => {
      if (!(email.includes("@") > 0)){
        e.preventDefault();
        setStatus('Enter a valid Email')
      }
      else if(firstname === '') {
        e.preventDefault();
        setStatus('First Name Required')
      }
      else if(password === '' || password2 === ''){
        e.preventDefault();
        setStatus('Password Field Can Not Be Empty')
      }
      else if(password2 !== password){
        e.preventDefault();
        setStatus('Password Does Not Match')
      }
      else if(password.length < 8 ){
        e.preventDefault();
        setStatus('Password Must Be 8 charater long')
      }
      else if(phoneno !== '' && !(phoneno.toString().length === 10)){
        e.preventDefault();
        setStatus('Enter Valid Phone no')
        
      }
      else{
      e.preventDefault();
      if(phoneno === ''){
        setPhone(0)
      }
      const user = { email, password, firstname, lastname, phoneno };
      // send the email and password to the server
      axios.post(
        "https://tipcoinapi.herokuapp.com/users/account/",
        user
      ).then(resp => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        const user1 = { username : email, password : password };
        axios.post(
          "https://tipcoinapi.herokuapp.com/auth/",
          user1
        ).then(resp => {localStorage.setItem("token", JSON.stringify(resp.data));
                        window.location.reload();})
    })
    .catch(error => { setStatus('Error')})
      }
    };

    // if there's no user, show the login form
    return (
      <div className="signupform">
        
        <button style={{padding:".5em 2em", margin:".5em 3.5em"}} className="btn btn-light" onClick={onOpenModal}>Sign Up<BiArrowFromBottom/></button>
      <Modal blockScroll={true} open={open} onClose={onCloseModal} center classNames={{
          overlay: 'customOverlay',
          modal: 'customModalsign',
        }}>
          
         <div className="form-asdf" >
         <h1>Sign Up</h1>
         <h5>{status}</h5>
          <label htmlFor="email" ><AiTwotoneMail/>  E-mail address</label>
          
          <input
            type="text"
            className="form-control"
            value={email}
            placeholder="enter a email"
            onChange={({ target }) => setEmail(target.value)}
          />



            <label htmlFor="firstname"><HiUser/> Firstname</label>
            <input
              type="text"
              className="form-control"
              value={firstname}
              placeholder="enter firstname"
              onChange={({ target }) => setFirstname(target.value)}
            />

            <label htmlFor="lastname"><HiUser/> Lastname</label>
            <input
              type="text"
              className="form-control"
              value={lastname}
              placeholder="enter lastname"
              onChange={({ target }) => setLastname(target.value)}
            />



            <label htmlFor="phoneno"><AiFillPhone/> Phone no</label>
            <input
              type="number"
              className="form-control"
              value={phoneno}
              placeholder="enter your phone no"
              onChange={({ target }) => { target.value > 0 ? setPhone(target.value) : setPhone('')}}
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

            <label htmlFor="password2"><HiLockClosed/> Confirm Password</label>
            <form onSubmit={handleSubmit}>
            <input
              type="password"
              className="form-control"
              value={password2}
              autoComplete="on"
              placeholder="confirm password"
              onChange={({ target }) => setPassword2(target.value)}
            />
            </form>
            <br/>
          
          <button onClick={handleSubmit} style={{margin:"0 0 0 .8em"}} className="btn btn-light" type="button"><BiSend fontSize="1.5em" /></button>
        </div>
        </Modal>
        </div>
    );
    };

export default SignUp;