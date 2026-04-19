
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to AI Health Companion</h1>
            <p className="hero-subtitle">
              Your intelligent partner for better health management
            </p>
            <p className="hero-description">
              Track your health metrics, get AI-powered insights, and take control
              of your wellbeing with our comprehensive health monitoring platform.
            </p>
            <div className="hero-buttons">
              {user ? (
                <Link to="/dashboard" className="btn btn-primary btn-large">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-large">
                    Get Started
                  </Link>
                  <Link to="/login" className="btn btn-secondary btn-large">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose AI Health Companion?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Health Tracking</h3>
              <p>
                Monitor vital health metrics including blood pressure, heart rate,
                weight, and more in one centralized location.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Insights</h3>
              <p>
                Receive intelligent recommendations and insights based on your
                health data and patterns.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy Access</h3>
              <p>
                Access your health records anytime, anywhere with our secure and
                user-friendly platform.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>
                Your health data is encrypted and protected with industry-standard
                security measures.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💊</div>
              <h3>Medication Tracking</h3>
              <p>
                Keep track of your medications, dosages, and schedules to stay on
                top of your treatment.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Progress Monitoring</h3>
              <p>
                Visualize your health journey with detailed reports and trend
                analysis over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Take Control of Your Health?</h2>
          <p>Join thousands of users who trust AI Health Companion</p>
          {!user && (
            <Link to="/register" className="btn btn-primary btn-large">
              Create Free Account
            </Link>
          )}
        </div>
      </section>

      {/* ✅ Footer Section */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-about">
            <h3>AI Health Companion</h3>
            <p>
              Empowering users with AI-driven health insights to lead healthier, more informed lives.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Email: support@aihealthcompanion.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AI Health Companion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
