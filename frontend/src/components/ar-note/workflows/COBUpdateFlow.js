import React, { useState, useEffect } from 'react';
import './Workflow.css';

function COBUpdateFlow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    lettersSent: '2',
    lastLetterDate: '',
    patientContacted: 'no',
    secondaryInsurance: 'no',
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
            <input name="claimNumber" value={formData.claimNumber} onChange={handleChange} placeholder="XYZ5823" />
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
            <input name="callReference" value={formData.callReference} onChange={handleChange} placeholder="SANDY12052023" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>COB Verification</h3>
        <div className="form-group">
          <label>How many letters sent to patient?</label>
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

        <div className="form-group">
          <label>Has patient been contacted?</label>
          <select name="patientContacted" value={formData.patientContacted} onChange={handleChange}>
            <option value="no">No - Patient not contacted</option>
            <option value="yes">Yes - Patient contacted</option>
          </select>
        </div>

        <div className="form-group">
          <label>Is there secondary insurance?</label>
          <select name="secondaryInsurance" value={formData.secondaryInsurance} onChange={handleChange}>
            <option value="no">No secondary insurance</option>
            <option value="yes">Yes - Secondary exists</option>
          </select>
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
          {formData.lettersSent === '3' ? (
            <li>✓ Three letters already sent - Bill the patient directly</li>
          ) : formData.lettersSent === '2' && new Date() - new Date(formData.lastLetterDate) > 30 * 24 * 60 * 60 * 1000 ? (
            <li>✓ Last letter sent over 30 days ago - Bill the patient</li>
          ) : (
            <li>✓ Request third letter from payer and allow 30 days for response</li>
          )}
          {formData.secondaryInsurance === 'yes' && (
            <li>✓ Check eligibility of secondary insurance and bill if active</li>
          )}
          <li>✓ Patient should call member benefits at 877-852-4230 to update COB</li>
        </ul>
      </div>
    </div>
  );
}

export default COBUpdateFlow;