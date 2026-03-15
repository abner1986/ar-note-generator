import React, { useState } from 'react';
import axios from 'axios';
import './DenialMatrix.css';

function DenialMatrix() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);
  const [expandedCode, setExpandedCode] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSearch = async () => {
    if (!searchTerm) return;
    
    setLoading(true);
    setError('');
    setExpandedCode(null);
    
    try {
      const response = await axios.get(`http://localhost:5000/api/search?q=${searchTerm}`);
      setResults(response.data);
      if (response.data.length === 0) {
        setError(`No codes found matching "${searchTerm}"`);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Error searching codes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCodeDetails = async (code, type, event) => {
    event.stopPropagation();
    
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/denial/${code}`);
      setSelectedCode(response.data);
      setExpandedCode(code);
    } catch (err) {
      console.error('Error fetching code details:', err);
      setError('Error fetching code details');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (code) => {
    if (expandedCode === code) {
      setExpandedCode(null);
      setSelectedCode(null);
    } else {
      const result = results.find(r => r.code === code);
      if (result) {
        fetchCodeDetails(result.code, result.code_type, { stopPropagation: () => {} });
      }
    }
  };

  const filteredResults = results.filter(result => {
    if (filter === 'all') return true;
    return result.code_type.toLowerCase() === filter.toLowerCase();
  });

  const getActionSteps = (code) => {
    if (!code) return [];
    
    const steps = [];
    
    if (code.code_type === 'CARC') {
      // CARC code logic
      if (code.resolution) {
        const resolutionSteps = code.resolution.split(/\. |\.\n|\n/).filter(s => s.trim().length > 0);
        
        if (resolutionSteps.length > 1) {
          resolutionSteps.forEach(step => {
            steps.push(`✓ ${step.trim()}${step.endsWith('.') ? '' : '.'}`);
          });
        } else {
          steps.push(`✓ ${code.resolution}`);
        }
      } else {
        steps.push('✓ Review denial details with supervisor');
        steps.push('✓ Check payer guidelines for this code');
      }
      
      if (code.category_name) {
        steps.push(`📋 Category: ${code.category_name}`);
      }
      
      if (code.typical_actions) {
        steps.push(`💡 ${code.typical_actions}`);
      }
    } else {
      // RARC code logic - show the actual resolution from database
      if (code.resolution) {
        // Split resolution into steps if it has multiple parts
        const resolutionSteps = code.resolution.split(/\. |\.\n|\n/).filter(s => s.trim().length > 0);
        
        if (resolutionSteps.length > 1) {
          resolutionSteps.forEach(step => {
            steps.push(`🔍 ${step.trim()}${step.endsWith('.') ? '' : '.'}`);
          });
        } else {
          steps.push(`🔍 ${code.resolution}`);
        }
      } else {
        // Fallback if no resolution in database
        steps.push('🔍 This is a remark code that provides context');
        steps.push('📌 Check the associated CARC code for the primary denial reason');
        steps.push('💡 Use this remark to understand what information is missing or needs correction');
      }
      
      // Add code-specific examples for common RARC codes
      if (code.code === 'M76') {
        steps.push('📌 Example: Missing Diagnosis - Add correct ICD-10 code and resubmit');
      } else if (code.code === 'M51') {
        steps.push('📌 Example: Invalid Procedure Code - Verify CPT code is active for DOS');
      } else if (code.code === 'MA04') {
        steps.push('📌 Example: Secondary COB Missing Primary - Attach primary EOB and resubmit');
      } else if (code.code === 'MA120') {
        steps.push('📌 Example: Missing CLIA Number - Add lab CLIA number to Box 23');
      } else if (code.code === 'N386') {
        steps.push('📌 Example: NCD Determination - Check CMS.gov for National Coverage Decision');
      } else if (code.code === 'N115') {
        steps.push('📌 Example: LCD Policy Alert - Check local coverage determinations');
      }
    }
    
    return steps;
  };

  return (
    <div className="denial-matrix">
      <h1>🔍 Denial Matrix</h1>
      <p className="subtitle">Search CARC and RARC codes - Click on any card to see full resolution</p>

      <div className="matrix-search">
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter code or description (e.g., 197, 16, M76, N386)"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        
        {results.length > 0 && (
          <div className="filter-chips">
            <span className="filter-label">Filter:</span>
            <button 
              className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({results.length})
            </button>
            <button 
              className={`filter-chip carc ${filter === 'carc' ? 'active' : ''}`}
              onClick={() => setFilter('carc')}
            >
              CARC ({results.filter(r => r.code_type === 'CARC').length})
            </button>
            <button 
              className={`filter-chip rarc ${filter === 'rarc' ? 'active' : ''}`}
              onClick={() => setFilter('rarc')}
            >
              RARC ({results.filter(r => r.code_type === 'RARC').length})
            </button>
          </div>
        )}
        
        {error && <div className="error-message">{error}</div>}
      </div>

      {filteredResults.length > 0 && (
        <div className="matrix-results">
          <h2>
            Search Results 
            <span className="result-count">
              {filteredResults.length} codes found
              {filter !== 'all' && ` (filtered by ${filter})`}
            </span>
          </h2>
          <div className="results-grid">
            {filteredResults.map((result, index) => (
              <div key={index} className="result-card-wrapper">
                <div 
                  className={`result-card ${result.code_type} ${expandedCode === result.code ? 'expanded' : ''}`}
                  onClick={() => toggleExpand(result.code)}
                >
                  <div className="result-header">
                    <div className="title-section">
                      <span className="code-badge">{result.code}</span>
                      <span className={`code-type ${result.code_type}`}>{result.code_type}</span>
                    </div>
                    <span className="expand-icon">
                      {expandedCode === result.code ? '▼' : '▶'}
                    </span>
                  </div>
                  
                  <p className="result-description">{result.description}</p>
                  
                  {result.category_name && (
                    <span className="category-tag">{result.category_name}</span>
                  )}

                  {expandedCode !== result.code && result.resolution && (
                    <div className="resolution-preview">
                      <span className="preview-label">Quick view:</span>
                      {result.resolution.substring(0, 60)}...
                    </div>
                  )}

                  {expandedCode === result.code && selectedCode && selectedCode.code === result.code && (
                    <div className="expanded-details">
                      <div className="expanded-section">
                        <h4>📋 Full Resolution</h4>
                        <p>{selectedCode.resolution || 'No resolution available'}</p>
                      </div>

                      <div className="expanded-section action-steps">
                        <h4>🎯 Action Steps</h4>
                        <div className="steps-list">
                          {getActionSteps(selectedCode).map((step, idx) => (
                            <div key={idx} className="step-item">{step}</div>
                          ))}
                        </div>
                      </div>

                      {selectedCode.typical_actions && (
                        <div className="expanded-section">
                          <h4>💡 Typical Actions</h4>
                          <p>{selectedCode.typical_actions}</p>
                        </div>
                      )}

                      <div className="expanded-footer">
                        <button 
                          className="action-btn small"
                          onClick={(e) => {
                            e.stopPropagation();
                            const text = `${selectedCode.code_type} ${selectedCode.code}: ${selectedCode.description}\n\nResolution:\n${selectedCode.resolution}\n\nAction Steps:\n${getActionSteps(selectedCode).join('\n')}`;
                            navigator.clipboard.writeText(text);
                            alert('Copied to clipboard!');
                          }}
                        >
                          📋 Copy Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}

export default DenialMatrix;