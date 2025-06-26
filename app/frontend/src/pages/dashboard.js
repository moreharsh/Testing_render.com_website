import React from 'react';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://127.0.0.1:5000/logout', {
        method: 'POST',
        credentials: 'include'
      });
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Relax</h2>
        <nav>
          <ul>
            <li><a href="#">Overview</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Progress</a></li>
            <li><a href="#">Resources</a></li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome Back</h1>
          <p>Relax your mind. Track your progress. Enjoy the journey.</p>
        </header>

        <section className="dashboard-grid">
          <div className="card">
            <h3>Mindfulness Score</h3>
            <p>82%</p>
          </div>
          <div className="card">
            <h3>Daily Sessions</h3>
            <p>3</p>
          </div>
          <div className="card">
            <h3>Time Spent</h3>
            <p>45 mins</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
