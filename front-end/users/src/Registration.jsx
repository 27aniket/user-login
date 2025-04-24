
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

const Registration = () => {
  const [resgistrationData,setRegistrationData] = useState({username:'',password:''});

  // submit function
  const handleRegistrationSubmit = async (e) => {
      e.preventDefault();

      try{
          const response = await axios.post('http://localhost:8000/register',resgistrationData);
          const {success,message} = response.data;

          if(success) {
              console.log('register successfully');
          }else{
              console.log(message);
          }
      }
      catch(error){
          console.error('register error',error)
      }
      
      setRegistrationData({username:'',password: ''});

  }


  const handleRegistrationChange = (e) => {
      const {name,value} = e.target;
      setRegistrationData((prevdata) => ({...prevdata,[name]:value,}));
  }
return (
  <div>
   <h2>Registration</h2>
   <form onSubmit={handleRegistrationSubmit}>
      <input type="text" name="username" placeholder="username" value={resgistrationData.username}  onChange={handleRegistrationChange} required />
      <input type="text" name="password" placeholder="Password" value={resgistrationData.password}  onChange={handleRegistrationChange} required />
      <button type='submit'>Register</button>
      <p>Already register? <Link to='/login'>Login Here</Link> </p>
   </form>
  </div>
)
}

export default Registration;