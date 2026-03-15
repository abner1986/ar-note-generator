import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-icon">🏥</span>
          <span className="brand-text">RCM AR </span>
        </Link>
      </div>
      <ul className="navbar-nav">
        <li className={isActive('/')}>
          <Link to="/">
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>
        <li className={isActive('/ar-note')}>
          <Link to="/ar-note">
            <span className="nav-icon">📝</span>
            <span className="nav-text">AR Note Generator</span>
          </Link>
        </li>
        <li className={isActive('/denial-matrix')}>
          <Link to="/denial-matrix">
            <span className="nav-icon">🔍</span>
            <span className="nav-text">Denial Matrix</span>
          </Link>
        </li>
        <li className={isActive('/radiology')}>
          <Link to="/radiology">
            <span className="nav-icon">🩻</span>
            <span className="nav-text">Radiology CPT</span>
          </Link>
        </li>
        <li className={isActive('/pain-management')}>
          <Link to="/pain-management">
            <span className="nav-icon">💊</span>
            <span className="nav-text">Pain Management</span>
          </Link>
        </li>
        <li className={isActive('/medicare-guidelines')}>
          <Link to="/medicare-guidelines">
            <span className="nav-icon">🏥</span>
            <span className="nav-text">Medicare Guidelines</span>
          </Link>
        </li>
        <li className={isActive('/payer-rules')}>
          <Link to="/payer-rules">
            <span className="nav-icon">🏢</span>
            <span className="nav-text">Payer Rules</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;