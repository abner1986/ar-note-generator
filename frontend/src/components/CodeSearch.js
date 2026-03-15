import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CodeSearch.css';

function CodeSearch({ onCodeSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentCodes, setRecentCodes] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Load recent codes from localStorage
    const saved = localStorage.getItem('recentCodes');
    if (saved) {
      setRecentCodes(JSON.parse(saved));
    }
  }, []);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/search?q=${term}`);
      setSuggestions(response.data);
      setShowDropdown(true);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleSelect = (code) => {
    // Save to recent codes
    const updated = [code, ...recentCodes.filter(c => c !== code)].slice(0, 5);
    setRecentCodes(updated);
    localStorage.setItem('recentCodes', JSON.stringify(updated));
    
    onCodeSelect(code);
    setSearchTerm('');
    setShowDropdown(false);
  };

  const handleQuickSelect = (category) => {
    // For codes not in database, user can select category
    onCodeSelect('manual', category);
  };

  return (
    <div className="code-search">
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Enter CARC/RARC code (e.g., 197, 22, 288)"
          onFocus={() => setShowDropdown(true)}
        />
        <button className="search-btn">🔍</button>
      </div>

      {showDropdown && (
        <div className="suggestions-dropdown">
          {suggestions.length > 0 ? (
            suggestions.map(s => (
              <div 
                key={s.code_value}
                className="suggestion-item"
                onClick={() => handleSelect(s.code_value)}
              >
                <span className="code">{s.code_value}</span>
                <span className="desc">{s.description}</span>
                <span className="category">{s.category_name}</span>
              </div>
            ))
          ) : searchTerm.length > 1 ? (
            <div className="no-results">
              <p>No matching codes found</p>
              <div className="manual-options">
                <p>Select category manually:</p>
                <div className="category-buttons">
                  <button onClick={() => handleQuickSelect('auth')}>Authorization</button>
                  <button onClick={() => handleQuickSelect('cob')}>COB Issue</button>
                  <button onClick={() => handleQuickSelect('bundled')}>Bundled</button>
                  <button onClick={() => handleQuickSelect('eligibility')}>Eligibility</button>
                </div>
              </div>
            </div>
          ) : null}

          {recentCodes.length > 0 && (
            <div className="recent-codes">
              <p>Recent codes:</p>
              {recentCodes.map(code => (
                <span 
                  key={code}
                  className="recent-chip"
                  onClick={() => handleSelect(code)}
                >
                  {code}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CodeSearch;