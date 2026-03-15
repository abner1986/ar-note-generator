import React, { useState, useEffect } from 'react';
import './Workflow.css';

function NoAuthorizationFlow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    authFound: 'no',
    hospitalClaimFound: 'no',
    retroAuthPossible: 'no',
    appealAddress: denialData?.appeal_address || 'PO BOX 30432 SALT LAKE CITY UT 84130-0432',
    appealTimeline: denialData?.appeal_timeline || '365 days from denial',
    claimNumber: '',
    callReference: '',
    notes: ''
  });

  useEffect(() => {
    onFormChange(formData);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="workflow-form">
      <div className="form-section">
        <h3>Claim Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Date of Service (DOS):</label>
            <input name="dos" value={formData.dos} onChange={handleChange} placeholder="MM/DD/YYYY" />
          </div>
          <div className="form-group">
            <label>Billed Amount ($):</label>
            <input name="billedAmount" type="number" value={formData.billedAmount} onChange={handleChange} placeholder="1500.00" />
          </div>
          <div className="form-group">
            <label>Submission Date:</label>
            <input name="submittedDate" value={formData.submittedDate} onChange={handleChange} placeholder="MM/DD/YYYY" />
          </div>
          <div className="form-group">
            <label>Claim #:</label>
            <input name="claimNumber" value={formData.claimNumber} onChange={handleChange} placeholder="98745" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Call Details</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Rep Name:</label>
            <input name="repName" value={formData.repName} onChange={handleChange} placeholder="SANDY" />
          </div>
          <div className="form-group">
            <label>Call Reference #:</label>
            <input name="callReference" value={formData.callReference} onChange={handleChange} placeholder="8578" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Verification Questions</h3>
        <div className="form-group">
          <label>Was authorization found in system?</label>
          <select name="authFound" value={formData.authFound} onChange={handleChange}>
            <option value="no">No - Not found</option>
            <option value="yes">Yes - Found</option>
          </select>
        </div>

        <div className="form-group">
          <label>Was hospital claim found on this DOS?</label>
          <select name="hospitalClaimFound" value={formData.hospitalClaimFound} onChange={handleChange}>
            <option value="no">No - No hospital claim</option>
            <option value="yes">Yes - Hospital claim exists</option>
          </select>
        </div>

        <div className="form-group">
          <label>Is retro-authorization possible?</label>
          <select name="retroAuthPossible" value={formData.retroAuthPossible} onChange={handleChange}>
            <option value="no">No - Not possible</option>
            <option value="yes">Yes - Can request retro</option>
          </select>
        </div>
      </div>

      <div className="form-section">
        <h3>Appeal Information</h3>
        <div className="form-group">
          <label>Appeal Address:</label>
          <input name="appealAddress" value={formData.appealAddress} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Appeal Timeline:</label>
          <input name="appealTimeline" value={formData.appealTimeline} onChange={handleChange} />
        </div>
      </div>

      <div className="form-section">
        <h3>Additional Notes</h3>
        <div className="form-group">
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="Any additional information..." />
        </div>
      </div>

      <div className="end-action-box">
        <h4>📋 End Action Required:</h4>
        <ul>
          <li>✓ Send appeal with complete medical records</li>
          <li>✓ Appeal Address: {formData.appealAddress}</li>
          <li>✓ Timeline: Within {formData.appealTimeline}</li>
        </ul>
      </div>
    </div>
  );
}

export default NoAuthorizationFlow;