import React, { useState, useEffect } from 'react';
import './Workflow.css';

function PolicyTerminatedFlow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    effectiveDate: '',
    termDate: '',
    otherInsurance: 'no',
    otherPayerName: '',
    previousPayment: 'no',
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
            <input name="claimNumber" value={formData.claimNumber} onChange={handleChange} placeholder="XYN5823" />
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
            <input name="callReference" value={formData.callReference} onChange={handleChange} placeholder="SANDY09082020" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Policy Information</h3>
        <div className="form-group">
          <label>Policy Effective Date:</label>
          <input name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} placeholder="MM/DD/YYYY" />
        </div>

        <div className="form-group">
          <label>Policy Term Date:</label>
          <input name="termDate" value={formData.termDate} onChange={handleChange} placeholder="MM/DD/YYYY" />
        </div>
      </div>

      <div className="form-section">
        <h3>Other Insurance Verification</h3>
        <div className="form-group">
          <label>Is there other active insurance?</label>
          <select name="otherInsurance" value={formData.otherInsurance} onChange={handleChange}>
            <option value="no">No - No other insurance</option>
            <option value="yes">Yes - Other insurance exists</option>
          </select>
        </div>

        {formData.otherInsurance === 'yes' && (
          <div className="form-group">
            <label>Other Payer Name:</label>
            <input name="otherPayerName" value={formData.otherPayerName} onChange={handleChange} placeholder="e.g., Cigna, Aetna" />
          </div>
        )}

        <div className="form-group">
          <label>Previous payment on other DOS?</label>
          <select name="previousPayment" value={formData.previousPayment} onChange={handleChange}>
            <option value="no">No - No previous payment</option>
            <option value="yes">Yes - Previous payment found</option>
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
          {formData.otherInsurance === 'yes' ? (
            <>
              <li>✓ Other insurance found - Make primary and resubmit claim</li>
              <li>✓ Primary Payer: {formData.otherPayerName || '[PAYER NAME]'}</li>
            </>
          ) : (
            <li>✓ No other insurance available - Bill patient directly</li>
          )}
          {formData.previousPayment === 'yes' && (
            <li>✓ Previous payment found - Check eligibility and resubmit to that payer</li>
          )}
          <li>✓ Request denied EOB through fax for documentation</li>
        </ul>
      </div>
    </div>
  );
}

export default PolicyTerminatedFlow;