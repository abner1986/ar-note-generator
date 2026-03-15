import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    carcCount: 0,
    rarcCount: 0,
    categoriesCount: 0
  });
  const [recentSearches, setRecentSearches] = useState([]);
  const [commonDenials, setCommonDenials] = useState([]);

  useEffect(() => {
    fetchStats();
    loadRecentSearches();
    loadCommonDenials();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/test/db');
      setStats({
        carcCount: response.data.counts.carc,
        rarcCount: response.data.counts.rarc,
        categoriesCount: response.data.counts.categories
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const loadRecentSearches = () => {
    const saved = localStorage.getItem('recentCodes');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  };

  const loadCommonDenials = () => {
    // Top 10 most common denial codes
    setCommonDenials([
      { code: '16', description: 'Missing information', count: 1542 },
      { code: '96', description: 'Non-covered service', count: 1234 },
      { code: '197', description: 'Precertification absent', count: 987 },
      { code: '97', description: 'Bundled service', count: 876 },
      { code: '50', description: 'Medical necessity', count: 765 },
      { code: '22', description: 'COB needed', count: 654 },
      { code: '18', description: 'Duplicate claim', count: 543 },
      { code: '27', description: 'Policy terminated', count: 432 },
      { code: '29', description: 'Timely filing', count: 321 },
      { code: '11', description: 'DX inconsistent', count: 210 }
    ]);
  };

  return (
    <div className="dashboard">
      <h1>🏠 Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>CARC Codes</h3>
          <p className="stat-number">{stats.carcCount}</p>
        </div>
        <div className="stat-card">
          <h3>RARC Codes</h3>
          <p className="stat-number">{stats.rarcCount}</p>
        </div>
        <div className="stat-card">
          <h3>Categories</h3>
          <p className="stat-number">{stats.categoriesCount}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>📊 Common Denial Codes</h2>
          <table className="common-denials-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Description</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              {commonDenials.map((denial, index) => (
                <tr key={index}>
                  <td><span className="code-badge">{denial.code}</span></td>
                  <td>{denial.description}</td>
                  <td>{denial.count.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-card">
          <h2>🕒 Recent Searches</h2>
          {recentSearches.length > 0 ? (
            <div className="recent-searches">
              {recentSearches.map((code, index) => (
                <span key={index} className="recent-code-chip">{code}</span>
              ))}
            </div>
          ) : (
            <p className="no-data">No recent searches</p>
          )}

          <h2 style={{ marginTop: '2rem' }}>⚡ Quick Actions</h2>
          <div className="quick-actions">
            <button className="action-btn" onClick={() => window.location.href = '/denial-matrix'}>
              🔍 Search Denial Matrix
            </button>
            <button className="action-btn" onClick={() => window.location.href = '/radiology'}>
              🩻 View Radiology CPTs
            </button>
            <button className="action-btn" onClick={() => window.location.href = '/pain-management'}>
              💊 Pain Management Codes
            </button>
            <button className="action-btn" onClick={() => window.location.href = '/payer-rules'}>
              🏢 Check Payer Rules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;