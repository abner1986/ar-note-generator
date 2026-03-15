import React, { useState, useEffect } from 'react';
import './Workflow.css';

function NoAuthorizationFlow({ denialData, onNoteGenerated }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    authFound: 'no',
    hospitalClaimFound: 'no',
    retroAuthPossible: 'no',
    appealAddress: denialData?.appeal_address || 'PO BOX 30432 SALT LAKE CITY UT 84130-0432',
    appealTimeline: denialData?.appeal_timeline || '365 days from denial',
    claimNumber: '',
    callReference: '',
    notes: ''
  });

  // Generate note on any change
  useEffect(() => {
    const note = generateNote();
    onNoteGenerated(note);
  }, [formData]);

  const generateNote = () => {
    const today = new Date().toLocaleDateString('en-US');
    
    return `DOS ${formData.dos || '[DOS]'} as per review found the claim with billed $${formData.billedAmount || '[AMOUNT]'} was submitted on ${formData.submittedDate || '[SUBMIT DATE]'} and no response received yet, called payer UHC @ 877-842-3210 spoke with ${formData.repName || '[REP NAME]'} stated that the claim was denied stating no authorization on file. 

I checked the system unable to find the authorization# also verified the claim image no authorization was found in box#23, also checked the documents folder unable to find the authorization documents. 

So requested to rep to find any hospital claim was received on this DOS, rep checked and said ${formData.hospitalClaimFound === 'yes' ? 'hospital claim found' : 'no hospital claim was found'} on this DOS. 

So verified the possibility of retro authorization rep said ${formData.retroAuthPossible === 'yes' ? 'retro authorization is possible' : 'retro authorization is not possible'}. 

So requested the appeal information, the rep said the appeal address is ${formData.appealAddress}, and the appeal timely filing limit is ${formData.appealTimeline} from the date of denial. 

I verified the billing summary no payment was found previously on this code. 

Therefore, sending an appeal with medical records. Claim# ${formData.claimNumber || '[CLAIM#]'} and Call reference# ${formData.callReference || '[REF#]'}. 

${formData.notes ? `Additional notes: ${formData.notes}` : ''}
Thank you.`;
  };

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
            <input
              type="text"
              name="dos"
              value={formData.dos}
              onChange={handleChange}
              placeholder="MM/DD/YYYY"
            />
          </div>

          <div className="form-group">
            <label>Billed Amount ($):</label>
            <input
              type="number"
              name="billedAmount"
              value={formData.billedAmount}
              onChange={handleChange}
              placeholder="1500.00"
            />
          </div>

          <div className="form-group">
            <label>Submission Date:</label>
            <input
              type="text"
              name="submittedDate"
              value={formData.submittedDate}
              onChange={handleChange}
              placeholder="MM/DD/YYYY"
            />
          </div>

          <div className="form-group">
            <label>Claim #:</label>
            <input
              type="text"
              name="claimNumber"
              value={formData.claimNumber}
              onChange={handleChange}
              placeholder="98745"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Call Details</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Rep Name:</label>
            <input
              type="text"
              name="repName"
              value={formData.repName}
              onChange={handleChange}
              placeholder="SANDY"
            />
          </div>

          <div className="form-group">
            <label>Call Reference #:</label>
            <input
              type="text"
              name="callReference"
              value={formData.callReference}
              onChange={handleChange}
              placeholder="8578"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Verification Questions</h3>
        <div className="form-group">
          <label>Was authorization found in system/claim image?</label>
          <select name="authFound" value={formData.authFound} onChange={handleChange}>
            <option value="no">No - Not found</option>
            <option value="yes">Yes - Found</option>
          </select>
        </div>

        <div className="form-group">
          <label>Was any hospital claim found on this DOS?</label>
          <select name="hospitalClaimFound" value={formData.hospitalClaimFound} onChange={handleChange}>
            <option value="no">No - No hospital claim</option>
            <option value="yes">Yes - Hospital claim exists</option>
          </select>
        </div>

        <div className="form-group">
          <label>Is retro-authorization possible?</label>
          <select name="retroAuthPossible" value={formData.retroAuthPossible} onChange={handleChange}>
            <option value="no">No - Not possible</option>
            <option value="yes">Yes - Can request retro</option>
          </select>
        </div>
      </div>

      <div className="form-section">
        <h3>Appeal Information</h3>
        <div className="form-group">
          <label>Appeal Address:</label>
          <input
            type="text"
            name="appealAddress"
            value={formData.appealAddress}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Appeal Timeline:</label>
          <input
            type="text"
            name="appealTimeline"
            value={formData.appealTimeline}
            onChange={handleChange}
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
          <li>✓ Send appeal with complete medical records to show medical necessity</li>
          <li>✓ Appeal Address: {formData.appealAddress}</li>
          <li>✓ Timeline: Within {formData.appealTimeline}</li>
          {formData.retroAuthPossible === 'yes' && (
            <li>✓ Request retro-authorization before sending appeal</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NoAuthorizationFlow;