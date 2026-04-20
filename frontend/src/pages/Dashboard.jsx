import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';
import Swal from "sweetalert2";
import ChatBot from './ChatBot';

const Dashboard = () => {
  const { user } = useAuth();
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'anxiety',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    fetchHealthRecords();
  }, []);

  const fetchHealthRecords = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/health`);
      setHealthRecords(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch health records');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('metrics.')) {
      const metricName = name.split('.')[1];
      setFormData({
        ...formData,
        metrics: { ...formData.metrics, [metricName]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOpenChat = (record) => {
    setSelectedRecord(record);
    setShowChat(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/health`, formData);
      setSuccess('Health record added successfully!');
      setShowAddForm(false);
      setFormData({
        type: 'anxiety',
        description: ''
      });
      fetchHealthRecords();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add health record');
    }
  };



  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/health/${id}`);

        Swal.fire({
          title: "Deleted!",
          text: "Your record has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        fetchHealthRecords();
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete health record",
          icon: "error",
        });
      }
    }
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'high':
        return '#e74c3c';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  if (loading) {
    return <div className="loading">Loading your health dashboard...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {user?.name}!</h1>
            <p>Manage your health records and track your wellness journey</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : '+ Add Health Record'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {showAddForm && (
          <div className="card add-record-form ai-form">

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Health Type</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="e.g. fatigue, anxiety, fever, sleep issue"
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your symptoms in detail..."
                  rows="5"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Add Record
              </button>

            </form>
          </div>
        )}

        <div className="health-records">
          <h2>Your Health Records</h2>
          {healthRecords.length === 0 ? (
            <div className="no-records">
              <p>No health records yet. Start tracking your health today!</p>
            </div>
          ) : (
            <div className="records-grid">
              {healthRecords.map((record) => (
                <div key={record._id} className="record-card">
                  <div className="record-header">
                    <span className={`record-type type-${record.type}`}>
                      {record.type}
                    </span>
                    <span
                      className="risk-badge"
                      style={{
                        backgroundColor: getRiskLevelColor(
                          // record.aiAnalysis?.riskLevel
                          record.aiAnalysis?.riskLevel?.toLowerCase()
                        ),
                      }}
                    >
                      {record.aiAnalysis?.riskLevel || 'N/A'} risk
                    </span>
                  </div>

                  <h3>{record.title}</h3>
                  <p className="record-description">{record.description}</p>


                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                    <div className="record-date">
                      {new Date(record.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>

                    <p style={{ margin: 0 }}>
                      Score: {record.aiAnalysis.healthScore}
                    </p>

                  </div>

                  {record.aiAnalysis?.recommendations && (
                    <div className="ai-insights">
                      <h4>AI Recommendations:</h4>
                      <ul className="scroll-list">
                        {record.aiAnalysis.recommendations.map((rec, i) => (
                          <li key={i}>✔ {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="btn-group">
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => handleDelete(record._id)}
                    >
                      Delete
                    </button>

                    <button
                      className="btn btn-primary btn-small"
                      onClick={() => handleOpenChat(record)}
                    >
                      Chat with AI
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showChat && (
        <ChatBot
          record={selectedRecord}
          onClose={() => setShowChat(false)}
        />
      )}

    </div>
  );
};

export default Dashboard;
