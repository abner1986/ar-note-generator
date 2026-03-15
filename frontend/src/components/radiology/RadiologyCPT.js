import React, { useState } from 'react';
import './RadiologyCPT.css';

function RadiologyCPT() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const radiologyCPTs = [
    { code: '71045', description: 'Chest X-ray, 1 view', denyRate: '5%', commonDenials: ['96 - Non-covered', '50 - Medical necessity'] },
    { code: '71046', description: 'Chest X-ray, 2 views', denyRate: '4%', commonDenials: ['96 - Non-covered'] },
    { code: '72100', description: 'Lumbar spine X-ray, 2-3 views', denyRate: '6%', commonDenials: ['97 - Bundled', '11 - DX inconsistent'] },
    { code: '72125', description: 'CT Cervical spine w/o contrast', denyRate: '8%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '72126', description: 'CT Cervical spine w/ contrast', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '72127', description: 'CT Cervical spine w/o & w/ contrast', denyRate: '9%', commonDenials: ['197 - No auth', '97 - Bundled'] },
    { code: '72131', description: 'CT Lumbar spine w/o contrast', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '72132', description: 'CT Lumbar spine w/ contrast', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '72133', description: 'CT Lumbar spine w/o & w/ contrast', denyRate: '9%', commonDenials: ['197 - No auth', '97 - Bundled'] },
    { code: '72141', description: 'MRI Cervical spine w/o contrast', denyRate: '12%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '72142', description: 'MRI Cervical spine w/ contrast', denyRate: '11%', commonDenials: ['197 - No auth'] },
    { code: '72146', description: 'MRI Thoracic spine w/o contrast', denyRate: '10%', commonDenials: ['197 - No auth'] },
    { code: '72147', description: 'MRI Thoracic spine w/ contrast', denyRate: '10%', commonDenials: ['197 - No auth'] },
    { code: '72148', description: 'MRI Lumbar spine w/o contrast', denyRate: '15%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '72149', description: 'MRI Lumbar spine w/ contrast', denyRate: '14%', commonDenials: ['197 - No auth'] },
    { code: '72158', description: 'MRI Lumbar spine w/o & w/ contrast', denyRate: '16%', commonDenials: ['197 - No auth', '97 - Bundled'] },
    { code: '72192', description: 'CT Pelvis w/o contrast', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '72193', description: 'CT Pelvis w/ contrast', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '72194', description: 'CT Pelvis w/o & w/ contrast', denyRate: '8%', commonDenials: ['197 - No auth', '97 - Bundled'] },
    { code: '73200', description: 'CT Upper extremity w/o contrast', denyRate: '5%', commonDenials: ['197 - No auth'] },
    { code: '73201', description: 'CT Upper extremity w/ contrast', denyRate: '5%', commonDenials: ['197 - No auth'] },
    { code: '73202', description: 'CT Upper extremity w/o & w/ contrast', denyRate: '7%', commonDenials: ['197 - No auth', '97 - Bundled'] },
    { code: '73206', description: 'CTA Upper extremity', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '73218', description: 'MRI Upper extremity w/o contrast', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '73219', description: 'MRI Upper extremity w/ contrast', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '73220', description: 'MRI Upper extremity w/o & w/ contrast', denyRate: '10%', commonDenials: ['197 - No auth', '97 - Bundled'] },
    { code: '73221', description: 'MRI Joint of upper extremity', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '73222', description: 'MRI Joint of upper extremity w/ contrast', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '73223', description: 'MRI Joint of upper extremity w/o & w/ contrast', denyRate: '11%', commonDenials: ['197 - No auth', '97 - Bundled'] },
    { code: '73700', description: 'CT Lower extremity w/o contrast', denyRate: '5%', commonDenials: ['197 - No auth'] },
    { code: '73701', description: 'CT Lower extremity w/ contrast', denyRate: '5%', commonDenials: ['197 - No auth'] },
    { code: '73702', description: 'CT Lower extremity w/o & w/ contrast', denyRate: '7%', commonDenials: ['197 - No auth', '97 - Bundled'] },
    { code: '73706', description: 'CTA Lower extremity', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '73718', description: 'MRI Lower extremity w/o contrast', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '73719', description: 'MRI Lower extremity w/ contrast', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '73720', description: 'MRI Lower extremity w/o & w/ contrast', denyRate: '10%', commonDenials: ['197 - No auth', '97 - Bundled'] },
    { code: '73721', description: 'MRI Joint of lower extremity', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '73722', description: 'MRI Joint of lower extremity w/ contrast', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '73723', description: 'MRI Joint of lower extremity w/o & w/ contrast', denyRate: '11%', commonDenials: ['197 - No auth', '97 - Bundled'] },
    { code: '74150', description: 'CT Abdomen w/o contrast', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '74160', description: 'CT Abdomen w/ contrast', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '74170', description: 'CT Abdomen w/o & w/ contrast', denyRate: '9%', commonDenials: ['197 - No auth', '97 - Bundled'] },
    { code: '74174', description: 'CTA Abdomen and Pelvis', denyRate: '10%', commonDenials: ['197 - No auth'] },
    { code: '74175', description: 'CTA Abdomen', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '74176', description: 'CT Abdomen and Pelvis w/o contrast', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '74177', description: 'CT Abdomen and Pelvis w/ contrast', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '74178', description: 'CT Abdomen and Pelvis w/o & w/ contrast', denyRate: '10%', commonDenials: ['197 - No auth', '97 - Bundled'] },
    { code: '74181', description: 'MRI Abdomen w/o contrast', denyRate: '12%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '74182', description: 'MRI Abdomen w/ contrast', denyRate: '12%', commonDenials: ['197 - No auth'] },
    { code: '74183', description: 'MRI Abdomen w/o & w/ contrast', denyRate: '14%', commonDenials: ['197 - No auth', '97 - Bundled'] },
    { code: '74185', description: 'MRA Abdomen', denyRate: '10%', commonDenials: ['197 - No auth'] },
    { code: '75557', description: 'Cardiac MRI', denyRate: '15%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '75559', description: 'Cardiac MRI w/ stress', denyRate: '18%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '75561', description: 'Cardiac MRI w/ contrast', denyRate: '16%', commonDenials: ['197 - No auth'] },
    { code: '75563', description: 'Cardiac MRI w/ stress and contrast', denyRate: '20%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '75565', description: 'Cardiac MRI velocity flow mapping', denyRate: '12%', commonDenials: ['197 - No auth'] },
    { code: '75571', description: 'CT Cardiac calcium scoring', denyRate: '10%', commonDenials: ['96 - Non-covered'] },
    { code: '75572', description: 'CT Cardiac w/ contrast', denyRate: '12%', commonDenials: ['197 - No auth'] },
    { code: '75573', description: 'CT Cardiac congenital', denyRate: '14%', commonDenials: ['197 - No auth'] },
    { code: '75574', description: 'CTA Cardiac', denyRate: '15%', commonDenials: ['197 - No auth'] },
    { code: '75600', description: 'Aortography', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75605', description: 'Thoracic aortography', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75625', description: 'Abdominal aortography', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75630', description: 'Aortography lower extremities', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '75635', description: 'CTA Aorta', denyRate: '10%', commonDenials: ['197 - No auth'] },
    { code: '75710', description: 'Angiography extremity', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75716', description: 'Angiography bilateral extremities', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75722', description: 'Angiography renal', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75724', description: 'Angiography bilateral renal', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75726', description: 'Angiography visceral', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75731', description: 'Angiography adrenal', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75733', description: 'Angiography bilateral adrenal', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75736', description: 'Angiography pelvic', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75741', description: 'Angiography pulmonary', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '75743', description: 'Angiography bilateral pulmonary', denyRate: '10%', commonDenials: ['197 - No auth'] },
    { code: '75746', description: 'Angiography pulmonary by non-cath', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75756', description: 'Angiography internal mammary', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75774', description: 'Angiography each vessel', denyRate: '6%', commonDenials: ['97 - Bundled'] },
    { code: '75790', description: 'Angiography dialysis shunt', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '75801', description: 'Lymphangiography extremity', denyRate: '5%', commonDenials: ['197 - No auth'] },
    { code: '75803', description: 'Lymphangiography bilateral', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '75805', description: 'Lymphangiography pelvic', denyRate: '5%', commonDenials: ['197 - No auth'] },
    { code: '75807', description: 'Lymphangiography abdominal', denyRate: '5%', commonDenials: ['197 - No auth'] },
    { code: '75809', description: 'Lymphangiography sequential', denyRate: '4%', commonDenials: ['97 - Bundled'] },
    { code: '75810', description: 'Splenoportography', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75820', description: 'Venography extremity', denyRate: '5%', commonDenials: ['197 - No auth'] },
    { code: '75822', description: 'Venography bilateral extremity', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '75825', description: 'Venography vena cava', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '75827', description: 'Venography chest', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '75831', description: 'Venography renal', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '75833', description: 'Venography bilateral renal', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75840', description: 'Venography adrenal', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '75842', description: 'Venography bilateral adrenal', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75860', description: 'Venography sinus', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75870', description: 'Venography sagittal sinus', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75872', description: 'Venography epidural', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75880', description: 'Venography orbit', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '75885', description: 'Venography percutaneous', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75887', description: 'Venography percutaneous', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75889', description: 'Venography hepatic', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75891', description: 'Venography hepatic pressure', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75893', description: 'Venous sampling', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '75894', description: 'Transcatheter therapy', denyRate: '10%', commonDenials: ['197 - No auth'] },
    { code: '75898', description: 'Angiography follow-up', denyRate: '5%', commonDenials: ['97 - Bundled'] },
    { code: '75900', description: 'Exchange catheter', denyRate: '4%', commonDenials: ['97 - Bundled'] },
    { code: '75901', description: 'Mechanical removal drainage', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '75902', description: 'Mechanical removal drainage', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '75940', description: 'Placement catheter', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75945', description: 'Intravascular ultrasound', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75946', description: 'Intravascular ultrasound', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75952', description: 'EVAR', denyRate: '15%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '75953', description: 'EVAR revision', denyRate: '14%', commonDenials: ['197 - No auth'] },
    { code: '75954', description: 'TEVAR', denyRate: '16%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '75956', description: 'TEVAR placement', denyRate: '15%', commonDenials: ['197 - No auth'] },
    { code: '75957', description: 'TEVAR placement', denyRate: '15%', commonDenials: ['197 - No auth'] },
    { code: '75958', description: 'TEVAR placement', denyRate: '15%', commonDenials: ['197 - No auth'] },
    { code: '75959', description: 'TEVAR placement', denyRate: '15%', commonDenials: ['197 - No auth'] },
    { code: '75960', description: 'Transcatheter stent', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75961', description: 'Retrieval stent', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '75962', description: 'Angioplasty', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75964', description: 'Angioplasty each', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '75966', description: 'Atherectomy', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75968', description: 'Atherectomy each', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75970', description: 'Thrombolysis', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '75978', description: 'Venous angioplasty', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75980', description: 'Bile duct drainage', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75982', description: 'Bile duct drainage', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75984', description: 'Bile duct dilation', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '75989', description: 'Abscess drainage', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '75992', description: 'Atherectomy', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75993', description: 'Atherectomy', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75994', description: 'Atherectomy', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75995', description: 'Atherectomy', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75996', description: 'Atherectomy', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '75997', description: 'Thrombolysis', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '75998', description: 'Thrombolysis', denyRate: '9%', commonDenials: ['197 - No auth'] },
    { code: '76000', description: 'Fluoroscopy', denyRate: '3%', commonDenials: ['97 - Bundled'] },
    { code: '76001', description: 'Fluoroscopy', denyRate: '4%', commonDenials: ['97 - Bundled'] },
    { code: '76010', description: 'Nasal bone study', denyRate: '4%', commonDenials: ['96 - Non-covered'] },
    { code: '76080', description: 'Fistulography', denyRate: '5%', commonDenials: ['197 - No auth'] },
    { code: '76098', description: 'Breast specimen', denyRate: '4%', commonDenials: ['97 - Bundled'] },
    { code: '76100', description: 'X-ray body section', denyRate: '5%', commonDenials: ['96 - Non-covered'] },
    { code: '76101', description: 'X-ray body section', denyRate: '5%', commonDenials: ['96 - Non-covered'] },
    { code: '76102', description: 'X-ray body section', denyRate: '5%', commonDenials: ['96 - Non-covered'] },
    { code: '76120', description: 'Cineradiography', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '76125', description: 'Cineradiography', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '76140', description: 'Consultation X-ray', denyRate: '4%', commonDenials: ['96 - Non-covered'] },
    { code: '76150', description: 'X-ray processing', denyRate: '2%', commonDenials: ['97 - Bundled'] },
    { code: '76350', description: 'Subtraction', denyRate: '3%', commonDenials: ['97 - Bundled'] },
    { code: '76376', description: '3D rendering', denyRate: '5%', commonDenials: ['97 - Bundled'] },
    { code: '76377', description: '3D rendering', denyRate: '5%', commonDenials: ['97 - Bundled'] },
    { code: '76380', description: 'CT follow-up', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '76390', description: 'MR spectroscopy', denyRate: '12%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '76496', description: 'Unlisted radiology', denyRate: '20%', commonDenials: ['16 - Missing info', '50 - Medical necessity'] },
    { code: '76497', description: 'Unlisted radiology', denyRate: '20%', commonDenials: ['16 - Missing info'] },
    { code: '76498', description: 'Unlisted MRI', denyRate: '22%', commonDenials: ['16 - Missing info', '50 - Medical necessity'] },
    { code: '76499', description: 'Unlisted radiology', denyRate: '20%', commonDenials: ['16 - Missing info'] },
    { code: '76930', description: 'Echo guidance', denyRate: '4%', commonDenials: ['97 - Bundled'] },
    { code: '76932', description: 'Echo guidance', denyRate: '4%', commonDenials: ['97 - Bundled'] },
    { code: '76936', description: 'Echo guidance', denyRate: '5%', commonDenials: ['197 - No auth'] },
    { code: '76937', description: 'Echo guidance', denyRate: '4%', commonDenials: ['97 - Bundled'] },
    { code: '76940', description: 'Echo guidance', denyRate: '5%', commonDenials: ['197 - No auth'] },
    { code: '76941', description: 'Echo guidance', denyRate: '5%', commonDenials: ['197 - No auth'] },
    { code: '76942', description: 'Echo guidance', denyRate: '4%', commonDenials: ['97 - Bundled'] },
    { code: '76945', description: 'Echo guidance', denyRate: '5%', commonDenials: ['197 - No auth'] },
    { code: '76946', description: 'Echo guidance', denyRate: '4%', commonDenials: ['97 - Bundled'] },
    { code: '76948', description: 'Echo guidance', denyRate: '5%', commonDenials: ['197 - No auth'] },
    { code: '76950', description: 'Radiation therapy', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '76965', description: 'Radiation therapy', denyRate: '6%', commonDenials: ['197 - No auth'] },
    { code: '76970', description: 'Ultrasound follow-up', denyRate: '3%', commonDenials: ['97 - Bundled'] },
    { code: '76975', description: 'GI motility', denyRate: '8%', commonDenials: ['197 - No auth'] },
    { code: '76977', description: 'Bone density', denyRate: '5%', commonDenials: ['96 - Non-covered'] },
    { code: '76978', description: 'Ultrasound ablation', denyRate: '12%', commonDenials: ['197 - No auth', '50 - Medical necessity'] },
    { code: '76979', description: 'Ultrasound ablation', denyRate: '12%', commonDenials: ['197 - No auth'] },
    { code: '76981', description: 'Ultrasound elastography', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '76982', description: 'Ultrasound elastography', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '76983', description: 'Ultrasound elastography', denyRate: '7%', commonDenials: ['197 - No auth'] },
    { code: '76999', description: 'Unlisted ultrasound', denyRate: '18%', commonDenials: ['16 - Missing info', '50 - Medical necessity'] }
  ];

  const filteredCPTs = radiologyCPTs.filter(cpt => 
    cpt.code.includes(searchTerm) || 
    cpt.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="radiology-cpt">
      <h1>🩻 Radiology CPT Codes</h1>
      <p className="subtitle">Common CPT codes with denial patterns</p>

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
                  <span className={`deny-rate ${parseInt(cpt.denyRate) > 10 ? 'high' : parseInt(cpt.denyRate) > 5 ? 'medium' : 'low'}`}>
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

export default RadiologyCPT;