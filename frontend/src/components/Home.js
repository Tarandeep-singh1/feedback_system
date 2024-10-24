import home from './home_photo.jpg';
import feedbackerImage from './home.png';
import dashboardImage from './admindashboard.png';
import universityLogo from './clg_logo.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

import '../App.css';

const Home = () => {
    return( 
      <div>
     
      <div> 
      <section className="hero-section">
          <div className="hero-text">
      
            <h1>Feedbacker</h1>
            <p>Your Voice Matters! This platform bridges the gap between students and departments, allowing seamless feedback submission and in-depth analysis. Join us in shaping a better academic experience!</p>
            <h2>Better Student Experience</h2>
          </div>
          <div className="hero-image">
            <img src={home} alt="Feedback Illustration" />
  
          </div>
        </section>
  
        
  
      <section className="analyzed-feedback">
      <div className="feedback-text">
        <h2>Analyzed Feedbacks</h2>
        <p>
          Our dynamic dashboard offers a centralized space for quick access to key metrics, real-time updates, and actionable insights, empowering you to manage courses and track feedback seamlessly. Gain valuable insights at a glance with our intuitive dashboard. Monitor student progress, manage courses, and analyze feedback trends effortlessly for an enhanced user experience.
        </p>
      </div>
      <div className="feedback-images">
        <img src={feedbackerImage} alt="Feedbacker Page" className="small-img" />
        <img src={dashboardImage} alt="Dashboard" className="large-img" />
      </div>
    </section>
  
    <footer className="footer">
    <div className="footer-content">
      <div className="footer-left">
        <h3 className="footer-title">FeedBacker</h3>
        <p>All rights are reserved.</p>
      </div>
      <div className="footer-socials">
       
        <FontAwesomeIcon icon={faGithub} className="fab fa-twitter" />
        <FontAwesomeIcon icon={faInstagram} className="fab fa-twitter" />
  
        <i className="fab fa-instagram"></i>
        <i className="fab fa-linkedin-in"></i>
      </div>
      <div className="footer-logo">
        <img src={universityLogo} alt="University Logo" />
      </div>
    </div>
  </footer>
      </div>
      </div>
   
    );
  };

  export default Home;
