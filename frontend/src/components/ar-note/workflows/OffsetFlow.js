import React, { useState, useEffect } from 'react';
import './Workflow.css';

function OffsetFlow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    allowedAmount: '',
    patientResp: '',
    offsetPatientAccount: '',
    offsetDos: '',
    offsetCpt: '',
    overpaidCheckNumber: '',
    overpaidCheckDate: '',
    overpaidCashedDate: '',
    hipaaRefused: 'no',
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
            <input name="claimNumber" value={formData.claimNumber} onChange={handleChange} placeholder="12213223" />
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
            <input name="callReference" value={formData.callReference} onChange={handleChange} placeholder="002" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Offset Information</h3>
        <div className="form-group">
          <label>Allowed Amount ($):</label>
          <input name="allowedAmount" type="number" value={formData.allowedAmount} onChange={handleChange} placeholder="60.00" />
        </div>

        <div className="form-group">
          <label>Patient Responsibility ($):</label>
          <input name="patientResp" type="number" value={formData.patientResp} onChange={handleChange} placeholder="30.00" />
        </div>
      </div>

      <div className="form-section">
        <h3>Offset Details</h3>
        <div className="form-group">
          <label>Did rep refuse due to HIPAA?</label>
          <select name="hipaaRefused" value={formData.hipaaRefused} onChange={handleChange}>
            <option value="no">No - Rep provided details</option>
            <option value="yes">Yes - Rep refused due to HIPAA</option>
          </select>
        </div>

        {formData.hipaaRefused === 'no' ? (
          <>
            <div className="form-group">
              <label>Offset Patient Account #:</label>
              <input name="offsetPatientAccount" value={formData.offsetPatientAccount} onChange={handleChange} placeholder="666633" />
            </div>

            <div className="form-group">
              <label>Offset DOS:</label>
              <input name="offsetDos" value={formData.offsetDos} onChange={handleChange} placeholder="MM/DD/YYYY" />
            </div>

            <div className="form-group">
              <label>Offset CPT Code:</label>
              <input name="offsetCpt" value={formData.offsetCpt} onChange={handleChange} placeholder="83214" />
            </div>

            <div className="form-group">
              <label>Overpaid Check #:</label>
              <input name="overpaidCheckNumber" value={formData.overpaidCheckNumber} onChange={handleChange} placeholder="55777" />
            </div>

            <div className="form-group">
              <label>Overpaid Check Date:</label>
              <input name="overpaidCheckDate" value={formData.overpaidCheckDate} onChange={handleChange} placeholder="MM/DD/YYYY" />
            </div>

            <div className="form-group">
              <label>Overpaid Cashed Date:</label>
              <input name="overpaidCashedDate" value={formData.overpaidCashedDate} onChange={handleChange} placeholder="MM/DD/YYYY" />
            </div>
          </>
        ) : (
          <div className="form-group">
            <label>Patient Account # (if provided):</label>
            <input name="offsetPatientAccount" value={formData.offsetPatientAccount} onChange={handleChange} placeholder="1234567" />
            <small className="helper-text">Rep refused other details due to HIPAA but provided account#</small>
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
          <li>✓ Claim processed towards offset - Payer previously overpaid</li>
          {formData.hipaaRefused === 'no' ? (
            <>
              <li>✓ Offset from patient account: {formData.offsetPatientAccount || '[ACCOUNT]'}</li>
              <li>✓ Original overpayment: Check #{formData.overpaidCheckNumber || '[CHECK#]'} dated {formData.overpaidCheckDate || '[DATE]'}</li>
            </>
          ) : (
            <li>✓ Offset from patient account: {formData.offsetPatientAccount || '[ACCOUNT]'} (other HIPAA-protected)</li>
          )}
          <li>✓ Send claim to posting team to close the account</li>
          <li>✓ Request EOB through fax for documentation</li>
        </ul>
      </div>
    </div>
  );
}

export default OffsetFlow;