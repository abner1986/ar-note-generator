import React, { useState, useEffect } from 'react';
import './Workflow.css';

function GenericWorkflow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    denialReason: denialData?.description || '',
    actionTaken: denialData?.resolution || '',
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
            <input name="repName" value={formData.repName} onChange={handleChange} placeholder="Rep Name" />
          </div>
          <div className="form-group">
            <label>Call Reference:</label>
            <input name="callReference" value={formData.callReference} onChange={handleChange} placeholder="Call Reference" />
          </div>
        </div>
        <div className="form-group">
          <label>Denial Reason (from rep):</label>
          <textarea name="denialReason" value={formData.denialReason} onChange={handleChange} rows={2} placeholder="What did the rep say?" />
        </div>
      </div>

      <div className="form-section">
        <h3>Action Taken</h3>
        <div className="form-group">
          <textarea name="actionTaken" value={formData.actionTaken} onChange={handleChange} rows={3} placeholder="What action did you take?" />
        </div>
      </div>

      <div className="form-section">
        <h3>Additional Notes</h3>
        <div className="form-group">
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} placeholder="Any additional information..." />
        </div>
      </div>

      <div className="end-action-box">
        <h4>📋 Next Steps:</h4>
        <p>{denialData?.typical_actions || 'Review denial and determine appropriate action'}</p>
      </div>
    </div>
  );
}

export default GenericWorkflow;