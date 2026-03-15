import React, { useState } from 'react';
import './PayerRules.css';

function PayerRules() {
  const [selectedPayer, setSelectedPayer] = useState('UHC');
  const [searchTerm, setSearchTerm] = useState('');

  const payers = [
    { 
      name: 'UHC', 
      fullName: 'UnitedHealthcare',
      phone: '877-842-3210',
      portal: 'www.uhcprovider.com',
      timelyFiling: '90 days',
      appealTimeline: '180 days',
      address: 'PO BOX 30559, ATLANTA, GA 30374'
    },
    { 
      name: 'Cigna', 
      fullName: 'Cigna Healthcare',
      phone: '800-882-5926',
      portal: 'www.cignaforhcp.com',
      timelyFiling: '90 days',
      appealTimeline: '180 days',
      address: 'PO BOX 188052, CHATTANOOGA, TN 37422'
    },
    { 
      name: 'Aetna', 
      fullName: 'Aetna Insurance',
      phone: '877-238-6242',
      portal: 'www.aetna.com',
      timelyFiling: '90 days',
      appealTimeline: '180 days',
      address: 'PO BOX 14079, LEXINGTON, KY 40512'
    },
    { 
      name: 'BCBS', 
      fullName: 'Blue Cross Blue Shield',
      phone: '800-521-2222',
      portal: 'www.bcbs.com',
      timelyFiling: '90 days',
      appealTimeline: '180 days',
      address: 'PO BOX 660046, DALLAS, TX 75266'
    },
    { 
      name: 'Humana', 
      fullName: 'Humana Insurance',
      phone: '800-457-4708',
      portal: 'www.humana.com',
      timelyFiling: '90 days',
      appealTimeline: '180 days',
      address: 'PO BOX 14601, LEXINGTON, KY 40512'
    },
    { 
      name: 'Medicare', 
      fullName: 'Medicare (CMS)',
      phone: '800-633-4227',
      portal: 'www.cms.gov',
      timelyFiling: '12 months',
      appealTimeline: '120 days',
      address: 'See MAC specific address'
    },
    { 
      name: 'Medicaid', 
      fullName: 'Medicaid (State specific)',
      phone: 'Varies by state',
      portal: 'Varies by state',
      timelyFiling: '90-365 days',
      appealTimeline: '90 days',
      address: 'State specific'
    }
  ];

  const payerRules = [
    { 
      payer: 'UHC',
      category: 'Authorization',
      rule: 'Prior auth required for MRI, CT, PET, surgery, and high-cost imaging',
      carcs: ['197', '198']
    },
    { 
      payer: 'UHC',
      category: 'Referral',
      rule: 'HMO plans require PCP referral for specialists',
      carcs: ['288', '242']
    },
    { 
      payer: 'UHC',
      category: 'Timely Filing',
      rule: 'Initial claims must be filed within 90 days of service',
      carcs: ['29']
    },
    { 
      payer: 'UHC',
      category: 'Appeals',
      rule: 'Appeals must be filed within 180 days of denial',
      carcs: ['193']
    },
    { 
      payer: 'Cigna',
      category: 'Authorization',
      rule: 'Prior auth required for surgery, imaging, and certain procedures',
      carcs: ['197']
    },
    { 
      payer: 'Cigna',
      category: 'Timely Filing',
      rule: 'Claims must be filed within 90 days of service',
      carcs: ['29']
    },
    { 
      payer: 'Aetna',
      category: 'Authorization',
      rule: 'Auth needed for inpatient, surgery, and advanced imaging',
      carcs: ['197']
    },
    { 
      payer: 'Aetna',
      category: 'Timely Filing',
      rule: 'Claims due within 90 days of service',
      carcs: ['29']
    },
    { 
      payer: 'BCBS',
      category: 'Authorization',
      rule: 'Varies by state and plan; check portal for specific requirements',
      carcs: ['197']
    },
    { 
      payer: 'BCBS',
      category: 'Timely Filing',
      rule: 'Typically 90 days from date of service',
      carcs: ['29']
    },
    { 
      payer: 'Medicare',
      category: 'Authorization',
      rule: 'No prior auth for most services, but certain items require advance notice',
      carcs: ['197']
    },
    { 
      payer: 'Medicare',
      category: 'Timely Filing',
      rule: 'Claims must be filed within 12 months of service',
      carcs: ['29']
    },
    { 
      payer: 'Medicare',
      category: 'Medical Necessity',
      rule: 'Services must meet LCD/NCD criteria',
      carcs: ['50', '11']
    }
  ];

  const filteredRules = payerRules.filter(rule => 
    rule.payer === selectedPayer && 
    (rule.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
     rule.rule.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedPayerData = payers.find(p => p.name === selectedPayer);

  return (
    <div className="payer-rules">
      <h1>🏢 Payer Rules & Guidelines</h1>
      <p className="subtitle">Insurance-specific billing rules and requirements</p>

      <div className="payer-selector">
        <select value={selectedPayer} onChange={(e) => setSelectedPayer(e.target.value)}>
          {payers.map(payer => (
            <option key={payer.name} value={payer.name}>{payer.fullName}</option>
          ))}
        </select>
      </div>

      {selectedPayerData && (
        <div className="payer-info">
          <h2>{selectedPayerData.fullName}</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>📞 Phone:</strong> {selectedPayerData.phone}
            </div>
            <div className="info-item">
              <strong>🌐 Portal:</strong> {selectedPayerData.portal}
            </div>
            <div className="info-item">
              <strong>⏰ Timely Filing:</strong> {selectedPayerData.timelyFiling}
            </div>
            <div className="info-item">
              <strong>⚖️ Appeal Timeline:</strong> {selectedPayerData.appealTimeline}
            </div>
            <div className="info-item full-width">
              <strong>📬 Address:</strong> {selectedPayerData.address}
            </div>
          </div>
        </div>
      )}

      <div className="rules-section">
        <div className="rules-header">
          <h3>📋 Rules & Guidelines</h3>
          <input
            type="text"
            placeholder="Search rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rules-search"
          />
        </div>

        <div className="rules-list">
          {filteredRules.length > 0 ? (
            filteredRules.map((rule, index) => (
              <div key={index} className="rule-card">
                <div className="rule-category">{rule.category}</div>
                <p className="rule-text">{rule.rule}</p>
                <div className="rule-carcs">
                  <strong>Related CARCs:</strong> {rule.carcs.join(', ')}
                </div>
              </div>
            ))
          ) : (
            <p className="no-rules">No rules found for this search</p>
          )}
        </div>
      </div>

      <div className="quick-tips">
        <h3>💡 Quick Tips for {selectedPayer}</h3>
        <ul>
          <li>Always verify eligibility before rendering services</li>
          <li>Check for prior authorization requirements on the portal</li>
          <li>Submit claims electronically for faster processing</li>
          <li>Keep documentation for at least 7 years</li>
          <li>Appeal denials within the timely filing limit</li>
        </ul>
      </div>
    </div>
  );
}

export default PayerRules;