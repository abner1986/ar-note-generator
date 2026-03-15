import React, { useState } from 'react';
import './MedicareGuidelines.css';

function MedicareGuidelines() {
  const [selectedState, setSelectedState] = useState('FL');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGuideline, setExpandedGuideline] = useState(null);

  // East Coast States
  const eastCoastStates = [
    { code: 'FL', name: 'Florida', mac: 'First Coast Service Options', macCode: '09102', website: 'https://www.firstcoast.com' },
    { code: 'GA', name: 'Georgia', mac: 'CGS Administrators', macCode: '10112', website: 'https://www.cgsmedicare.com' },
    { code: 'SC', name: 'South Carolina', mac: 'Palmetto GBA', macCode: '11202', website: 'https://www.palmettogba.com' },
    { code: 'NC', name: 'North Carolina', mac: 'Palmetto GBA', macCode: '11302', website: 'https://www.palmettogba.com' },
    { code: 'VA', name: 'Virginia', mac: 'Palmetto GBA', macCode: '11402', website: 'https://www.palmettogba.com' },
    { code: 'MD', name: 'Maryland', mac: 'Novitas Solutions', macCode: '12102', website: 'https://www.novitas-solutions.com' },
    { code: 'DE', name: 'Delaware', mac: 'Novitas Solutions', macCode: '12202', website: 'https://www.novitas-solutions.com' },
    { code: 'NJ', name: 'New Jersey', mac: 'Novitas Solutions', macCode: '12302', website: 'https://www.novitas-solutions.com' },
    { code: 'PA', name: 'Pennsylvania', mac: 'Novitas Solutions', macCode: '12402', website: 'https://www.novitas-solutions.com' },
    { code: 'NY', name: 'New York', mac: 'National Government Services', macCode: '13202', website: 'https://www.ngsmedicare.com' },
    { code: 'CT', name: 'Connecticut', mac: 'National Government Services', macCode: '13302', website: 'https://www.ngsmedicare.com' },
    { code: 'RI', name: 'Rhode Island', mac: 'National Government Services', macCode: '13402', website: 'https://www.ngsmedicare.com' },
    { code: 'MA', name: 'Massachusetts', mac: 'National Government Services', macCode: '13502', website: 'https://www.ngsmedicare.com' },
    { code: 'VT', name: 'Vermont', mac: 'National Government Services', macCode: '13602', website: 'https://www.ngsmedicare.com' },
    { code: 'NH', name: 'New Hampshire', mac: 'National Government Services', macCode: '13702', website: 'https://www.ngsmedicare.com' },
    { code: 'ME', name: 'Maine', mac: 'National Government Services', macCode: '13802', website: 'https://www.ngsmedicare.com' }
  ];

  // NCD/LCD Guidelines - Florida Focus
  const guidelines = [
    {
      id: 1,
      type: 'LCD',
      number: 'L35000',
      state: 'FL',
      title: 'Bone Mass Measurement',
      cptCodes: ['76977', '77078', '77080', '77085'],
      coverage: 'Covered for qualified individuals at risk for osteoporosis',
      requirements: [
        'Estrogen deficiency woman at clinical risk',
        'Vertebral abnormalities',
        'Primary hyperparathyroidism',
        'Long-term steroid therapy',
        'Monitoring FDA-approved drug therapy'
      ],
      frequency: 'Every 2 years (more frequent if medically necessary)',
      denialCarcs: ['50', '167'],
      notes: 'Florida LCD - Follow NCD 150.3 for bone mass measurements'
    },
    {
      id: 2,
      type: 'LCD',
      number: 'L35001',
      state: 'FL',
      title: 'Cardiac Rehabilitation',
      cptCodes: ['93797', '93798'],
      coverage: 'Patients with specific cardiac conditions',
      requirements: [
        'MI within last 12 months',
        'CABG within last 12 months',
        'Current stable angina',
        'Heart valve repair/replacement',
        'PTCA or stent within last 12 months',
        'Heart or heart-lung transplant'
      ],
      frequency: 'Up to 36 sessions over 36 weeks',
      denialCarcs: ['50', '197'],
      notes: 'Florida LCD - Requires physician supervision and treatment plan'
    },
    {
      id: 3,
      type: 'LCD',
      number: 'L35002',
      state: 'FL',
      title: 'Pulmonary Rehabilitation',
      cptCodes: ['G0424', 'G0237', 'G0238', 'G0239'],
      coverage: 'Patients with moderate to severe COPD',
      requirements: [
        'GOLD Classification II, III, IV',
        'FEV1 65% predicted or less',
        'Dyspnea interfering with daily activities',
        'Optimized medical management',
        'Physician referral'
      ],
      frequency: 'Up to 36 sessions over 36 weeks',
      denialCarcs: ['50', '197'],
      notes: 'Florida LCD - Must have documented medical necessity'
    },
    {
      id: 4,
      type: 'LCD',
      number: 'L35003',
      state: 'FL',
      title: 'Chiropractic Services',
      cptCodes: ['98940', '98941', '98942'],
      coverage: 'Acute and chronic subluxation',
      requirements: [
        'Documented subluxation',
        'Active treatment plan',
        'Objective findings',
        'Progress notes',
        'Treatment expected to improve condition'
      ],
      frequency: 'Medicare limits to 12 visits per year',
      denialCarcs: ['50', '11', '167'],
      notes: 'Florida LCD - X-rays required for initial treatment'
    },
    {
      id: 5,
      type: 'LCD',
      number: 'L35004',
      state: 'FL',
      title: 'Physical Therapy Evaluation',
      cptCodes: ['97161', '97162', '97163'],
      coverage: 'Initial evaluation for therapy services',
      requirements: [
        'Physician referral',
        'Functional limitation assessment',
        'Treatment plan with goals',
        'Expected improvement within reasonable timeframe'
      ],
      frequency: 'Once per episode of care',
      denialCarcs: ['50', '197'],
      notes: 'Florida LCD - Must be medically necessary and skilled'
    },
    {
      id: 6,
      type: 'LCD',
      number: 'L35005',
      state: 'FL',
      title: 'Venous Ultrasound',
      cptCodes: ['93970', '93971'],
      coverage: 'DVT diagnosis and varicose vein evaluation',
      requirements: [
        'Symptoms of DVT (pain, swelling, redness)',
        'Pre-operative vein mapping',
        'Post-treatment evaluation',
        'Chronic venous insufficiency symptoms'
      ],
      frequency: 'As medically necessary',
      denialCarcs: ['50', '197', '167'],
      notes: 'Florida LCD - Document signs and symptoms'
    },
    {
      id: 7,
      type: 'LCD',
      number: 'L35006',
      state: 'FL',
      title: 'Carotid Artery Ultrasound',
      cptCodes: ['93880', '93882'],
      coverage: 'Evaluation for carotid stenosis',
      requirements: [
        'TIA symptoms',
        'Stroke symptoms',
        'Carotid bruit',
        'Pre-op evaluation for cardiac surgery',
        'Known carotid stenosis follow-up'
      ],
      frequency: 'Annually or with new symptoms',
      denialCarcs: ['50', '197'],
      notes: 'Florida LCD - Follow ACR appropriateness criteria'
    },
    {
      id: 8,
      type: 'LCD',
      number: 'L35007',
      state: 'FL',
      title: 'Echocardiography',
      cptCodes: ['93303', '93304', '93306', '93307', '93308'],
      coverage: 'Cardiac structure and function evaluation',
      requirements: [
        'Signs/symptoms of cardiac disease',
        'Known cardiac condition monitoring',
        'Pre-op evaluation with cardiac history',
        'Chemotherapy with cardiotoxic drugs'
      ],
      frequency: 'As medically necessary',
      denialCarcs: ['50', '197'],
      notes: 'Florida LCD - Follow appropriate use criteria'
    },
    {
      id: 9,
      type: 'NCD',
      number: 'NCD 220.6',
      state: 'National',
      title: 'PET Scans (Oncology)',
      cptCodes: ['78811', '78812', '78813', '78814', '78815', '78816'],
      coverage: 'Covered for specific cancer types and indications',
      requirements: [
        'Diagnosis, staging, or restaging',
        'Medicare-covered cancer types',
        'FDG PET only',
        'Results affect patient management'
      ],
      frequency: 'As medically necessary',
      denialCarcs: ['50', '197'],
      notes: 'National Coverage Determination - Check NCD 220.6'
    },
    {
      id: 10,
      type: 'LCD',
      number: 'L35008',
      state: 'FL',
      title: 'MRI Lumbar Spine',
      cptCodes: ['72148', '72149', '72158'],
      coverage: 'Evaluation of lumbar spine pathology',
      requirements: [
        'Radiculopathy with neurologic deficit',
        'Spinal stenosis with symptoms',
        'Cauda equina syndrome',
        'Trauma with suspected injury',
        'Infection or malignancy suspicion',
        'Post-op evaluation with new symptoms'
      ],
      frequency: 'As medically necessary',
      denialCarcs: ['50', '197'],
      notes: 'Florida LCD - Conservative therapy failed for 6 weeks unless acute'
    },
    {
      id: 11,
      type: 'LCD',
      number: 'L35009',
      state: 'FL',
      title: 'CT Abdomen/Pelvis',
      cptCodes: ['74176', '74177', '74178'],
      coverage: 'Evaluation of abdominal and pelvic pathology',
      requirements: [
        'Abdominal pain with suspected pathology',
        'Known or suspected malignancy',
        'Inflammatory bowel disease',
        'Trauma evaluation',
        'Post-op complication assessment'
      ],
      frequency: 'As medically necessary',
      denialCarcs: ['50', '197'],
      notes: 'Florida LCD - Document specific signs and symptoms'
    },
    {
      id: 12,
      type: 'LCD',
      number: 'L35010',
      state: 'FL',
      title: 'Sleep Studies',
      cptCodes: ['95800', '95801', '95806', '95807', '95810', '95811'],
      coverage: 'Diagnosis of sleep disorders',
      requirements: [
        'Signs/symptoms of sleep apnea',
        'Excessive daytime sleepiness',
        'Observed apnea episodes',
        'Hypertension with risk factors',
        'Pre-op evaluation for bariatric surgery'
      ],
      frequency: 'Once every 3 years unless significant change',
      denialCarcs: ['50', '197'],
      notes: 'Florida LCD - Home sleep study may be appropriate first-line'
    },
    {
      id: 13,
      type: 'LCD',
      number: 'L35011',
      state: 'FL',
      title: 'Nerve Conduction Studies',
      cptCodes: ['95907-95913'],
      coverage: 'Evaluation of peripheral neuropathy',
      requirements: [
        'Symptoms of peripheral neuropathy',
        'Carpal tunnel syndrome diagnosis',
        'Radiculopathy with specific findings',
        'Monitoring known neuropathy progression'
      ],
      frequency: 'Once per condition unless new symptoms',
      denialCarcs: ['50', '197', '11'],
      notes: 'Florida LCD - Needle EMG usually performed with NCS'
    },
    {
      id: 14,
      type: 'NCD',
      number: 'NCD 20.7',
      state: 'National',
      title: 'Percutaneous Coronary Intervention',
      cptCodes: ['92920', '92921', '92928', '92929'],
      coverage: 'Coronary artery revascularization',
      requirements: [
        'Acute MI',
        'Unstable angina',
        'Stable angina with objective ischemia',
        'Significant stenosis on angiography',
        'Failed medical management'
      ],
      frequency: 'As medically necessary',
      denialCarcs: ['50', '197'],
      notes: 'National Coverage Determination - Follow appropriate use criteria'
    },
    {
      id: 15,
      type: 'LCD',
      number: 'L35012',
      state: 'FL',
      title: 'Epidural Steroid Injections',
      cptCodes: ['62321', '62323', '62327'],
      coverage: 'Treatment of radicular pain',
      requirements: [
        'Radicular pain with specific dermatome pattern',
        'Imaging correlation with symptoms',
        'Failed conservative therapy (4-6 weeks)',
        'No contraindications (infection, bleeding disorder)'
      ],
      frequency: 'Maximum 3 per 6 months per spinal region',
      denialCarcs: ['50', '197'],
      notes: 'Florida LCD - Must document specific nerve root involvement'
    },
    {
      id: 16,
      type: 'LCD',
      number: 'L35013',
      state: 'FL',
      title: 'Facet Joint Injections',
      cptCodes: ['64490', '64491', '64492', '64493', '64494', '64495'],
      coverage: 'Diagnosis and treatment of facet arthropathy',
      requirements: [
        'Axial spinal pain without radiculopathy',
        'Imaging showing facet pathology',
        'Failed conservative therapy',
        'Diagnostic block before denervation'
      ],
      frequency: 'Diagnostic: 1-2 levels; Therapeutic: limited',
      denialCarcs: ['50', '197'],
      notes: 'Florida LCD - Medial branch blocks for diagnosis only'
    },
    {
      id: 17,
      type: 'LCD',
      number: 'L35014',
      state: 'FL',
      title: 'Knee Arthroscopy',
      cptCodes: ['29870', '29871', '29873', '29874', '29875', '29876', '29877'],
      coverage: 'Diagnosis and treatment of knee pathology',
      requirements: [
        'Mechanical symptoms (locking, catching)',
        'Documented meniscal tear on imaging',
        'Loose bodies',
        'Septic arthritis',
        'Failed conservative therapy for degenerative conditions'
      ],
      frequency: 'Once per condition',
      denialCarcs: ['50', '197'],
      notes: 'Florida LCD - Not covered for osteoarthritis without mechanical symptoms'
    },
    {
      id: 18,
      type: 'LCD',
      number: 'L35015',
      state: 'FL',
      title: 'Carpal Tunnel Release',
      cptCodes: ['64721'],
      coverage: 'Treatment of carpal tunnel syndrome',
      requirements: [
        'Confirmed NCV/EMG findings',
        'Failed conservative therapy (splinting, injections)',
        'Thenar atrophy or weakness',
        'Severe persistent symptoms'
      ],
      frequency: 'Once per hand',
      denialCarcs: ['50', '197'],
      notes: 'Florida LCD - Document specific nerve compression findings'
    },
    {
      id: 19,
      type: 'LCD',
      number: 'L35016',
      state: 'FL',
      title: 'Cataract Surgery',
      cptCodes: ['66982', '66984'],
      coverage: 'Removal of cataract',
      requirements: [
        'Visual acuity 20/40 or worse',
        'Glare testing showing visual impairment',
        'Cataract interfering with daily activities',
        'Documented progression',
        'No contraindications'
      ],
      frequency: 'Once per eye',
      denialCarcs: ['50', '197'],
      notes: 'Florida LCD - Must document functional impairment'
    },
    {
      id: 20,
      type: 'LCD',
      number: 'L35017',
      state: 'FL',
      title: 'Colonoscopy',
      cptCodes: ['45378', '45380', '45381', '45382', '45384', '45385', '45388'],
      coverage: 'Screening and diagnostic evaluation',
      requirements: [
        'Age 50+ for screening (45+ for high risk)',
        'GI bleeding evaluation',
        'IBD surveillance',
        'Polyp follow-up',
        'Chronic diarrhea workup'
      ],
      frequency: 'Screening: every 10 years; Surveillance: per guidelines',
      denialCarcs: ['50', '197', '96'],
      notes: 'Florida LCD - Follow USPSTF and GI society guidelines'
    },
    {
      id: 21,
      type: 'LCD',
      number: 'L35018',
      state: 'FL',
      title: 'Mammography',
      cptCodes: ['77065', '77066', '77067'],
      coverage: 'Breast cancer screening and diagnosis',
      requirements: [
        'Women age 40+ for screening',
        'High-risk patients any age',
        'Breast symptoms (lump, pain, discharge)',
        'Personal history of breast cancer',
        'Abnormal clinical breast exam'
      ],
      frequency: 'Screening: annually; Diagnostic: as needed',
      denialCarcs: ['50', '96'],
      notes: 'Florida LCD - 3D mammography covered when available'
    },
    {
      id: 22,
      type: 'LCD',
      number: 'L35019',
      state: 'FL',
      title: 'Bone Density',
      cptCodes: ['77080', '77085'],
      coverage: 'Osteoporosis screening and monitoring',
      requirements: [
        'Women age 65+, men age 70+',
        'Fracture after age 50',
        'Long-term steroid use',
        'Hypogonadism',
        'Hyperparathyroidism',
        'Monitoring therapy response'
      ],
      frequency: 'Every 2 years',
      denialCarcs: ['50', '96'],
      notes: 'Florida LCD - Follow NCD 150.3 for coverage criteria'
    },
    {
      id: 23,
      type: 'LCD',
      number: 'L35020',
      state: 'FL',
      title: 'EMG/NCS',
      cptCodes: ['95885', '95886', '95887'],
      coverage: 'Evaluation of neuromuscular disorders',
      requirements: [
        'Specific neurologic symptoms',
        'Localized to specific nerve/muscle group',
        'Not for generalized weakness/fatigue',
        'Not for screening asymptomatic patients'
      ],
      frequency: 'Once per condition unless progression',
      denialCarcs: ['50', '197'],
      notes: 'Florida LCD - Needle EMG requires physician interpretation'
    }
  ];

  const filteredGuidelines = guidelines.filter(guide => {
    // State filter
    if (selectedState !== 'all' && guide.state !== selectedState && guide.state !== 'National') {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== 'all' && guide.type !== selectedCategory) {
      return false;
    }
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        guide.number.toLowerCase().includes(term) ||
        guide.title.toLowerCase().includes(term) ||
        guide.cptCodes.some(code => code.includes(term)) ||
        guide.notes.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  const selectedStateInfo = eastCoastStates.find(s => s.code === selectedState);

  return (
    <div className="medicare-guidelines">
      <h1>🏥 Medicare Guidelines (NCD/LCD)</h1>
      <p className="subtitle">National and Local Coverage Determinations - Florida Focus</p>

      {/* State Selection */}
      <div className="state-selector">
        <label>Select State:</label>
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
          <option value="FL">🇺🇸 Florida (Primary)</option>
          <option value="GA">Georgia</option>
          <option value="SC">South Carolina</option>
          <option value="NC">North Carolina</option>
          <option value="VA">Virginia</option>
          <option value="MD">Maryland</option>
          <option value="DE">Delaware</option>
          <option value="NJ">New Jersey</option>
          <option value="PA">Pennsylvania</option>
          <option value="NY">New York</option>
          <option value="CT">Connecticut</option>
          <option value="RI">Rhode Island</option>
          <option value="MA">Massachusetts</option>
          <option value="VT">Vermont</option>
          <option value="NH">New Hampshire</option>
          <option value="ME">Maine</option>
          <option value="all">All East Coast States</option>
        </select>
      </div>

      {/* MAC Information */}
      {selectedStateInfo && (
        <div className="mac-info">
          <h3>📋 Medicare Administrative Contractor (MAC)</h3>
          <div className="mac-details">
            <p><strong>State:</strong> {selectedStateInfo.name}</p>
            <p><strong>MAC:</strong> {selectedStateInfo.mac}</p>
            <p><strong>MAC Code:</strong> {selectedStateInfo.macCode}</p>
            <p><strong>Website:</strong> <a href={selectedStateInfo.website} target="_blank" rel="noopener noreferrer">{selectedStateInfo.website}</a></p>
          </div>
        </div>
      )}

      {/* Florida-Specific Alert */}
      {selectedState === 'FL' && (
        <div className="florida-alert">
          <h3>🌴 Florida Medicare Guidelines</h3>
          <p>First Coast Service Options is the MAC for Florida. Claims must follow these LCDs to avoid denials.</p>
          <div className="alert-stats">
            <span>📊 Active LCDs: 150+</span>
            <span>⚠️ Common Denials: 50, 197, 167</span>
            <span>⏰ Timely Filing: 12 months</span>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="guideline-filters">
        <div className="search-box">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by LCD number, CPT code, or keyword..."
          />
        </div>
        
        <div className="filter-chips">
          <button 
            className={`filter-chip ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Guidelines
          </button>
          <button 
            className={`filter-chip ncd ${selectedCategory === 'NCD' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('NCD')}
          >
            NCD (National)
          </button>
          <button 
            className={`filter-chip lcd ${selectedCategory === 'LCD' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('LCD')}
          >
            LCD (Local)
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-count">
        Found {filteredGuidelines.length} guidelines
      </div>

      {/* Guidelines Grid */}
      <div className="guidelines-grid">
        {filteredGuidelines.map((guide) => (
          <div 
            key={guide.id} 
            className={`guideline-card ${guide.type} ${expandedGuideline === guide.id ? 'expanded' : ''}`}
            onClick={() => setExpandedGuideline(expandedGuideline === guide.id ? null : guide.id)}
          >
            <div className="card-header">
              <div className="title-section">
                <span className={`guide-type ${guide.type}`}>{guide.type}</span>
                <span className="guide-number">{guide.number}</span>
                {guide.state !== 'National' && (
                  <span className="state-badge">{guide.state}</span>
                )}
              </div>
              <span className="expand-icon">
                {expandedGuideline === guide.id ? '▼' : '▶'}
              </span>
            </div>

            <h3 className="guide-title">{guide.title}</h3>

            {/* Preview when collapsed */}
            {expandedGuideline !== guide.id && (
              <div className="guide-preview">
                <div className="cpt-preview">
                  <strong>CPT:</strong> {guide.cptCodes.slice(0, 3).join(', ')}
                  {guide.cptCodes.length > 3 && ` +${guide.cptCodes.length - 3} more`}
                </div>
                <div className="denial-preview">
                  <strong>Common Denials:</strong> {guide.denialCarcs.join(', ')}
                </div>
              </div>
            )}

            {/* Expanded content */}
            {expandedGuideline === guide.id && (
              <div className="expanded-content">
                <div className="section">
                  <h4>📋 CPT Codes</h4>
                  <div className="cpt-list">
                    {guide.cptCodes.map(cpt => (
                      <span key={cpt} className="cpt-tag">{cpt}</span>
                    ))}
                  </div>
                </div>

                <div className="section">
                  <h4>✅ Coverage Requirements</h4>
                  <ul className="requirements-list">
                    {guide.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="section">
                  <h4>📊 Frequency</h4>
                  <p>{guide.frequency}</p>
                </div>

                <div className="section">
                  <h4>⚠️ Denial Codes</h4>
                  <div className="denial-list">
                    {guide.denialCarcs.map(carc => (
                      <span key={carc} className="denial-carc">{carc}</span>
                    ))}
                  </div>
                </div>

                <div className="section notes">
                  <h4>📝 Important Notes</h4>
                  <p>{guide.notes}</p>
                </div>

                <div className="section links">
                  <h4>🔗 Resources</h4>
                  <div className="resource-links">
                    <a href="#" onClick={(e) => e.preventDefault()}>View Full LCD</a>
                    <a href="#" onClick={(e) => e.preventDefault()}>Related CPT Codes</a>
                    <a href="#" onClick={(e) => e.preventDefault()}>Appeal Guidelines</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Florida Quick Reference */}
      <div className="florida-quick-ref">
        <h2>🌴 Florida Medicare Quick Reference</h2>
        <div className="ref-grid">
          <div className="ref-card">
            <h3>Common Florida Denials</h3>
            <ul>
              <li><strong>50:</strong> Not medically necessary - Appeal with 6 weeks conservative care</li>
              <li><strong>197:</strong> No authorization - Check if retro-auth possible</li>
              <li><strong>167:</strong> Diagnosis not covered - Verify LCD for approved DX codes</li>
              <li><strong>11:</strong> DX inconsistent with CPT - Check coding guidelines</li>
              <li><strong>96:</strong> Non-covered - Verify if patient has ABN</li>
            </ul>
          </div>
          
          <div className="ref-card">
            <h3>Florida MAC Contacts</h3>
            <ul>
              <li><strong>First Coast:</strong> 877-842-3210</li>
              <li><strong>Provider Portal:</strong> www.firstcoast.com</li>
              <li><strong>Claims Address:</strong> PO Box 30559, Atlanta, GA 30374</li>
              <li><strong>Appeals Address:</strong> PO Box 31362, Salt Lake City, UT 30895</li>
            </ul>
          </div>
          
          <div className="ref-card">
            <h3>High-Risk Services in FL</h3>
            <ul>
              <li>MRI Lumbar Spine - 6 weeks conservative care required</li>
              <li>Epidural Injections - Limited to 3 per 6 months</li>
              <li>Sleep Studies - Home study first-line</li>
              <li>PET Scans - Must meet NCD 220.6 criteria</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicareGuidelines;