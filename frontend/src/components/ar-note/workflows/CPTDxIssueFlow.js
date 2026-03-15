import React, { useState, useEffect } from 'react';
import './Workflow.css';

function CPTDxIssueFlow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    billedCpt: '',
    billedDx: '',
    previousPaymentDos: '',
    correctedAddress: 'PO BOX 740805 ATLANTA GA 30374',
    timelyLimit: '120 days',
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
            <input name="claimNumber" value={formData.claimNumber} onChange={handleChange} placeholder="8324" />
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
            <input name="callReference" value={formData.callReference} onChange={handleChange} placeholder="123" />
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
          <input name="billedDx" value={formData.billedDx} onChange={handleChange} placeholder="e.g., Z94.0" />
        </div>

        <div className="form-group">
          <label>Previous Payment DOS (if any):</label>
          <input name="previousPaymentDos" value={formData.previousPaymentDos} onChange={handleChange} placeholder="MM/DD/YYYY" />
        </div>
      </div>

      <div className="form-section">
        <h3>Corrected Claim Information</h3>
        <div className="form-group">
          <label>Corrected Claim Address:</label>
          <input name="correctedAddress" value={formData.correctedAddress} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Timely Filing Limit:</label>
          <input name="timelyLimit" value={formData.timelyLimit} onChange={handleChange} />
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
          {formData.previousPaymentDos ? (
            <li>✓ Previous payment found on {formData.previousPaymentDos} - Give this DOS to rep to reprocess</li>
          ) : (
            <>
              <li>✓ Assign to coding team to review CPT and DX combination</li>
              <li>✓ If coding provides correct DX, send corrected claim to: {formData.correctedAddress}</li>
              <li>✓ If coding confirms correct, send appeal to insurance</li>
            </>
          )}
          <li>✓ Timely filing: {formData.timelyLimit} from denial date</li>
        </ul>
      </div>
    </div>
  );
}

export default CPTDxIssueFlow;