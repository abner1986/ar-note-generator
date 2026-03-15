import React, { useState, useEffect } from 'react';
import './Workflow.css';

function TimelyFilingFlow({ denialData, onFormChange, initialData }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    receivedDate: '',
    repName: '',
    timelyLimit: '60 days',
    appealAddress: 'PO BOX 30559 ATLANTA GA 33589',
    appealTimeline: '90 days',
    potflAvailable: 'no',
    potflType: '',
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

  const calculateDays = () => {
    if (!formData.dos || !formData.receivedDate) return null;
    const dos = new Date(formData.dos);
    const received = new Date(formData.receivedDate);
    const diffTime = Math.abs(received - dos);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
            <label>Date Received by Payer:</label>
            <input name="receivedDate" value={formData.receivedDate} onChange={handleChange} placeholder="MM/DD/YYYY" />
          </div>
          <div className="form-group">
            <label>Claim #:</label>
            <input name="claimNumber" value={formData.claimNumber} onChange={handleChange} placeholder="22255" />
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
            <input name="callReference" value={formData.callReference} onChange={handleChange} placeholder="6633" />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Timely Filing Information</h3>
        <div className="form-group">
          <label>Payer's Timely Filing Limit:</label>
          <input name="timelyLimit" value={formData.timelyLimit} onChange={handleChange} placeholder="60 days from DOS" />
        </div>

        <div className="form-group">
          <label>Days from DOS to Receipt:</label>
          <input 
            type="text" 
            value={calculateDays() ? `${calculateDays()} days` : 'Calculate automatically'} 
            readOnly 
            className="calculated-field"
          />
        </div>

        <div className="form-group">
          <label>Proof of Timely Filing (POTFL) Available?</label>
          <select name="potflAvailable" value={formData.potflAvailable} onChange={handleChange}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {formData.potflAvailable === 'yes' && (
          <div className="form-group">
            <label>POTFL Type:</label>
            <select name="potflType" value={formData.potflType} onChange={handleChange}>
              <option value="clearinghouse">Clearinghouse acceptance report</option>
              <option value="certified">Certified mail receipt</option>
              <option value="fax">Fax confirmation</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}
      </div>

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
          {calculateDays() && calculateDays() <= parseInt(formData.timelyLimit) ? (
            <li>✓ Claim was filed within {formData.timelyLimit} days - Ask rep to reprocess</li>
          ) : (
            <>
              <li>✓ Claim was filed after timely filing limit</li>
              {formData.potflAvailable === 'yes' ? (
                <li>✓ Send appeal with {formData.potflType} as proof of timely filing</li>
              ) : (
                <li>✓ No POTFL available - Consider writing off the claim</li>
              )}
              <li>✓ Appeal address: {formData.appealAddress}</li>
              <li>✓ Appeal must be filed within {formData.appealTimeline}</li>
            </>
          )}
          {formData.potflType === 'clearinghouse' && (
            <li>✓ Include clearinghouse acceptance report with claim submission date</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default TimelyFilingFlow;