import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../App.css';
import Home from './home.png';
const About = () => {
  // Developer data
  const developers = [
    {
      name: 'Yash Aghane',
      role: 'Web Developer',
      github: '',
      instagram: 'https://instagram.com/yash'
    },
    {
      name: 'Rehan Ansari',
      role: 'Web Developer',
      github: '',
      instagram: 'https://instagram.com/rehan'
    },
    {
      name: 'Ayush Talpate',
      role: 'Web Developer',
      github: 'https://github.com/ayush',
      instagram: 'https://instagram.com/ayush'
    }
  ];

  return (
    <div className="about-page">
      {/* Header Section */}
      <div className="header">
      <div className="header-content">
        <h1>Welcome to Feedbacker</h1>
        <p>
          "Welcome to Feedbacker – Your Voice Matters! This platform bridges
          the gap between students and departments, allowing seamless feedback
          submission and in-depth analysis. Join us in shaping a better
          academic experience!"
        </p>
      </div>
      <img src={Home} alt="Feedbacker" className="header-image" />
    </div>

      {/* About Developers Section */}
      <section className="developer-section">
        <h2>About Developers</h2>
        <div className="developer-grid">
          {developers.map((dev, index) => (
            <div key={index} className="developer-card">
              <h3>{dev.name}</h3>
              <p>{dev.role}</p>
              <div className="social-icons">
                {dev.github && <a href={dev.github}><FontAwesomeIcon icon={faGithub} className="icon" /></a>}
                {dev.instagram && <a href={dev.instagram}><FontAwesomeIcon icon={faInstagram} className="icon" /></a>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
