import React, { useState, useEffect } from 'react';
import './Workflow.css';

function NonCoveredFlow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    planType: 'HMO',
    denialReason: 'patient_plan',
    previousPayment: 'no',
    previousDos: '',
    secondaryInsurance: 'no',
    secondaryPayer: '',
    appealAddress: 'PO BOX 30559 ATLANTA GA 3074',
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
            <input name="claimNumber" value={formData.claimNumber} onChange={handleChange} placeholder="8979" />
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
            <input name="callReference" value={formData.callReference} onChange={handleChange} placeholder="55888" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Denial Information</h3>
        <div className="form-group">
          <label>Patient Plan Type:</label>
          <select name="planType" value={formData.planType} onChange={handleChange}>
            <option value="HMO">HMO</option>
            <option value="PPO">PPO</option>
            <option value="POS">POS</option>
            <option value="EPO">EPO</option>
          </select>
        </div>

        <div className="form-group">
          <label>Denial Reason:</label>
          <select name="denialReason" value={formData.denialReason} onChange={handleChange}>
            <option value="patient_plan">Not covered under patient plan</option>
            <option value="provider_contract">Not covered under provider contract</option>
            <option value="out_of_network">Out of network</option>
          </select>
        </div>

        <div className="form-group">
          <label>Previous payment on this CPT?</label>
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

      {formData.denialReason === 'provider_contract' && (
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
      )}

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
          {formData.denialReason === 'patient_plan' ? (
            <>
              {formData.planType === 'HMO' || formData.planType === 'EPO' ? (
                <li>✓ {formData.planType} plan doesn't cover out-of-network - Denial is correct</li>
              ) : (
                <li>✓ {formData.planType} plan covers out-of-network - Ask rep to reprocess</li>
              )}
            </>
          ) : formData.denialReason === 'provider_contract' ? (
            <>
              <li>✓ Provider not eligible to bill this service - Write-off required</li>
              {formData.previousPayment === 'yes' ? (
                <li>✓ Previous payment found - Give DOS {formData.previousDos} to rep for reprocessing</li>
              ) : (
                <li>✓ Send to coding team to verify coding</li>
              )}
              <li>✓ If coding correct, send appeal to: {formData.appealAddress}</li>
            </>
          ) : (
            <li>✓ Out of network - Bill patient directly</li>
          )}

          {formData.secondaryInsurance === 'yes' ? (
            <li>✓ Bill to secondary payer: {formData.secondaryPayer || '[SECONDARY PAYER]'}</li>
          ) : (
            <li>✓ No secondary insurance - Bill patient directly</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NonCoveredFlow;