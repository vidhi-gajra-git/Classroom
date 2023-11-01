// const authUrl = 'http://127.0.0.1:8000/auth/login/';
const [selectedFile, setSelectedFile] = useState(null);
const [currentUser, setCurrentUser] = useState(false);
const [registrationToggle, setRegistrationToggle] = useState(false);
const [email, setEmail] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [match, setMatch] = useState(false)
const [userData, setUserData] = useState();
const [courseData, setCourseData]=useState();
const[assignmentData,setAssignment]=useState();
const [redirectToAssignment, setRedirectToAssignment] = useState(false);
const [credentials,setCredentials]=useState();
const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};
function getCSRFToken() {
// Retrieve the CSRF token from the cookies
const csrfToken = Cookies.get('csrftoken');

if (!csrfToken) {
  // Handle the case where the CSRF token is not found
  console.error('CSRF token not found in cookies.');
  return null;
}

return csrfToken;
}
useEffect(() => {
  client.get("/user")
  .then(function(res) {
    // setUserData(true);
    setCurrentUser(true);
    client.get('/courses').then(function(res) {
      setCourseData(res.data);
      console.log(res.data)

  }).catch(function(error) {console.log(error);});
  
  })
  .catch(function(error) {
    setCurrentUser(false);
  });
 }, []);
// const [headers,setHeaders] =useState();

 function submitRegistration(e) {
  e.preventDefault();
  console.log(email,username,password);
  client.post(
    "http://127.0.0.1:8000/signup",
    {
      email: email,
      username: username,
      password: password,
    
    },
   
  ).then(function(res) {
    client.post(
      "http://127.0.0.1:8000/login",
      {
        email: email,
        password: password
      } 
    ).then(function(res) {
      setUserData(res.data)
      console.log(res.data)
      
      // setHeaders( {
      
      //   'Content-Type': 'application/json', // Adjust content type as needed
      // });
      setCurrentUser(true);
    });
  });
}

const handleUpload = (assignment_title) => {
  if (selectedFile) {
      // console.log(username)
      const formData = new FormData();
      formData.append('user', email);
      formData.append('assignment', assignment_title);
      formData.append('file', selectedFile);
      client.post(`${assignment_title}/submit`, formData,{withCredentials:true} ).then(function(res) {
          console.log('Upload Success!')
      }).catch(function(error) {
          console.error('Upload Error:', error);
      });

      // ... perform the upload using axios or any other method
  } else {
      console.log('No file selected');
  }
};

function update_form_btn() {
  if (registrationToggle) {
    document.getElementById("form_btn").innerHTML = "Register";
    setRegistrationToggle(false);
  } else {
    document.getElementById("form_btn").innerHTML = "Log in";
    setRegistrationToggle(true);
  }
}




function submitLogin(e) {
  e.preventDefault();
  client.post(
    "/login",
    {
      email: email,
      password: password,
      
    },
    {
      headers: {
        'X-CSRFToken': getCSRFToken(), // Include the CSRF token in the request headers
      },
    }
  ).then(function(res) {
    console.log('Succesfully logged in!'); 

    setCurrentUser(true);
    setUserData(res.data);
    console.log(res.data)
    // console.log(userData.access);
    // x  
  
    
    // setHeaders( {
    //   Authorization: `Bearer ${userData.access}`,
    //   'Content-Type': 'application/json', // Adjust content type as needed
    // });
   
  });
}

function submitLogout(e) {
  e.preventDefault();
  client.post(
    "/logout",
    {withCredentials: true}
  ).then(function(res) {
    setCurrentUser(false);
  });
}
function handleAssignment(e,course_name){
  e.preventDefault();
  client.get(`/${course_name}/assignments`,{withCredentials:true})
  .then(function(res) {
    setAssignment(res.data);
    setRedirectToAssignment(true); // Set to true to trigger redirection
  })
  .catch(function(error) {
    console.log(error);
  });
}
function chck(e){

  if (password!=='')
  {
   setConfirmPassword(e.target.value)
   if (confirmPassword!==password){
    console.log(password,confirmPassword);
    setMatch('Passwords do not match');}
  else {
   
    setMatch('Passwords match');

  }

   
  }
}
if (redirectToAssignment) {
  return (<>
    <div className="submission-container">
          <ul className="assignment-list">
              {assignmentData.map((assignment) => (
                  <li key={assignment.id} className="assignment-item">
                      <h3>{assignment.title}</h3>
                      <p>{assignment.description}</p>
                      <p>{assignment.id}</p>
                      <p className="due-date">Due: {assignment.due_date}</p>

                      <input type="file" name="file" onChange={handleFileChange} required />
                      <button onClick={() => handleUpload(assignment.title)}>Submit</button>
                  </li>
              ))}
          </ul>
      </div></>); 
}

if (currentUser) {
  return (
    
    <div>
    <nav class="navbar">
      <div class="navbar-content">
          <h1 class="navbar-heading">Classroom</h1>
        
      </div>

  </nav>
  <div className="login-container">
      <h2>Welcome {username}!</h2>
      {console.log(courseData)}

      <form onSubmit={e => submitLogout(e)}>
      {courseData ? (
      <ul>
          {courseData.map((course) => (
              <button key={course.id} type="submit" onClick={(e)=>handleAssignment(e,course.course_name)}>
                  {course.course_name}
              </button>
          ))}
          
      </ul>
  ) : (
      <p>Loading course data...</p>
  )}

          <button type="submit">Log Out</button>
      </form>
  </div>
    </div>
  );
}
return (
  <div>
  <nav class="navbar">
      <div class="navbar-content">
          <h1 class="navbar-heading">Classroom</h1>
          <button id="form_btn" onClick={update_form_btn} >Register</button>
      </div>
  </nav>
  
  
  {
    registrationToggle ? (
      <div class="form-container">
      <div class="signup-container">
          <h2>Sign Up</h2>
          <form onSubmit={e => submitRegistration(e)}>
             
              
              <label for="username">Username:</label>
              <input type="text" id="username" name="username"  value={username} onChange={(e)=>setUsername(e.target.value)}required/>
              
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
              
              
              
              <label for="password" >Password:</label>
              <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}required/>
              
              <label for="confirm_password" >Confirm Password:</label>
              <input type="password" id="confirm_password" name="confirm_password" required onChange={chck} value={confirmPassword}/>
              <div id="msg" >{match}</div >
              <input type="submit" value="Sign Up"/>   
          </form>
          </div>
      </div>
            
    ) : (
      <div class="form-container">
      <div class="signup-container">
          <h2>Log in</h2>
          <form onSubmit={e => submitLogin(e)}>
             
              
              <label for="username">Username:</label>
              <input type="text" id="username" name="username"  value={username} onChange={(e)=>setUsername(e.target.value)}required/>
              
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
              
              
              
              <label for="password" >Password:</label>
              <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}required/>
              
              
              <button type="submit">Log In</button>
          </form>
          </div>
      </div>
       
    )
  }
  </div>
);