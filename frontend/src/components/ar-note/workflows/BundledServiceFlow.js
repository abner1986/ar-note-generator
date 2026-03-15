import React, { useState, useEffect } from 'react';
import './Workflow.css';

function BundledServiceFlow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    bundledCpt: '',
    primaryCpt: '',
    primaryDos: '',
    globalPeriod: '',
    modifierSuggested: '',
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
            <input name="callReference" value={formData.callReference} onChange={handleChange} placeholder="SANDY10102020" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Bundling Information</h3>
        <div className="form-group">
          <label>Bundled CPT Code:</label>
          <input name="bundledCpt" value={formData.bundledCpt} onChange={handleChange} placeholder="78452" />
        </div>

        <div className="form-group">
          <label>Primary CPT Code:</label>
          <input name="primaryCpt" value={formData.primaryCpt} onChange={handleChange} placeholder="84321" />
        </div>

        <div className="form-group">
          <label>Primary DOS:</label>
          <input name="primaryDos" value={formData.primaryDos} onChange={handleChange} placeholder="MM/DD/YYYY" />
        </div>

        <div className="form-group">
          <label>Global Period (days):</label>
          <input name="globalPeriod" value={formData.globalPeriod} onChange={handleChange} placeholder="10" />
        </div>

        <div className="form-group">
          <label>Modifier Suggested by Rep:</label>
          <input name="modifierSuggested" value={formData.modifierSuggested} onChange={handleChange} placeholder="e.g., 59, 25" />
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
          <li>✓ Send to coding team to check NCCI edits between procedures</li>
          <li>✓ If coding team provides correct modifier, send corrected claim</li>
          <li>✓ Corrected claim address: {formData.correctedAddress}</li>
          <li>✓ Timely filing: {formData.timelyLimit} from denial date</li>
          <li>✓ If DOS is within {formData.globalPeriod}-day global period, write-off is required</li>
        </ul>
      </div>
    </div>
  );
}

export default BundledServiceFlow;