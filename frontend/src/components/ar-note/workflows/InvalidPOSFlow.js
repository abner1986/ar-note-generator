import React, { useState, useEffect } from 'react';
import './Workflow.css';

function InvalidPOSFlow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    billedPos: '',
    correctPos: '',
    hospitalClaimFound: 'no',
    hospitalPos: '',
    correctedAddress: 'PO BOX 31362 SALT LAKE CITY UT 30895',
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

  const posCodes = {
    '11': 'Office',
    '12': 'Home',
    '21': 'Inpatient Hospital',
    '22': 'Outpatient Hospital',
    '23': 'Emergency Room',
    '24': 'Ambulatory Surgical Center',
    '25': 'Birthing Center',
    '26': 'Military Treatment Facility',
    '31': 'Skilled Nursing Facility',
    '32': 'Nursing Facility',
    '33': 'Custodial Care Facility',
    '34': 'Hospice',
    '41': 'Ambulance - Land',
    '42': 'Ambulance - Air',
    '51': 'Inpatient Psychiatric',
    '52': 'Outpatient Psychiatric',
    '53': 'Community Mental Health',
    '54': 'Intermediate Care Facility',
    '55': 'Residential Substance Abuse',
    '56': 'Psychiatric Residential',
    '61': 'Comprehensive Inpatient Rehab',
    '62': 'Comprehensive Outpatient Rehab',
    '71': 'Public Health Clinic',
    '72': 'Rural Health Clinic',
    '81': 'Independent Laboratory',
    '99': 'Other Place of Service'
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
            <input name="claimNumber" value={formData.claimNumber} onChange={handleChange} placeholder="667799" />
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
            <input name="callReference" value={formData.callReference} onChange={handleChange} placeholder="88775" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Place of Service Information</h3>
        <div className="form-group">
          <label>Billed POS Code:</label>
          <input name="billedPos" value={formData.billedPos} onChange={handleChange} placeholder="e.g., 11" />
          {formData.billedPos && posCodes[formData.billedPos] && (
            <small className="helper-text">({posCodes[formData.billedPos]})</small>
          )}
        </div>

        <div className="form-group">
          <label>Correct POS (from rep):</label>
          <input name="correctPos" value={formData.correctPos} onChange={handleChange} placeholder="e.g., 21" />
          {formData.correctPos && posCodes[formData.correctPos] && (
            <small className="helper-text">({posCodes[formData.correctPos]})</small>
          )}
        </div>

        <div className="form-group">
          <label>Was hospital claim found on this DOS?</label>
          <select name="hospitalClaimFound" value={formData.hospitalClaimFound} onChange={handleChange}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {formData.hospitalClaimFound === 'yes' && (
          <div className="form-group">
            <label>POS on Hospital Claim:</label>
            <input name="hospitalPos" value={formData.hospitalPos} onChange={handleChange} placeholder="e.g., 21" />
          </div>
        )}
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
          {formData.correctPos ? (
            <li>✓ Update POS from {formData.billedPos || '[BILLED]'} to {formData.correctPos} and send corrected claim</li>
          ) : formData.hospitalPos ? (
            <li>✓ Use hospital claim POS {formData.hospitalPos} and send corrected claim</li>
          ) : (
            <li>✓ Assign to coding team to review and provide correct POS</li>
          )}
          <li>✓ Corrected claim address: {formData.correctedAddress}</li>
          <li>✓ Must file within {formData.timelyLimit} from denial date</li>
          {!formData.correctPos && !formData.hospitalPos && (
            <li>✓ If coding confirms correct POS, call insurance to reprocess or send appeal</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default InvalidPOSFlow;