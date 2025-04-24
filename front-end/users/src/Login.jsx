import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [loginData,setLoginData] = useState({username:'',password:''});

    // submit function
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:8000/login',loginData);
            const {success,message} = response.data;

            if(success) {
                console.log('login successfully');
            }else{
                console.log(message);
            }
        }
        catch(error){
            console.error('login error',error)
        }
        
        setLoginData({username:'',password: ''});

    }


    const handleLoginChange = (e) => {
        const {name,value} = e.target;
        setLoginData((prevdata) => ({...prevdata,[name]:value,}));
    }
  return (
    <div>
     <h2>Login</h2>
     <form onSubmit={handleLoginSubmit}>
        <input type="text" name="username" placeholder="username" value={loginData.username}  onChange={handleLoginChange} required />
        <input type="text" name="password" placeholder="Password" value={loginData.password}  onChange={handleLoginChange} required />
        <button type='submit'>Login</button>
        <p>Not register yet? <Link to='/registration'>Register Here</Link> </p>
     </form>
    </div>
  )
}

export default Login;