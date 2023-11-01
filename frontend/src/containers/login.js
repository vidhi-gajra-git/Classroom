import React from "react";
import {useState} from 'react';
import {login} from '../actions/auth';
import {useNavigate} from 'react-router-dom'
import{connect} from 'react-redux';
import CSRFToken from "../components/CSRFTokens";   
import '../signup.css';
const  Login=({login,isAuthenticated})=>{
    const navigate = useNavigate();
  
//     const [username, setUsername] = useState('');
// const [password, setPassword] = useState('');
// const [confirmPassword, setConfirmPassword] = useState('');
const [formData,setFormData] = useState({password:'',email:'' });
const[accountCreated,setAccountCreated] = useState(false)
const [errorMessage, setErrorMessage] = useState('');
// -------------Input Handler --------------------------------
function Change(e)
{   console.log(formData);
    setFormData({...formData,[e.target.name]: e.target.value});}
const {password,email} =formData ;

const Submit=(e)=>{
    e.preventDefault();
    console.log(formData)
    login(email, password)
      .then(() => {
        // Redirect after successful login
        navigate('/dashboards');
      })
      .catch((error) => {
        // Handle login error and set error message state
        setErrorMessage(error.message );
      });
}
 
if (isAuthenticated){
    navigate('/dashboards')
}


////////////////////////////////////////////////////////////////


//-------------auth function--------------------------------
// function submitRegistration(e) {
//     e.preventDefault();
//     console.log(email,username,password);
//     client.post(
//       "http://127.0.0.1:8000/signup",
//       {
//         email: email,
//         username: username,
//         password: password,
      
//       },
     
//     ).then(function(res) {
//       client.post(
//         "http://127.0.0.1:8000/login",
//         {
//           email: email,
//           password: password
//         } 
//       ).then(function(res) {
//         setUserData(res.data)
//         console.log(res.data)
        
//         // setHeaders( {
        
//         //   'Content-Type': 'application/json', // Adjust content type as needed
//         // });
//         setCurrentUser(true);
//       });
//     });}

////////////////////////////////////////////////////////////////

else {
    return (
        <div> <div className="signup-container">
        <div className="signup-form">
          <h2>Login
          </h2>
          <form onSubmit={Submit}>
            <CSRFToken/>
            {/* <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={Change}
                required
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={Change}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={Change}
                required
              />
            </div>
            
            <p className="error-message" style={{color:"white"}}>{errorMessage}</p>
            <button type="submit" className="signup-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>)}
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);