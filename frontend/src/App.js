import './App.css';
import './styles.css'

import Cookies from 'js-cookie';
// import Assignment from './containers/assignment.js'
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './hocs/Layout';
// import Navbar from './containers/Navbar';
import Home from './containers/Home';
import {Provider} from 'react-redux';
import store from './store'
import User from './containers/dashboard'
import UserSubmissions from './containers/grades';
import Assignment from './containers/assignment';
// import User from './containers/userlogin.js'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
// import { Redirect } from 'react-router-dom';

import Login from './containers/login'
import SignUp from './containers/signup'


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const App=()=> {return(
  <Provider store={store}>
  <Router>
    <Layout>
      <Routes>
       <Route exact path='/' element={<Home/>}/>
      
      <Route exact path='/signups' element={<SignUp/>}/>
      <Route exact path='/logins' element={<Login/>}/>  
      <Route exact path='/dashboards' element={<User/>}/>  
      <Route exact path='/submissions' element={<UserSubmissions/>}/>  
      <Route exact path='/:course_name/assignmentss' element={<Assignment/>}/>  

      </Routes>






    </Layout>
  </Router></Provider>)

  }
export default App;