import React, { useState } from 'react';
import './PainManagementCPT.css';

function PainManagementCPT() {
  const [searchTerm, setSearchTerm] = useState('');

  const painCPTs = [
    // Injections
    { code: '20552', description: 'Trigger point injection, 1-2 muscles', denyRate: '8%', commonDenials: ['97 - Bundled', '50 - Medical necessity'] },
    { code: '20553', description: 'Trigger point injection, 3+ muscles', denyRate: '7%', commonDenials: ['97 - Bundled'] },
    { code: '20600', description: 'Arthrocentesis, small joint', denyRate: '5%', commonDenials: ['96 - Non-covered'] },
    { code: '20605', description: 'Arthrocentesis, intermediate joint', denyRate: '5%', commonDenials: ['96 - Non-covered'] },
    { code: '20610', description: 'Arthrocentesis, major joint', denyRate: '4%', commonDenials: ['96 - Non-covered'] },
    { code: '20611', description: 'Arthrocentesis, major joint w/ ultrasound', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '62320', description: 'Epidural injection, lumbar, w/o imaging', denyRate: '12%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '62321', description: 'Epidural injection, lumbar, w/ imaging', denyRate: '10%', commonDenials: ['197 - No auth'] },
    { code: '62322', description: 'Epidural injection, caudal, w/o imaging', denyRate: '11%', commonDenials: ['197 - No auth'] },
    { code: '62323', description: 'Epidural injection, caudal, w/ imaging', denyRate: '10%', commonDenials: ['197 - No auth'] },
    { code: '62324', description: 'Epidural injection, cervical, w/o imaging', denyRate: '14%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '62325', description: 'Epidural injection, cervical, w/ imaging', denyRate: '12%', commonDenials: ['197 - No auth'] },
    { code: '62326', description: 'Epidural injection, thoracic, w/o imaging', denyRate: '13%', commonDenials: ['197 - No auth'] },
    { code: '62327', description: 'Epidural injection, thoracic, w/ imaging', denyRate: '12%', commonDenials: ['197 - No auth'] },
    { code: '64400', description: 'Nerve block, trigeminal', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '64405', description: 'Nerve block, greater occipital', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '64408', description: 'Nerve block, glossopharyngeal', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '64415', description: 'Nerve block, brachial plexus', denyRate: '10%', commonDenials: ['197 - No auth'] },
    { code: '64417', description: 'Nerve block, axillary nerve', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '64418', description: 'Nerve block, suprascapular', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '64420', description: 'Nerve block, intercostal', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '64421', description: 'Nerve block, intercostal multiple', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '64425', description: 'Nerve block, ilioinguinal', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '64430', description: 'Nerve block, pudendal', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '64435', description: 'Nerve block, paracervical', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '64445', description: 'Nerve block, sciatic', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '64446', description: 'Nerve block, sciatic, popliteal', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '64447', description: 'Nerve block, femoral', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '64448', description: 'Nerve block, femoral, continuous', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '64449', description: 'Nerve block, lumbar plexus', denyRate: '10%', commonDenials: ['197 - No auth'] },
    { code: '64450', description: 'Nerve block, other peripheral', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '64451', description: 'Nerve block, paravertebral', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '64454', description: 'Nerve block, genicular', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '64455', description: 'Nerve block, plantar', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '64461', description: 'Paravertebral block, thoracic', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '64462', description: 'Paravertebral block, thoracic each', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '64463', description: 'Paravertebral block, thoracic continuous', denyRate: '10%', commonDenials: ['197 - No auth'] },
    { code: '64479', description: 'Transforaminal epidural, lumbar', denyRate: '12%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '64480', description: 'Transforaminal epidural, lumbar each', denyRate: '11%', commonDenials: ['197 - No auth'] },
    { code: '64483', description: 'Transforaminal epidural, lumbar/sacral', denyRate: '12%', commonDenials: ['197 - No auth'] },
    { code: '64484', description: 'Transforaminal epidural, lumbar each', denyRate: '11%', commonDenials: ['197 - No auth'] },
    { code: '64490', description: 'Transforaminal epidural, thoracic', denyRate: '13%', commonDenials: ['197 - No auth'] },
    { code: '64491', description: 'Transforaminal epidural, thoracic each', denyRate: '12%', commonDenials: ['197 - No auth'] },
    { code: '64492', description: 'Transforaminal epidural, thoracic multiple', denyRate: '14%', commonDenials: ['197 - No auth'] },
    { code: '64493', description: 'Transforaminal epidural, lumbar', denyRate: '12%', commonDenials: ['197 - No auth'] },
    { code: '64494', description: 'Transforaminal epidural, lumbar each', denyRate: '11%', commonDenials: ['197 - No auth'] },
    { code: '64495', description: 'Transforaminal epidural, lumbar continuous', denyRate: '13%', commonDenials: ['197 - No auth'] },
    
    // Facet injections
    { code: '64490', description: 'Facet injection, cervical', denyRate: '11%', commonDenials: ['197 - No auth'] },
    { code: '64491', description: 'Facet injection, cervical each', denyRate: '10%', commonDenials: ['197 - No auth'] },
    { code: '64492', description: 'Facet injection, cervical multiple', denyRate: '12%', commonDenials: ['197 - No auth'] },
    { code: '64493', description: 'Facet injection, lumbar', denyRate: '10%', commonDenials: ['197 - No auth'] },
    { code: '64494', description: 'Facet injection, lumbar each', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '64495', description: 'Facet injection, lumbar continuous', denyRate: '11%', commonDenials: ['197 - No auth'] },
    { code: '64633', description: 'Facet denervation, cervical', denyRate: '15%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '64634', description: 'Facet denervation, cervical each', denyRate: '14%', commonDenials: ['197 - No auth'] },
    { code: '64635', description: 'Facet denervation, lumbar', denyRate: '14%', commonDenials: ['197 - No auth'] },
    { code: '64636', description: 'Facet denervation, lumbar each', denyRate: '13%', commonDenials: ['197 - No auth'] },
    
    // SI joint
    { code: '27096', description: 'SI joint injection', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '64625', description: 'SI joint denervation', denyRate: '16%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    
    // Disc procedures
    { code: '62287', description: 'Disc decompression', denyRate: '18%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '62290', description: 'Discography, lumbar', denyRate: '14%', commonDenials: ['197 - No auth'] },
    { code: '62291', description: 'Discography, cervical', denyRate: '15%', commonDenials: ['197 - No auth'] },
    { code: '62350', description: 'Spinal cord stimulator implant', denyRate: '20%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '62351', description: 'Spinal cord stimulator revision', denyRate: '18%', commonDenials: ['197 - No auth'] },
    { code: '62355', description: 'Spinal cord stimulator removal', denyRate: '12%', commonDenials: ['197 - No auth'] },
    { code: '62360', description: 'Intrathecal pump implant', denyRate: '22%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '62361', description: 'Intrathecal pump refill', denyRate: '5%', commonDenials: ['96 - Non-covered'] },
    { code: '62362', description: 'Intrathecal pump revision', denyRate: '16%', commonDenials: ['197 - No auth'] },
    { code: '62365', description: 'Intrathecal pump removal', denyRate: '12%', commonDenials: ['197 - No auth'] },
    { code: '62367', description: 'Intrathecal pump analysis', denyRate: '4%', commonDenials: ['97 - Bundled'] },
    { code: '62368', description: 'Intrathecal pump programming', denyRate: '4%', commonDenials: ['97 - Bundled'] },
    
    // Nerve destruction
    { code: '64600', description: 'Neurolysis, trigeminal', denyRate: '13%', commonDenials: ['197 - No auth'] },
    { code: '64605', description: 'Neurolysis, trigeminal, branch', denyRate: '13%', commonDenials: ['197 - No auth'] },
    { code: '64610', description: 'Neurolysis, trigeminal, ganglion', denyRate: '14%', commonDenials: ['197 - No auth'] },
    { code: '64620', description: 'Neurolysis, intercostal', denyRate: '11%', commonDenials: ['197 - No auth'] },
    { code: '64624', description: 'Neurolysis, genicular', denyRate: '12%', commonDenials: ['197 - No auth'] },
    { code: '64625', description: 'Neurolysis, SI joint', denyRate: '14%', commonDenials: ['197 - No auth'] },
    { code: '64628', description: 'Basivertebral nerve ablation', denyRate: '25%', commonDenials: ['197 - No auth', '50 - Medical necessity', '96 - Non-covered'] },
    { code: '64629', description: 'Basivertebral nerve ablation each', denyRate: '24%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '64630', description: 'Neurolysis, pudendal', denyRate: '12%', commonDenials: ['197 - No auth'] },
    { code: '64632', description: 'Neurolysis, plantar', denyRate: '10%', commonDenials: ['197 - No auth'] },
    { code: '64633', description: 'Neurolysis, cervical facet', denyRate: '15%', commonDenials: ['197 - No auth'] },
    { code: '64634', description: 'Neurolysis, cervical facet each', denyRate: '14%', commonDenials: ['197 - No auth'] },
    { code: '64635', description: 'Neurolysis, lumbar facet', denyRate: '14%', commonDenials: ['197 - No auth'] },
    { code: '64636', description: 'Neurolysis, lumbar facet each', denyRate: '13%', commonDenials: ['197 - No auth'] },
    { code: '64640', description: 'Neurolysis, other nerve', denyRate: '11%', commonDenials: ['197 - No auth'] },
    
    // Office visits
    { code: '99202', description: 'Office visit, new, low', denyRate: '2%', commonDenials: ['11 - DX inconsistent'] },
    { code: '99203', description: 'Office visit, new, moderate', denyRate: '3%', commonDenials: ['11 - DX inconsistent'] },
    { code: '99204', description: 'Office visit, new, high', denyRate: '5%', commonDenials: ['50 - Medical necessity'] },
    { code: '99205', description: 'Office visit, new, comprehensive', denyRate: '6%', commonDenials: ['50 - Medical necessity'] },
    { code: '99211', description: 'Office visit, established, minimal', denyRate: '1%', commonDenials: [] },
    { code: '99212', description: 'Office visit, established, low', denyRate: '2%', commonDenials: [] },
    { code: '99213', description: 'Office visit, established, moderate', denyRate: '3%', commonDenials: ['11 - DX inconsistent'] },
    { code: '99214', description: 'Office visit, established, high', denyRate: '4%', commonDenials: ['50 - Medical necessity'] },
    { code: '99215', description: 'Office visit, established, comprehensive', denyRate: '5%', commonDenials: ['50 - Medical necessity'] }
  ];

  const filteredCPTs = painCPTs.filter(cpt => 
    cpt.code.includes(searchTerm) || 
    cpt.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pain-management-cpt">
      <h1>💊 Pain Management CPT Codes</h1>
      <p className="subtitle">Common interventional pain management codes</p>

      <div className="cpt-search">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by code or description..."
        />
        <span className="result-count">{filteredCPTs.length} codes found</span>
      </div>

      <div className="cpt-table-container">
        <table className="cpt-table">
          <thead>
            <tr>
              <th>CPT Code</th>
              <th>Description</th>
              <th>Deny Rate</th>
              <th>Common Denials</th>
            </tr>
          </thead>
          <tbody>
            {filteredCPTs.map((cpt, index) => (
              <tr key={index}>
                <td><span className="cpt-code">{cpt.code}</span></td>
                <td>{cpt.description}</td>
                <td>
                  <span className={`deny-rate ${parseInt(cpt.denyRate) > 15 ? 'high' : parseInt(cpt.denyRate) > 8 ? 'medium' : 'low'}`}>
                    {cpt.denyRate}
                  </span>
                </td>
                <td>
                  {cpt.commonDenials.map((denial, i) => (
                    <span key={i} className="denial-tag">{denial}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PainManagementCPT;