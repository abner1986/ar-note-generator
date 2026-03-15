import React, { useState, useEffect } from 'react';

function GenericWorkflow({ denialData, onNoteGenerated }) {
  const [formData, setFormData] = useState({
    dos: '',
    billedAmount: '',
    submittedDate: '',
    repName: '',
    denialReason: denialData?.description || '',
    actionTaken: '',
    claimNumber: '',
    callReference: '',
    notes: ''
  });

  useEffect(() => {
    const note = generateNote();
    onNoteGenerated(note);
  }, [formData]);

  const generateNote = () => {
    return `DOS ${formData.dos} as per review found the claim with billed $${formData.billedAmount} was submitted on ${formData.submittedDate} and no response received yet. Called payer and spoke with ${formData.repName}. The rep stated that the claim was denied: ${formData.denialReason}. 

Action taken: ${formData.actionTaken || 'Need to determine next steps'}. 

Claim# ${formData.claimNumber} and Call reference# ${formData.callReference}. 

${formData.notes}
Thank you.`;
  };

  return (
    <div className="workflow-form">
      <div className="form-section">
        <h3>Claim Information</h3>
        <div className="form-grid">
          <input name="dos" placeholder="DOS" onChange={(e) => setFormData({...formData, dos: e.target.value})} />
          <input name="billedAmount" placeholder="Billed Amount" type="number" onChange={(e) => setFormData({...formData, billedAmount: e.target.value})} />
          <input name="submittedDate" placeholder="Submission Date" onChange={(e) => setFormData({...formData, submittedDate: e.target.value})} />
          <input name="claimNumber" placeholder="Claim #" onChange={(e) => setFormData({...formData, claimNumber: e.target.value})} />
        </div>
      </div>

      <div className="form-section">
        <h3>Call Details</h3>
        <input name="repName" placeholder="Rep Name" onChange={(e) => setFormData({...formData, repName: e.target.value})} />
        <input name="callReference" placeholder="Call Reference" onChange={(e) => setFormData({...formData, callReference: e.target.value})} />
        <textarea 
          name="denialReason" 
          placeholder="What did the rep say was the denial reason?" 
          rows={3}
          value={formData.denialReason}
          onChange={(e) => setFormData({...formData, denialReason: e.target.value})}
        />
      </div>

      <div className="form-section">
        <h3>Action Taken</h3>
        <textarea 
          name="actionTaken" 
          placeholder="What action did you take?" 
          rows={3}
          onChange={(e) => setFormData({...formData, actionTaken: e.target.value})}
        />
      </div>

      <div className="form-section">
        <h3>Additional Notes</h3>
        <textarea 
          name="notes" 
          rows={3}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />
      </div>

      <div className="end-action-box">
        <h4>⚠️ Manual Review Required</h4>
        <p>This code needs to be reviewed. Consider:</p>
        <ul>
          <li>Checking with supervisor for guidance</li>
          <li>Looking up code in official CARC list</li>
          <li>Adding to database after verification</li>
        </ul>
      </div>
    </div>
  );
}

export default GenericWorkflow;