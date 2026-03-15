import React, { useState, useEffect } from 'react';
import './Workflow.css';

function MaxBenefitsFlow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    benefitType: 'visits',
    maxAllowed: '',
    usedAmount: '',
    metDate: '',
    secondaryInsurance: 'no',
    secondaryPayer: '',
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
            <input name="claimNumber" value={formData.claimNumber} onChange={handleChange} placeholder="558" />
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
        <h3>Benefit Information</h3>
        <div className="form-group">
          <label>Benefit Type Exhausted:</label>
          <select name="benefitType" value={formData.benefitType} onChange={handleChange}>
            <option value="visits">Visits</option>
            <option value="dollar">Dollar Amount</option>
          </select>
        </div>

        <div className="form-group">
          <label>Maximum Allowed:</label>
          <input name="maxAllowed" value={formData.maxAllowed} onChange={handleChange} placeholder="e.g., 12 visits or $5000" />
        </div>

        <div className="form-group">
          <label>Amount Used:</label>
          <input name="usedAmount" value={formData.usedAmount} onChange={handleChange} placeholder="e.g., 12 visits" />
        </div>

        <div className="form-group">
          <label>Benefits Met Date:</label>
          <input name="metDate" value={formData.metDate} onChange={handleChange} placeholder="MM/DD/YYYY" />
        </div>
      </div>

      <div className="form-section">
        <h3>Secondary Insurance</h3>
        <div className="form-group">
          <label>Is there secondary insurance?</label>
          <select name="secondaryInsurance" value={formData.secondaryInsurance} onChange={handleChange}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {formData.secondaryInsurance === 'yes' && (
          <div className="form-group">
            <label>Secondary Payer Name:</label>
            <input name="secondaryPayer" value={formData.secondaryPayer} onChange={handleChange} placeholder="e.g., Cigna, Aetna" />
          </div>
        )}
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
          {formData.secondaryInsurance === 'yes' ? (
            <li>✓ Bill to secondary payer: {formData.secondaryPayer || '[SECONDARY PAYER]'}</li>
          ) : (
            <li>✓ No secondary insurance - Bill the patient directly</li>
          )}
          <li>✓ Benefits exhausted on {formData.metDate || '[DATE]'}</li>
          <li>✓ {formData.benefitType === 'visits' ? 'Visit' : 'Dollar'} limit: {formData.maxAllowed}</li>
          <li>✓ Request EOB through fax for documentation</li>
        </ul>
      </div>
    </div>
  );
}

export default MaxBenefitsFlow;