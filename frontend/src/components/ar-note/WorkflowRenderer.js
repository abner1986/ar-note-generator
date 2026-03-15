import React, { useState, useEffect } from 'react';
import NoAuthorizationFlow from './workflows/NoAuthorizationFlow';
import GenericWorkflow from './workflows/GenericWorkflow';
import COBUpdateFlow from './workflows/COBUpdateFlow';
import MissingReferralFlow from './workflows/MissingReferralFlow';
import PolicyTerminatedFlow from './workflows/PolicyTerminatedFlow';
import DuplicateClaimFlow from './workflows/DuplicateClaimFlow';
import BundledServiceFlow from './workflows/BundledServiceFlow';
import PreexistingFlow from './workflows/PreexistingFlow';
import CPTDxIssueFlow from './workflows/CPTDxIssueFlow';
import MaxBenefitsFlow from './workflows/MaxBenefitsFlow';
import PrimaryPaidMaxFlow from './workflows/PrimaryPaidMaxFlow';
import NonCoveredFlow from './workflows/NonCoveredFlow';
import MedicalNecessityFlow from './workflows/MedicalNecessityFlow';
import TimelyFilingFlow from './workflows/TimelyFilingFlow';
import InvalidPOSFlow from './workflows/InvalidPOSFlow';
import OffsetFlow from './workflows/OffsetFlow';
import './WorkflowRenderer.css';

function WorkflowRenderer({ denialData, onNoteGenerated }) {
  const [formData, setFormData] = useState({});
  const [note, setNote] = useState('');

  // Map workflow_type to actual components
  const workflowMap = {
    'no_auth': NoAuthorizationFlow,
    'cob_update': COBUpdateFlow,
    'missing_referral': MissingReferralFlow,
    'policy_terminated': PolicyTerminatedFlow,
    'duplicate': DuplicateClaimFlow,
    'bundled': BundledServiceFlow,
    'preexisting': PreexistingFlow,
    'cpt_dx_issue': CPTDxIssueFlow,
    'max_benefits': MaxBenefitsFlow,
    'primary_paid_max': PrimaryPaidMaxFlow,
    'non_covered': NonCoveredFlow,
    'medical_necessity': MedicalNecessityFlow,
    'timely_filing': TimelyFilingFlow,
    'invalid_pos': InvalidPOSFlow,
    'offset': OffsetFlow,
    'generic': GenericWorkflow
  };

  // Get the workflow type from denialData or default to generic
  const workflowType = denialData?.workflow_type || 'generic';
  const WorkflowComponent = workflowMap[workflowType] || GenericWorkflow;

  // Handle form data changes from child components
  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  // Generate note whenever form data changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      const generatedNote = generateNoteFromForm();
      setNote(generatedNote);
      if (onNoteGenerated) {
        onNoteGenerated(generatedNote);
      }
    }
  }, [formData]);

  // Generate note based on form data
  const generateNoteFromForm = () => {
    let note = `DOS ${formData.dos || '[DOS]'} as per review found the claim with billed $${formData.billedAmount || '[AMOUNT]'} was submitted on ${formData.submittedDate || '[SUBMIT DATE]'} and no response received yet. `;
    
    // Add call details
    note += `Called payer and spoke with ${formData.repName || '[REP NAME]'}. `;
    
    // Add denial reason from database or form
    if (denialData?.description) {
      note += `The rep stated that the claim was denied: ${denialData.description}. `;
    } else if (formData.denialReason) {
      note += `The rep stated that the claim was denied: ${formData.denialReason}. `;
    }
    
    // Add claim and call reference
    note += `Claim# ${formData.claimNumber || '[CLAIM#]'} and Call reference# ${formData.callReference || '[REF#]'}. `;
    
    // Add any additional notes
    if (formData.notes) {
      note += `Additional notes: ${formData.notes}. `;
    }
    
    note += `Thank you.`;
    
    return note;
  };

  return (
    <div className="workflow-renderer">
      <WorkflowComponent 
        denialData={denialData}
        onFormChange={handleFormChange}
        initialData={formData}
      />
      
      {/* Live Note Preview */}
      <div className="live-preview">
        <h3>Live Note Preview</h3>
        <div className="preview-box">
          {note || 'Fill out the form above to generate your note...'}
        </div>
      </div>
    </div>
  );
}

export default WorkflowRenderer;