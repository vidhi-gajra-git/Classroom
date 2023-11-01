import React from "react";
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  return (
    <>
      <div className="welcome-container">
        <div className="welcome-content">
          <h1>Welcome to Classroom</h1>
          <p>Discover amazing content and more!</p>
          <div className="button-container">
            <Link to="/logins" className="login-button">Login</Link>
            <Link to="/signups" className="signup-button">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
