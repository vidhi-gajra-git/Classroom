import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../signup.css';

const UserSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [date, setDate] = useState('');

  const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

  useEffect(() => {
    const fetchSubmissions = async () => {
      setSubmissions([])
      try {
        const response = await client.get(`/usersubmission?date=${date}`);
        const submissionsData = response.data;
        setSubmissions(submissionsData);
        console.log(submissionsData);

        // Fetch grades for each submission
        const updatedSubmissions = await Promise.all(
          submissionsData.map(async (submission) => {
            const gradeResponse = await client.get(`grades/${submission.submission_id}`);
            const gradeData = gradeResponse.data;
            
            const updatedSubmission = { ...submission, grade: gradeData.grade, feedback: gradeData.feedback, teacher: gradeData.teacher };
            return updatedSubmission;
          })
        );

        setSubmissions(updatedSubmissions);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, [date]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
<div className="card-container">
<h2 className="card-title">User Submissions</h2>
<div className="card-content">
<div className="form-group">
<label htmlFor="date">Date :</label>
<input type="date" id="date" value={date} onChange={handleDateChange} />
</div>
<div className="submission-cards">
{submissions.map((submission) => (
<div className="submission-card" key={submission.submission_id}>
<h3>{submission.assignment}</h3>
<p>Graded By: {submission.teacher}</p>
<p>Grade: {submission.grade}</p>
<p>Feedback: {submission.feedback}</p>
</div>
))}
</div>
</div>
</div>
  );
};

export default UserSubmissions;