import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <section className="about-hero">
          <h1>About AI Health Companion</h1>
          <p className="about-subtitle">
            Empowering individuals to take control of their health journey
          </p>
        </section>

        <section className="about-content">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              At AI Health Companion, we believe that everyone deserves access to
              intelligent, personalized health management tools. Our mission is to
              empower individuals with the technology and insights they need to make
              informed decisions about their health and wellbeing.
            </p>
          </div>

          <div className="about-section">
            <h2>What We Do</h2>
            <p>
              We combine cutting-edge artificial intelligence with comprehensive
              health tracking to provide you with:
            </p>
            <ul className="about-list">
              <li>
                <strong>Intelligent Health Monitoring:</strong> Track your vital
                signs, symptoms, medications, and lifestyle habits in one secure
                platform.
              </li>
              <li>
                <strong>AI-Powered Insights:</strong> Receive personalized
                recommendations and early warning signs based on your health data
                patterns.
              </li>
              <li>
                <strong>Comprehensive Records:</strong> Maintain a complete digital
                health history that you can access anytime, anywhere.
              </li>
              <li>
                <strong>Privacy First:</strong> Your health data is encrypted and
                protected with the highest security standards.
              </li>
            </ul>
          </div>

          <div className="about-section">
            <h2>Our Technology</h2>
            <p>
              Built on the MERN stack (MongoDB, Express.js, React, Node.js), our
              platform combines robust backend infrastructure with a beautiful,
              intuitive user interface. We use industry-standard JWT authentication
              to keep your data secure and accessible only to you.
            </p>
          </div>

          <div className="about-section">
            <h2>Why Choose Us?</h2>
            <div className="why-choose-grid">
              <div className="why-choose-item">
                <h3>🎯 User-Centric Design</h3>
                <p>
                  Every feature is designed with you in mind, making health tracking
                  simple and intuitive.
                </p>
              </div>
              <div className="why-choose-item">
                <h3>🔬 Evidence-Based</h3>
                <p>
                  Our AI recommendations are based on established medical knowledge
                  and best practices.
                </p>
              </div>
              <div className="why-choose-item">
                <h3>🔐 Security First</h3>
                <p>
                  Your privacy and data security are our top priorities, with
                  end-to-end encryption.
                </p>
              </div>
              <div className="why-choose-item">
                <h3>📱 Always Accessible</h3>
                <p>
                  Access your health information from any device, wherever you are.
                </p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Get Started Today</h2>
            <p>
              Join thousands of users who are taking control of their health with AI
              Health Companion. Create your free account and start your journey to
              better health management today.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
