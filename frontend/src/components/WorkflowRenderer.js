import React from 'react';
import NoAuthorizationFlow from './workflows/NoAuthorizationFlow';
import GenericWorkflow from './workflows/GenericWorkflow';

// Import other workflows as you create them
// import COBUpdateFlow from './workflows/COBUpdateFlow';
// import MissingReferralFlow from './workflows/MissingReferralFlow';

function WorkflowRenderer({ denialData, onNoteGenerated }) {
  // Map workflow component names to actual components
  const workflowMap = {
    'NoAuthorizationFlow': NoAuthorizationFlow,
    'GenericWorkflow': GenericWorkflow,
    // Add others as you create them
  };

  const WorkflowComponent = workflowMap[denialData?.workflow_component] || GenericWorkflow;

  return (
    <WorkflowComponent 
      denialData={denialData} 
      onNoteGenerated={onNoteGenerated}
    />
  );
}

export default WorkflowRenderer;