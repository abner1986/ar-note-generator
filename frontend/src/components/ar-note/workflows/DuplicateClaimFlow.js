import React, { useState, useEffect } from 'react';
import './Workflow.css';

function DuplicateClaimFlow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    originalClaimStatus: '',
    originalClaimNumber: '',
    originalPaidAmount: '',
    originalCheckNumber: '',
    originalCheckDate: '',
    originalCashedDate: '',
    duplicateClaimNumber: '',
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
            <input name="callReference" value={formData.callReference} onChange={handleChange} placeholder="SANDY09162020" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Original Claim Information</h3>
        <div className="form-group">
          <label>Original Claim Status:</label>
          <select name="originalClaimStatus" value={formData.originalClaimStatus} onChange={handleChange}>
            <option value="">Select status</option>
            <option value="Paid">Paid</option>
            <option value="Denied">Denied</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="form-group">
          <label>Original Claim #:</label>
          <input name="originalClaimNumber" value={formData.originalClaimNumber} onChange={handleChange} placeholder="ABC1234" />
        </div>

        <div className="form-group">
          <label>Original Paid Amount ($):</label>
          <input name="originalPaidAmount" type="number" value={formData.originalPaidAmount} onChange={handleChange} placeholder="800.00" />
        </div>

        <div className="form-group">
          <label>Original Check #:</label>
          <input name="originalCheckNumber" value={formData.originalCheckNumber} onChange={handleChange} placeholder="12345678" />
        </div>

        <div className="form-group">
          <label>Original Check Date:</label>
          <input name="originalCheckDate" value={formData.originalCheckDate} onChange={handleChange} placeholder="MM/DD/YYYY" />
        </div>

        <div className="form-group">
          <label>Original Cashed Date:</label>
          <input name="originalCashedDate" value={formData.originalCashedDate} onChange={handleChange} placeholder="MM/DD/YYYY" />
        </div>
      </div>

      <div className="form-section">
        <h3>Duplicate Claim Information</h3>
        <div className="form-group">
          <label>Duplicate Claim #:</label>
          <input name="duplicateClaimNumber" value={formData.duplicateClaimNumber} onChange={handleChange} placeholder="XYB5678" />
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
          <li>✓ Two claims submitted with same information - This is a duplicate</li>
          <li>✓ Original claim {formData.originalClaimNumber || '[ORIGINAL#'} is {formData.originalClaimStatus || '[STATUS]'}</li>
          <li>✓ Send duplicate claim for adjustment/write-off</li>
          <li>✓ Request both original and duplicate EOBs through fax for records</li>
        </ul>
      </div>
    </div>
  );
}

export default DuplicateClaimFlow;