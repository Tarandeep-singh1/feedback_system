import React, { useEffect, useState } from 'react';
import './Studentdashboard.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import PencilIcon from '@mui/icons-material/Note';
import Cookies from 'js-cookie';
import './spinner.css';

const Studentdashboard = ({ setIsLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [subject, setSubject] = useState([]);
  const [teachera,setTeacher]=useState([]);
    const [home, setHome] = useState(true);
  const [myFeedback, setMyFeedback] = useState(false);
  const [giveFeedback, setGiveFeedback] = useState(false);
  const [setting, setSetting] = useState(false);
  const [userinfos,setUserinfos]=useState([]);
  const[semester,setSemester]=useState('');
  const [email, setEmail] = useState(Cookies.get('email') || location.state?.email);
  const [feedbackedData, setFeedbackedData] = useState(null); // Holds feedback (array or object)
  const [loading, setLoading] = useState(true); // To handle loading state
  const [errorMessage, setErrorMessage] = useState(""); // For any error messages
  const [userinfotrue,setUserinfotrue]=useState(true);

  useEffect(() => {
    if (location.state?.email) {
      Cookies.set('email', location.state.email, {
        expires: 7,
        secure: true,
      });
      setEmail(location.state.email);
    }
  }, [location.state?.email]);

  const [formData, setFormData] = useState({
    Name: '',
    phoneNumber: '',
    rollNumber: '',
    department: '',
    semester: '',
  });

  // Step 2: Create onChange handler to update state with input values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [feedbackData, setFeedbackData] = useState({
    subject: '',
    teacher: '',
    knowledge: '1',
    communication: '1',
    sincerity: '1',
    interest: '1',
    integration: '1',
    accessibility: '1',
    initiative: '1',
    regularity: '1',
    completion: '1',
    fairness: '1',
    overall: '1',
    comments: '',
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`); // Debugging line
    setFeedbackData({ ...feedbackData, [name]: value });
};



  const [name, setName] = useState('student');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const result = await axios.post(
          'http://localhost:5000/api/getuserdata',
          { email },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        console.log(result);
        setName(result.data.name);
        setSemester(result.data.semester);
      } catch (error) {
        console.log('Error occurred while fetching user data:', error);
      }
    };

    if (email) {
      getUserData();
    }
  }, [email]);

 

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  async function submitFormHandler(event) {
    event.preventDefault();
    try {
    await axios.post('http://localhost:5000/api/submitform', {
        feedbackData,
        email,
      });
      console.log('formdata sent successfully');
     console.log(feedbackData);
    } catch (error) {
      console.log('Error occurred while sending final data of feedback form', error);
    }
  }
  const GiveFeedback = () => {
   
  
      // Fetch teachers and subjects based on the semester
      const fetchTeachers = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/teachers/${semester}`);
          console.log(response.data);
          setSubject(response.data.result);
          console.log(subject);
        } catch (error) {
          console.error('Error fetching teachers:', error);
        }
      };
  
      fetchTeachers();
  }

  
    useEffect(() => {
      // Prevents API call when subject or semester is empty
      if (!subject ) return;
    
      const fetchData = async () => {
        try {
          // Make API call with subject and semester as query parameters
          const response = await axios.get(
            `http://localhost:5000/api/teachergive?subject=${feedbackData.subject}&semester=${semester}`
          ); 
                   console.log(response);
          setTeacher(response.data); // Set the response data
          console.log(teachera);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData(); // Call the fetchData function
    }, [feedbackData.subject]); //
  
    const fetchFeed = async () => {
  
      setLoading(true); // Start loading
  
      try {
        // Make the API call to the backend
        const response = await axios.post("http://localhost:5000/api/feedbackgive", {
          email: email,
        });
  
        const data = response.data;
  
        // Check if feedback is empty or not
        if (!data || data.length === 0) {
          setErrorMessage("You have not submitted any feedback");
          setFeedbackedData(null); // Clear previous feedback data
        } else {
          setFeedbackedData(data); // Store the feedback data (array or object)
          console.log(data);
          console.log(feedbackedData);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
       
       // Clear feedback data in case of error
      } finally {
        setLoading(false); // Stop the loading state
      }
    }; // Empty dependency array to run on component mount
  
    const userData = {
      firstName: 'Jenny',
      lastName: 'Chen',
      email: 'jenny.chen@gmail.com',
      phoneNumber: '(123) 123-1234',
      rollNumber: '123456',
      department: 'Computer Science',
      semester: '3',
    };

    const userinfo=async()=>{
      try {
        // Make the API call to the backend
        const response = await axios.post("http://localhost:5000/api/userinfo", {
          email: email,
        });
  
        const data = response.data;
  
        // Check if feedback is empty or not
        if (!data ) {
          setErrorMessage("user is not registered");
        
        } else {
          setUserinfos(data); // Store the feedback data (array or object)
          console.log(data);
          setLoading(false); 
        }
      } catch (error) {
        console.error("Error fetching userinfo:", error);
       
       // Clear feedback data in case of error
      } 
    }

    const handleSave = async () => {
      try {
        // Send the form data to the backend using a POST request
        const response = await axios.post('http://localhost:5000/api/updateuser', {
          ...formData,
          email: email
        });
      
  
        // Handle the response (you can add success notification here)
        console.log('Data saved successfully:', response.data);
        setUserinfotrue(true);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Student Dashboard</h2>
        <ul>
          <li>
            <a
              href="#"
              onClick={() => {
                setHome(true);
                setGiveFeedback(false);
                setMyFeedback(false);
                setSetting(false);
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => {
                setHome(false);
                setGiveFeedback(true);
                GiveFeedback();
                setMyFeedback(false);
                setSetting(false);
              }}
            >
              Give Feedback
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => {
                setHome(false);
                setGiveFeedback(false);
                fetchFeed();
                setMyFeedback(true);
                setSetting(false);
              }}
            >
              My Feedback
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => {
                setHome(false);
                setGiveFeedback(false);
                setMyFeedback(false);
                userinfo();
                setSetting(true);
              }}
            >
              Setting
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => {
                setIsLogin(false);
                navigate('/');
              }}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>

      <div className="main-content">
      {home && (
        // Home Section with New Design
        <div className="dashboard-home">
          <div
            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-md items-start justify-end px-4 pb-10 @[480px]:px-10 rounded-md"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/60d93302-8e6c-4a96-aec1-a902d96d6d43.png")',
            }}
          >
            <div className="flex flex-col gap-2 text-left">
              <h1 className="text-white text-4xl font-extrabold leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                Welcome to Feedback Portal
              </h1>
              <h2 className="text-white text-base font-medium leading-relaxed @[480px]:text-lg @[480px]:leading-normal">
                Your feedback helps us improve. Remember, feedback is not about the person, it's about the behavior. In this section, you can learn more about how to give effective feedback. You can also find some tips on what to focus on when providing your review.
              </h2>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#0a1a33] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
              <span className="truncate">Give Feedback</span>
            </button>
          </div>
      
          {/* New Section: How to Give Effective Feedback */}
          <div className="feedback-guidelines mt-6 px-4 py-6 bg-[#0a1a33] rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-white">How to Give Effective Feedback</h2>
            <p className="text-base leading-relaxed mb-4 text-gray-300">
              Providing effective feedback is crucial for enhancing the learning experience and improving the student-teacher relationship. Here’s how students can give feedback under different categories:
            </p>
      
            <ul className="list-none space-y-4 text-gray-200">
              <li className="flex items-start gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-[#f0f4f8] rounded-md">
                  <PencilIcon className="text-[#0a1a33]" />
                </div>
                <div>
                  <strong className="text-white">Clarity of Teaching</strong> - Provide feedback on how clear the teacher’s explanations are during lessons. Highlight if more examples or simplified explanations would help your understanding.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-[#f0f4f8] rounded-md">
                  <PencilIcon className="text-[#0a1a33]" />
                </div>
                <div>
                  <strong className="text-white">Engagement in Lessons</strong> - Comment on how engaging and interactive the classes are. Suggest ways the teacher can make lessons more interesting, such as incorporating group discussions or multimedia elements.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-[#f0f4f8] rounded-md">
                  <PencilIcon className="text-[#0a1a33]" />
                </div>
                <div>
                  <strong className="text-white">Pace of the Class</strong> - Share your thoughts on the speed of the class. If the pace is too fast or slow, mention how adjustments could help you keep up or stay engaged.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-[#f0f4f8] rounded-md">
                  <PencilIcon className="text-[#0a1a33]" />
                </div>
                <div>
                  <strong className="text-white">Use of Resources and Materials</strong> - Give feedback on the effectiveness of the resources provided, such as slides, handouts, or online materials. Suggest additional resources that could enhance your learning.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-[#f0f4f8] rounded-md">
                  <PencilIcon className="text-[#0a1a33]" />
                </div>
                <div>
                  <strong className="text-white">Availability for Help</strong> - Comment on how accessible the teacher is for questions or additional help. If you need more office hours or opportunities for one-on-one sessions, mention this.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-[#f0f4f8] rounded-md">
                  <PencilIcon className="text-[#0a1a33]" />
                </div>
                <div>
                  <strong className="text-white">Assessment and Feedback on Work</strong> - Reflect on the quality of feedback you receive on assignments or tests. If you need more detailed feedback or clarity on grading, suggest specific improvements.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-[#f0f4f8] rounded-md">
                  <PencilIcon className="text-[#0a1a33]" />
                </div>
                <div>
                  <strong className="text-white">Classroom Environment</strong> - Give feedback on the overall classroom environment, including how comfortable and safe you feel to ask questions or express opinions.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-[#f0f4f8] rounded-md">
                  <PencilIcon className="text-[#0a1a33]" />
                </div>
                <div>
                  <strong className="text-white">Communication Style</strong> - Provide feedback on the teacher’s communication style, including tone, body language, and clarity. Suggest how clearer communication can enhance the learning experience.
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
      

        {giveFeedback && (
          <div>
          <h1>Welcome, {name}</h1>
          <h2>Give Feedback to Teacher</h2>
          <form onSubmit={handleSubmit} className="feedback-form">
         <label htmlFor="subject" className="above">
  Select Subject
</label>
<select
  id="subject"
  name="subject"
  className="above"
  value={feedbackData.subject}
  onChange={handleChange}
>
  {/* Assuming 'subjects' is an array of subject objects */}
  {subject.map((subject) => (
    <option key={subject.id} value={subject.id}> 
      {subject.subjectName} 
    </option>
  ))}
</select>

<label htmlFor="teacher" className="above">
  Select Teacher
</label>
<select
  id="teacher"
  name="teacher"
  className="teacher"
  value={feedbackData.teacher}
  onChange={handleChange}
>
<option value="">Select a Teacher</option> {/* Default empty option */}

{teachera.teachergive && teachera.teachergive !== '' ? (
  Array.isArray(teachera.teachergive) ? (
    teachera.teachergive.map((teacherItem) => (
      <option key={teacherItem} value={teacherItem}>
        {teacherItem}
      </option>
    ))
  ) : (
    <option value={teachera.teachergive}>{teachera.teachergive}</option>
  )
) : (
  <option value="">No teachers available</option>
)}
</select>
          
            <label htmlFor="knowledge">Knowledge</label>
            <input
              type="range"
              id="knowledge"
              name="knowledge"
              min="1"
              max="5"
              value={feedbackData.knowledge}
              onChange={handleChange}
            />
        
            <label htmlFor="communication">Communication</label>
            <input
              type="range"
              id="communication"
              name="communication"
              min="1"
              max="5"
              value={feedbackData.communication}
              onChange={handleChange}
            />
        
            <label htmlFor="sincerity">Sincerity</label>
            <input
              type="range"
              id="sincerity"
              name="sincerity"
              min="1"
              max="5"
              value={feedbackData.sincerity}
              onChange={handleChange}
            />
        
            <label htmlFor="interest">Interest</label>
            <input
              type="range"
              id="interest"
              name="interest"
              min="1"
              max="5"
              value={feedbackData.interest}
              onChange={handleChange}
            />
        
            <label htmlFor="integration">Integration</label>
            <input
              type="range"
              id="integration"
              name="integration"
              min="1"
              max="5"
              value={feedbackData.integration}
              onChange={handleChange}
            />
        
            <label htmlFor="accessibility">Accessibility</label>
            <input
              type="range"
              id="accessibility"
              name="accessibility"
              min="1"
              max="5"
              value={feedbackData.accessibility}
              onChange={handleChange}
            />
        
            <label htmlFor="initiative">Initiative</label>
            <input
              type="range"
              id="initiative"
              name="initiative"
              min="1"
              max="5"
              value={feedbackData.initiative}
              onChange={handleChange}
            />
        
            <label htmlFor="regularity">Regularity</label>
            <input
              type="range"
              id="regularity"
              name="regularity"
              min="1"
              max="5"
              value={feedbackData.regularity}
              onChange={handleChange}
            />
        
            <label htmlFor="completion">Completion</label>
            <input
              type="range"
              id="completion"
              name="completion"
              min="1"
              max="5"
              value={feedbackData.completion}
              onChange={handleChange}
            />
        
            <label htmlFor="fairness">Fairness</label>
            <input
              type="range"
              id="fairness"
              name="fairness"
              min="1"
              max="5"
              value={feedbackData.fairness}
              onChange={handleChange}
            />
        
            <label htmlFor="overall">Overall</label>
            <input
              type="range"
              id="overall"
              name="overall"
              min="1"
              max="5"
              value={feedbackData.overall}
              onChange={handleChange}
            />
        
            <label htmlFor="comments" className="above">
              Additional Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              value={feedbackData.comments}
              onChange={handleChange}
              className="above"
            />
        
            <button
              type="submit"
              onClick={submitFormHandler}
              className="feedback-button"
            >
              Submit Feedback
            </button>
          </form>
        </div>
        
        )}

        {myFeedback &&
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {/* Conditionally Render Feedback or Error Message */}
          {errorMessage ? (
            <p className="text-white text-center">{errorMessage}</p>
          ) : Array.isArray(feedbackedData) && feedbackedData.length > 0 ? (
            feedbackedData.map((item, index) => (
              <div key={index} className="flex flex-col gap-4 bg-[#0A1931] px-4 py-3 mb-4 rounded-xl">
                {/* Feedback rendering */}
                <div className="flex flex-1 flex-col justify-center">
                <div className="text-white text-lg font-bold leading-normal flex items-center"> 
                <p>Subject :      </p> 
                <span className="ml-2 italic text-blue-500"> { item.subject}</span> 
              </div>
              <div className="text-white text-lg font-bold leading-normal flex items-center">
                <p>Teacher :     </p> 
                <span className="ml-2 italic text-blue-500"> { item.teacher}</span> 
              </div>
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal">
                    Knowledge: {item.knowledge}
                  </p>
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal">
                    Communication: {item.communication}
                  </p>
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal">
                    Sincerity: {item.sincerity}
                  </p>
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal">
                    Interest: {item.interest}
                  </p>
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal">
                    Integration: {item.integration}
                  </p>
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal">
                    Accessibility: {item.accessibility}
                  </p>
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal">
                    Initiative: {item.initiative}
                  </p>
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal">
                    Regularity: {item.regularity}
                  </p>
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal">
                    Completion: {item.completion}
                  </p>
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal">
                    Fairness: {item.fairness}
                  </p>
                  {/* Display overall if it exists or use 'N/A' */}
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal">
                    Overall: {item.overall || "N/A"}
                  </p>
                  {item.comments && (
                    <p className="text-[#9dabb8] text-sm font-normal leading-normal mt-2">
                      Comments: {item.comments}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center">No feedback available.</p>
          )}
        </div>
        
        }
        {setting && (
          userinfotrue ? (
            <div
              className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden"
              style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
            >
              {loading ? ( // Show loading spinner while fetching data
                <div className="flex justify-center items-center min-h-screen">
                  <div className="loader"></div> {/* Spinner element */}
                </div>
              ) : userinfos ? ( // Ensure `userinfos` exists before rendering the content
                <div className="layout-container flex h-full grow flex-col">
                  <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                    <div className="flex flex-wrap justify-between gap-3 p-4">
                      <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                        Profile Information
                      </p>
                    </div>
                    <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
                      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3c4753] py-5">
                        <p className="text-[#9dabb8] text-sm font-normal leading-normal">Name</p>
                        <p className="text-white text-sm font-normal leading-normal">{userinfos?.user?.name}</p>
                      </div>
                      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3c4753] py-5">
                        <p className="text-[#9dabb8] text-sm font-normal leading-normal">Email</p>
                        <p className="text-white text-sm font-normal leading-normal">{userinfos?.user?.email}</p>
                      </div>
                      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3c4753] py-5">
                        <p className="text-[#9dabb8] text-sm font-normal leading-normal">Phone number</p>
                        <p className="text-white text-sm font-normal leading-normal">{userinfos?.user?.phonenumber}</p>
                      </div>
                      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3c4753] py-5">
                        <p className="text-[#9dabb8] text-sm font-normal leading-normal">Roll number</p>
                        <p className="text-white text-sm font-normal leading-normal">{userinfos?.user?.rollno}</p>
                      </div>
                      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3c4753] py-5">
                        <p className="text-[#9dabb8] text-sm font-normal leading-normal">Department</p>
                        <p className="text-white text-sm font-normal leading-normal">{userinfos?.user?.department}</p>
                      </div>
                      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#3c4753] py-5">
                        <p className="text-[#9dabb8] text-sm font-normal leading-normal">Semester</p>
                        <p className="text-white text-sm font-normal leading-normal">{userinfos?.user?.semester}</p>
                      </div>
                    </div>
                    <div className="flex px-4 py-3 justify-start">
                      <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                        onClick={() => setUserinfotrue(false)}
                      >
                        <span className="truncate">Edit</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center min-h-screen">
                  <p className="text-white">Failed to load profile information</p>
                </div>
              )}
            </div>
          ) : (
            <div
              className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden"
              style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
            >
              <div className="layout-container flex h-full grow flex-col">
                <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                  <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                    <div className="flex flex-wrap justify-between gap-3 p-4">
                      <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                        Edit Information
                      </p>
                    </div>
                    {[{ label: 'Name', name: 'Name', value: formData.Name }, { label: 'Phone number', name: 'phoneNumber', value: formData.phoneNumber }, { label: 'Roll number', name: 'rollNumber', value: formData.rollNumber }].map(
                      (input, index) => (
                        <div key={index} className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                          <label className="flex flex-col min-w-40 flex-1">
                            <p className="text-white text-base font-medium leading-normal pb-2">{input.label}</p>
                            <input
                              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293038] focus:border-none h-14 placeholder:text-[#9dabb8] p-4 text-base font-normal leading-normal"
                              value={input.value}
                              name={input.name}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                      )
                    )}
                    {/* Department as a select input */}
                    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                      <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-white text-base font-medium leading-normal pb-2">Department</p>
                        <select
                          className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293038] h-14 p-4 text-base font-normal leading-normal"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>Select Department</option>
                          <option value="Civil">Civil</option>
                          <option value="Mechanical">Mechanical</option>
                          <option value="Electrical">Electrical</option>
                          <option value="Computer Science">Computer Science</option>
                          <option value="Electronics">Electronics</option>
                        </select>
                      </label>
                    </div>
                
                    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                      <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-white text-base font-medium leading-normal pb-2">Semester</p>
                        <select
                          className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293038] h-14 p-4 text-base font-normal leading-normal"
                          name="semester"
                          value={formData.semester}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>Select Semester</option>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                            <option key={sem} value={sem}>
                              {sem}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div className="flex px-4 py-3 justify-start">
                      <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                        onClick={handleSave}
                      >
                        <span className="truncate">Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
        
        
       
        
    </div>
  </div>
  )}
  
  

export default Studentdashboard;


