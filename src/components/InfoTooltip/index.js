import React from 'react';
import './index.css';

const InfoTooltip = () => {
  return (
    <div className="info-tooltip">
      <ul>
        <li>See your capital gains for FY 2024-25 in the left card</li>
        <li>Check boxes for assets you plan on selling to reduce your tax liability</li>
        <li>Instantly see your updated tax liability in the right card</li>
      </ul>
      <p><strong>Pro tip:</strong> Experiment with different combinations of your holdings to optimize your tax liability</p>
    </div>
  );
};

export default InfoTooltip;
