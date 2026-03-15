import React, { useState } from 'react';
import axios from 'axios';
import WorkflowRenderer from './WorkflowRenderer';
import './ARNoteGenerator.css';

function ARNoteGenerator() {
  const [carcCode, setCarcCode] = useState('');
  const [denialData, setDenialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedNote, setGeneratedNote] = useState('');

  const handleCodeSearch = async () => {
    if (!carcCode) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/api/denial/${carcCode}`);
      setDenialData(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching code:', err);
      setError(`Code "${carcCode}" not found. Please try again.`);
      setDenialData(null);
      setGeneratedNote('');
    } finally {
      setLoading(false);
    }
  };

  const handleNoteGenerated = (note) => {
    setGeneratedNote(note);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedNote);
    alert('Note copied to clipboard!');
  };

  return (
    <div className="ar-note-generator">
      <h1>📝 AR Note Generator</h1>
      <p className="subtitle">Create professional AR notes instantly</p>
      
      <div className="search-section">
        <input
          type="text"
          value={carcCode}
          onChange={(e) => setCarcCode(e.target.value.toUpperCase())}
          placeholder="Enter CARC/RARC code (e.g., 197, 16, M76)"
          onKeyPress={(e) => e.key === 'Enter' && handleCodeSearch()}
        />
        <button onClick={handleCodeSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Find Denial Reason'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {denialData && (
        <div className="note-workspace">
          <div className="denial-info">
            <h2>
              <span className={`code-type-badge ${denialData.code_type}`}>
                {denialData.code_type}
              </span>
              Code: {denialData.code}
            </h2>
            <p><strong>Description:</strong> {denialData.description}</p>
            {denialData.category_name && (
              <p><strong>Category:</strong> {denialData.category_name}</p>
            )}
            {denialData.typical_actions && (
              <p><strong>Typical Actions:</strong> {denialData.typical_actions}</p>
            )}
          </div>
          
          <WorkflowRenderer 
            denialData={denialData}
            onNoteGenerated={handleNoteGenerated}
          />

          {generatedNote && (
            <div className="note-actions">
              <button className="copy-btn" onClick={copyToClipboard}>
                📋 Copy Note to Clipboard
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ARNoteGenerator;