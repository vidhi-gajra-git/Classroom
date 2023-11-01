import React,{useState,useEffect}    from "react";
import { connect } from "react-redux";
import axios from "axios";
import {Link ,NavLink,useNavigate} from 'react-router-dom'
import {navigate} from 'react-router';

function  User({username}){
    const navigate = useNavigate();
    const[assignmentData,setAssignment]=useState();
const [redirectToAssignment, setRedirectToAssignment] = useState(false);
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.defaults.withCredentials = true;
const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});
function getCourse(){
    client.get('/courses').then(function(res) {
        setCourseData(res.data);
        // console.log(res.data)
  
    }).catch(function(error) {console.log(error);})
}

    const [courseData, setCourseData]=useState();
    useEffect(()=>{
        getCourse();
        
     } ,[])
    
    
return(
    <div>
        <div className="login-container" style={{justifyContent:'left'}}>
        
    
        
        <form >
        {courseData ? (
        <ul style={{listStyle:"none"}}>
            <h3 style={{justifySelf:'center'}}>Courses</h3>
            <hr/>
            {courseData.map((course) => (
                <li>
                <NavLink  class="nav-link" exact to={`/${course.course_name}/assignmentss`} key={course.id}  >
                    {course.course_name}
                </NavLink>
                </li>
            ))}
            
        </ul>
    ) : (
        <p>Loading course data...</p>
    )}
     <li>
                <NavLink  class="nav-link" exact to={`/submissions`}   >
                    My Submissions and Grading history
                </NavLink>
                </li>
    </form>

    </div>
    </div>

)

}
const mapStateToProps = state => ({
    username: state.profile.username
});
export default connect(mapStateToProps)(User);