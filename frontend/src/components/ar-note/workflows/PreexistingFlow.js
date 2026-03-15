import React, { useState, useEffect } from 'react';
import './Workflow.css';

function PreexistingFlow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    waitingStart: '',
    waitingEnd: '',
    lettersSent: '3',
    lastLetterDate: '',
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

  const isDOSInWaitingPeriod = () => {
    if (!formData.dos || !formData.waitingStart || !formData.waitingEnd) return null;
    const dos = new Date(formData.dos);
    const start = new Date(formData.waitingStart);
    const end = new Date(formData.waitingEnd);
    return dos >= start && dos <= end;
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
            <input name="claimNumber" value={formData.claimNumber} onChange={handleChange} placeholder="P458" />
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
            <input name="callReference" value={formData.callReference} onChange={handleChange} placeholder="SANDY10152020" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Pre-existing Condition Information</h3>
        <div className="form-group">
          <label>Waiting Period Start Date:</label>
          <input name="waitingStart" value={formData.waitingStart} onChange={handleChange} placeholder="MM/DD/YYYY" />
        </div>

        <div className="form-group">
          <label>Waiting Period End Date:</label>
          <input name="waitingEnd" value={formData.waitingEnd} onChange={handleChange} placeholder="MM/DD/YYYY" />
        </div>

        <div className="form-group">
          <label>Number of letters sent to patient:</label>
          <select name="lettersSent" value={formData.lettersSent} onChange={handleChange}>
            <option value="1">1 letter</option>
            <option value="2">2 letters</option>
            <option value="3">3 letters</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date of last letter:</label>
          <input name="lastLetterDate" value={formData.lastLetterDate} onChange={handleChange} placeholder="MM/DD/YYYY" />
        </div>
      </div>

      <div className="form-section">
        <h3>Additional Notes</h3>
        <div className="form-group">
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Any additional information..."
          />
        </div>
      </div>

      <div className="end-action-box">
        <h4>📋 End Action Required:</h4>
        <ul>
          {isDOSInWaitingPeriod() === true ? (
            <li>✓ DOS lies within waiting period - Bill the patient directly</li>
          ) : isDOSInWaitingPeriod() === false ? (
            <li>✓ DOS is outside waiting period - Ask rep to reprocess claim</li>
          ) : (
            <li>✓ Verify if DOS is within waiting period</li>
          )}
          {formData.lettersSent === '3' && (
            <li>✓ Three letters already sent - Bill the patient directly</li>
          )}
          <li>✓ Do not bill to secondary insurance - they will not process</li>
          <li>✓ Request denied EOB through fax for documentation</li>
        </ul>
      </div>
    </div>
  );
}

export default PreexistingFlow;