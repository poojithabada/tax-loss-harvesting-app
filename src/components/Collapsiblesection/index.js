import React, { useState, useRef } from 'react';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CollapsibleSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="collapsible-container">
      <div
        className={`collapsible-header ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="header-content">
          <i className="fas fa-info-circle info-icon"></i>
          <span className="header-title">Important Notes And Disclaimers</span>
        </div>
        <i className={`fas fa-chevron-down dropdown-icon ${isOpen ? 'rotated' : ''}`}></i>
      </div>

      <div
        className="collapsible-content"
        ref={contentRef}
        style={{ maxHeight: isOpen ? `${contentRef.current.scrollHeight}px` : '0px' }}
      >
        <div className="content-text">
            <ul>
                <li>Price Source Disclaimer: Please note that the current price of your coins may differ from the prices listed on specific exchanges. This is because we use CoinGecko as our default price source for certain exchanges, rather than fetching prices directly from the exchange.</li>
                <li>Country-specific Availability: Tax loss harvesting may not be supported in all countries. We strongly recommend consulting with your local tax advisor or accountant before performing any related actions on your exchange.</li>
                <li>Utilization of Losses: Tax loss harvesting typically allows you to offset capital gains. However, if you have zero or no applicable crypto capital gains, the usability of these harvested losses may be limited. Kindly confirm with your tax advisor how such losses can be applied in your situation.</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
