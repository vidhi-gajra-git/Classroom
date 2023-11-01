import React ,{Fragment,useEffect}   from "react";
import {Link ,NavLink,Navigate} from 'react-router-dom'
import {connect} from 'react-redux';
import {logout } from '../actions/auth'
import { useSelector, useDispatch } from 'react-redux'; 
// import  useHistory  from 'react-router-dom';
const  Navbar=({username,logout})=>{
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch(); // Initialize the useDispatch hook

  const handleLogout = () => {
    // Dispatch the logout action to clear user authentication
    dispatch(logout());
  };
  var authLinks;
  var guestLinks
 authLinks=(
    <Fragment>
      <li class="nav-item">
        <NavLink class="nav-link" aria-current="page" exact to='/dashboards'>Dashboard</NavLink> 
      </li>
      <li class="nav-item">
        <NavLink class="nav-link" aria-current="page" onClick={handleLogout} exact to="/">Logout</NavLink> 
      </li>
      <li class="nav-item" style={{justifySelf:"right"}}>
      <h3 style={{textJustify:'right',color:"black",fontSize:"20px"}}>Welcome {username}!</h3>
      </li>
              </Fragment>
     
  )
   guestLinks =(
      
      <Fragment>
      <li class="nav-item">
        <NavLink class="nav-link" aria-current="page" exact to='/logins'>Login</NavLink> 
      </li>
      <li class="nav-item">
        <NavLink class="nav-link" aria-current="page" exact to="/signups">SignUp</NavLink> 
      </li>
              </Fragment>)
   

    
return( <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
       
       
      
  <div class="container-fluid">
  
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/59/Google_Classroom_Logo.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top"/>
             
       
    <h1 class="navbar-brand" exact to="/"style={{margin:10}}>Classroom</h1> 
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <NavLink class="nav-link" aria-current="page" exact to='/'>Home</NavLink> 
      
 
        </li>
        { isAuthenticated? authLinks : guestLinks}
       
      </ul>
    
    </div>
  </div>
  

</nav>
       
        </div>
       
        )

}
const mapStateToProps = state => ({
 
  username:state.profile.username,

});

export default connect(mapStateToProps,{logout})( Navbar);