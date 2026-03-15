import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import ARNoteGenerator from './components/ar-note/ARNoteGenerator';
import DenialMatrix from './components/denial-matrix/DenialMatrix';
import RadiologyCPT from './components/radiology/RadiologyCPT';
import PainManagementCPT from './components/pain-management/PainManagementCPT';
import PayerRules from './components/payer-rules/PayerRules';
import MedicareGuidelines from './components/medicare-guidelines/MedicareGuidelines';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ar-note" element={<ARNoteGenerator />} />
          <Route path="/denial-matrix" element={<DenialMatrix />} />
          <Route path="/radiology" element={<RadiologyCPT />} />
          <Route path="/pain-management" element={<PainManagementCPT />} />
          <Route path="/medicare-guidelines" element={<MedicareGuidelines />} />
          <Route path="/payer-rules" element={<PayerRules />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;