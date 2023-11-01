import React, { useState,useEffect,Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteAssignment } from '../actions/profile';
const Assignment=({deleteAssignment})=> {
    const { course_name } = useParams();
    console.log(course_name)
    
const [selectedFile, setSelectedFile] = useState(null);

    const[assignmentData,setAssignment]=useState();

    // const authUrl = 'http://127.0.0.1:8000/auth/login/';
//     const [selectedFile, setSelectedFile] = useState(null);
//     axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;
// const csrfToken = (() => {
//     const cookieValue = document.cookie
//         .split('; ')
//         .find(row => row.startsWith('csrftoken='))
//         .split('=')[1];
//     return cookieValue;
// })();


const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    function handleAssignment(course_name){
           
        client.get(`/${course_name}/assignments`)
        .then(function(res) {
          setAssignment(res.data);
        
        })
        .catch(function(error) {
          console.log(error);
        });
      }
      useEffect(()=>{handleAssignment(course_name);},[course_name])
      const handleDelete =(e,assignment_id)=>{ 
        e.preventDefault();
        
        if (deleteAssignment(assignment_id)){
        alert('  assignment deleted  '+assignment_id)

        }
       
        // client.get(`${assignment_id}/delete`
        // ).then(function(res) {
        //    alert(res.data)
        // }).catch(function(error) {
        //     console.error('Upload Error:', error);
        // });

        // ... perform the upload using axios or any other method
    } 
    const handleUpdate=(e,assignment_id)=>{
        if (selectedFile) {
            console.log(assignment_id);
            const formData = new FormData();
            
            formData.append('assignment', assignment_id);
            formData.append('file', selectedFile);
            console.log(formData);
            client.post(`${assignment_id}/update`, formData, {
            headers:{
                'Content-Type': 'multipart/form-data', 
              },}
            
            ).then(function(res) {
                alert('Update Success!')
            }).catch(function(error) {
                console.error('Update Error:', error);
            });

            // ... perform the upload using axios or any other method
        } else {
            alert('No file selected');
        }
    }
    const handleUpload = (assignment_id) => {
       
        if (selectedFile) {
            console.log(assignment_id);
            const formData = new FormData();
            
            formData.append('assignment', assignment_id);
            formData.append('file', selectedFile);
            console.log(formData);
            client.post(`${assignment_id}/submit`, formData, {
            headers:{
                'Content-Type': 'multipart/form-data', 
              },}
            
            ).then(function(res) {
                alert('Upload Success!')
                console.log(res.data);
                
            }).catch(function(error) {
                alert('Upload Error:', error);
            });

            // ... perform the upload using axios or any other method
        } else {
            alert('No file selected');
        }
    };
    if (assignmentData){
    return (
        <div className="submission-container">
            <ul className="assignment-list">
                {assignmentData.map((assignment) => (
                    <li key={assignment.id} className="assignment-item">
                        <h3>{assignment.title}</h3>
                        <p>{assignment.description}</p>
                        <p>{assignment.id}</p>
                        <p className="due-date">Due: {assignment.due_date}</p>
      
                        <input type="file" name="file" onChange={handleFileChange} required />
                        <button onClick={() => handleUpload(assignment.title)}className="login-button" style={{margin:'10px'}}>Submit</button >
                        <button onClick={(e,assignment_title)=>handleDelete(e,assignment.title)} className="login-button" style={{margin:'10px'}}>Delete</button>
                        <button onClick={(e,assignment_title)=>handleUpdate(e,assignment.title)}className="login-button"style={{margin:'10px'}}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
else {
    <div>No assignments found</div>
}}

export default connect(null,{deleteAssignment}) (Assignment);
