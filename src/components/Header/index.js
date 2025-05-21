import React from 'react';
import './index.css';
import InfoTooltip from '../InfoTooltip';

function Header() {
  return (
    <div className="header">
      <div className="title-group">
        <h1 className="title">Tax Optimisation</h1>
        <div className="tooltip-wrapper">
          <span className="how-it-works-text">How it works?</span>
          <div className="tooltip-hover-area">
            <InfoTooltip />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
