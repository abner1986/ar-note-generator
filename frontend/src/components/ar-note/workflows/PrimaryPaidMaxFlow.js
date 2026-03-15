import React, { useState, useEffect } from 'react';
import './Workflow.css';

function PrimaryPaidMaxFlow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    primaryPaid: '',
    secondaryAllowed: '',
    patientResp: '',
    writeOff: '',
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

  const calculateWriteOff = () => {
    const primary = parseFloat(formData.primaryPaid) || 0;
    const allowed = parseFloat(formData.secondaryAllowed) || 0;
    return (allowed - primary).toFixed(2);
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
            <input name="claimNumber" value={formData.claimNumber} onChange={handleChange} placeholder="WEC896" />
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
            <input name="callReference" value={formData.callReference} onChange={handleChange} placeholder="4567" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Payment Information</h3>
        <div className="form-group">
          <label>Primary Paid Amount ($):</label>
          <input name="primaryPaid" type="number" value={formData.primaryPaid} onChange={handleChange} placeholder="70.00" />
        </div>

        <div className="form-group">
          <label>Secondary Allowed Amount ($):</label>
          <input name="secondaryAllowed" type="number" value={formData.secondaryAllowed} onChange={handleChange} placeholder="75.00" />
        </div>

        <div className="form-group">
          <label>Patient Responsibility ($):</label>
          <input name="patientResp" type="number" value={formData.patientResp} onChange={handleChange} placeholder="5.00" />
        </div>

        <div className="form-group">
          <label>Calculated Write-off ($):</label>
          <input 
            type="text" 
            value={calculateWriteOff()} 
            readOnly 
            className="calculated-field"
          />
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
          {parseFloat(formData.primaryPaid) >= parseFloat(formData.secondaryAllowed) ? (
            <li>✓ Primary paid (${formData.primaryPaid}) is greater than or equal to Secondary allowed (${formData.secondaryAllowed}) - Write off the charge</li>
          ) : (
            <li>✓ Primary paid (${formData.primaryPaid}) is less than Secondary allowed (${formData.secondaryAllowed}) - Ask rep to reprocess for remaining amount</li>
          )}
          <li>✓ Outstanding ${calculateWriteOff()} is provider write-off</li>
          <li>✓ Send to posting team to adjust the claim</li>
        </ul>
      </div>
    </div>
  );
}

export default PrimaryPaidMaxFlow;