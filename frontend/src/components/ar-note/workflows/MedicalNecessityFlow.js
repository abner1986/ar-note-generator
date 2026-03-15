import React, { useState, useEffect } from 'react';
import './Workflow.css';

function MedicalNecessityFlow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    billedCpt: '',
    billedDx: '',
    previousPayment: 'no',
    previousDos: '',
    correctedAddress: 'PO BOX 31362 SALT LAKE CITY UT 30895',
    appealAddress: 'PO BOX 30559 ATLANTA GA 33589',
    timelyLimit: '120 days',
    appealTimeline: '90 days',
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
            <input name="billedAmount" type="number" value={formData.billedAmount} onChange={handleChange} placeholder="100.00" />
          </div>
          <div className="form-group">
            <label>Submission Date:</label>
            <input name="submittedDate" value={formData.submittedDate} onChange={handleChange} placeholder="MM/DD/YYYY" />
          </div>
          <div className="form-group">
            <label>Claim #:</label>
            <input name="claimNumber" value={formData.claimNumber} onChange={handleChange} placeholder="99966" />
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
            <input name="callReference" value={formData.callReference} onChange={handleChange} placeholder="89997" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Coding Information</h3>
        <div className="form-group">
          <label>Billed CPT Code:</label>
          <input name="billedCpt" value={formData.billedCpt} onChange={handleChange} placeholder="e.g., 99214" />
        </div>

        <div className="form-group">
          <label>Billed Diagnosis Code:</label>
          <input name="billedDx" value={formData.billedDx} onChange={handleChange} placeholder="e.g., M54.5" />
        </div>

        <div className="form-group">
          <label>Previous payment on this combination?</label>
          <select name="previousPayment" value={formData.previousPayment} onChange={handleChange}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {formData.previousPayment === 'yes' && (
          <div className="form-group">
            <label>Previous Payment DOS:</label>
            <input name="previousDos" value={formData.previousDos} onChange={handleChange} placeholder="MM/DD/YYYY" />
          </div>
        )}
      </div>

      <div className="form-section">
        <h3>Appeal Information</h3>
        <div className="form-group">
          <label>Corrected Claim Address:</label>
          <input name="correctedAddress" value={formData.correctedAddress} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Corrected Claim Timeline:</label>
          <input name="timelyLimit" value={formData.timelyLimit} onChange={handleChange} />
        </div>

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
          {formData.previousPayment === 'yes' ? (
            <li>✓ Previous payment found - Give DOS {formData.previousDos} to rep for reprocessing</li>
          ) : (
            <>
              <li>✓ Send to coding team to review and provide correct DX code</li>
              <li>✓ If coding provides correct DX, send corrected claim to: {formData.correctedAddress}</li>
              <li>✓ Corrected claim must be filed within {formData.timelyLimit}</li>
              <li>✓ If coding confirms DX is correct, send appeal to: {formData.appealAddress}</li>
              <li>✓ Appeal must be filed within {formData.appealTimeline}</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default MedicalNecessityFlow;