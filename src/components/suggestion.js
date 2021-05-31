
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react'


function CoinForm() {
    const [value, setValue] = useState('Bitcoin');
    const [res, setRes] = useState('Example: Bitcoin');
    const [calls, setCall] = useState(0);
    const isMounted = useRef(false);
    const [user, setUser] = useState();

    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
      }
    }, []);

    const onChange = (event) => {
        setValue(event.target.value);
      };

    const seteffect = (event) => {
        setCall(calls+1);
    }
      useEffect(() => {
        if (isMounted.current) {
          var data = {'coin_name': value}
          if (user){
            data = {'coin_name': value, 'user_email': user.email}
          }
            axios.post('https://tipcoinapi.herokuapp.com/users/suggestions/', data)
            .then(resp => setRes(resp.data.coin_name + " successful"))
            .catch(error => {setRes("Successful")})
            
          } else {
            isMounted.current = true;
          }
        },[calls]);
    
    return (
          <form>
          <div className="form-left">
              <label htmlFor="email">Enter your Coin Suggestion</label>
              <input type="text" name="email" value={value} onChange={onChange}/>
              <p>{res}</p>
          </div>
          <input type="button" value="LETS GO" onClick={seteffect}/>
          </form>
        );
}

export default CoinForm;