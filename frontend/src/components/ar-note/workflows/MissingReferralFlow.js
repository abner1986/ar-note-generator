import React, { useState, useEffect } from 'react';
import './Workflow.css';

function MissingReferralFlow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    planType: 'HMO',
    pcpName: '',
    pcpPhone: '',
    hospitalClaimFound: 'no',
    correctedAddress: 'PO BOX 74088 ATLANTA GA 30374',
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
            <input name="claimNumber" value={formData.claimNumber} onChange={handleChange} placeholder="UAS5823" />
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
            <input name="callReference" value={formData.callReference} onChange={handleChange} placeholder="SANDY09012023" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Referral Verification</h3>
        <div className="form-group">
          <label>Patient Plan Type:</label>
          <select name="planType" value={formData.planType} onChange={handleChange}>
            <option value="HMO">HMO</option>
            <option value="POS">POS</option>
            <option value="PPO">PPO</option>
            <option value="EPO">EPO</option>
          </select>
        </div>

        <div className="form-group">
          <label>PCP Name:</label>
          <input name="pcpName" value={formData.pcpName} onChange={handleChange} placeholder="DONALD OBAMA" />
        </div>

        <div className="form-group">
          <label>PCP Phone:</label>
          <input name="pcpPhone" value={formData.pcpPhone} onChange={handleChange} placeholder="800-586-9321" />
        </div>

        <div className="form-group">
          <label>Was hospital claim found?</label>
          <select name="hospitalClaimFound" value={formData.hospitalClaimFound} onChange={handleChange}>
            <option value="no">No - No hospital claim</option>
            <option value="yes">Yes - Hospital claim exists</option>
          </select>
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
          <input name="timelyLimit" value={formData.timelyLimit} onChange={handleChange} placeholder="120 days from denial" />
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
          <li>✓ Assign to client assistance to get referral from PCP</li>
          <li>✓ PCP Name: {formData.pcpName || '[PCP NAME]'} | Phone: {formData.pcpPhone || '[PCP PHONE]'}</li>
          {formData.planType === 'HMO' || formData.planType === 'POS' ? (
            <li>✓ {formData.planType} plan requires referral - Must obtain referral#</li>
          ) : (
            <li>✓ {formData.planType} plan does not require referral - Ask rep to reprocess</li>
          )}
          <li>✓ Once referral obtained, send corrected claim to: {formData.correctedAddress}</li>
          <li>✓ Must file within {formData.timelyLimit} from denial date</li>
        </ul>
      </div>
    </div>
  );
}

export default MissingReferralFlow;