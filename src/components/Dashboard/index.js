import React, { useState } from 'react';
import HoldingsTable from '../HoldingsTable';
import './index.css';
import CollapsibleSection from '../Collapsiblesection';

const formatCurrency = (value) =>
  `${value < 0 ? '-' : ''}$${Math.abs(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const Dashboard = () => {
  const [selectedHoldings, setSelectedHoldings] = useState([]);

  const handleSelectionChange = (selectedRows) => {
    setSelectedHoldings(selectedRows);
  };

  const calculateGains = () => {
    let shortTermProfits = 0,
      shortTermLosses = 0,
      longTermProfits = 0,
      longTermLosses = 0;

    selectedHoldings.forEach((h) => {
      const shortTermGain = (h.currentPrice - h.avgBuyPrice) * h.shortTerm;
      const longTermGain = (h.currentPrice - h.avgBuyPrice) * h.longTerm;

      if (shortTermGain >= 0) shortTermProfits += shortTermGain;
      else shortTermLosses += Math.abs(shortTermGain);

      if (longTermGain >= 0) longTermProfits += longTermGain;
      else longTermLosses += Math.abs(longTermGain);
    });

    return {
      shortTermProfits,
      shortTermLosses,
      shortTermNet: shortTermProfits - shortTermLosses,
      longTermProfits,
      longTermLosses,
      longTermNet: longTermProfits - longTermLosses,
    };
  };

  const {
    shortTermProfits,
    shortTermLosses,
    shortTermNet,
    longTermProfits,
    longTermLosses,
    longTermNet,
  } = calculateGains();

  const totalNet = shortTermNet + longTermNet;

  return (
    <div className="dashboard">
      <div className="info-header">
        <div className="info-button"><CollapsibleSection /></div>
      </div>

      <div className="cards">
        <div className="card dark">
          <h2>Pre Harvesting</h2>
          <table className="metrics-table">
            <thead>
              <tr>
                <th></th>
                <th>Short-term</th>
                <th>Long-term</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Profits</td>
                <td>{formatCurrency(shortTermProfits)}</td>
                <td>{formatCurrency(longTermProfits)}</td>
              </tr>
              <tr>
                <td>Losses</td>
                <td>{formatCurrency(shortTermLosses)}</td>
                <td>{formatCurrency(longTermLosses)}</td>
              </tr>
              <tr>
                <td>Net Capital Gains</td>
                <td>{formatCurrency(shortTermNet)}</td>
                <td>{formatCurrency(longTermNet)}</td>
              </tr>
            </tbody>
          </table>
          <h3 className="capital-gain">
            Realised Capital Gains: <span className="highlight">{formatCurrency(totalNet)}</span>
          </h3>
        </div>

        <div className="card bright">
          <h2>After Harvesting</h2>
          <table className="metrics-table">
            <thead>
              <tr>
                <th></th>
                <th>Short-term</th>
                <th>Long-term</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Profits</td>
                <td>{formatCurrency(shortTermProfits)}</td>
                <td>{formatCurrency(longTermProfits)}</td>
              </tr>
              <tr>
                <td>Losses</td>
                <td>{formatCurrency(shortTermLosses)}</td>
                <td>{formatCurrency(longTermLosses)}</td>
              </tr>
              <tr>
                <td>Net Capital Gains</td>
                <td>{formatCurrency(shortTermNet)}</td>
                <td>{formatCurrency(longTermNet)}</td>
              </tr>
            </tbody>
          </table>
          <h3 className="capital-gain">
            Effective Capital Gains: <span className="highlight">{formatCurrency(totalNet)}</span>
          </h3>
          {totalNet < 0 && (
    <div className="gain-info">
      🎉 Your taxable capital gains are reduced by: <strong>{formatCurrency(Math.abs(totalNet))}</strong>
    </div>
  )}
        </div>
      </div>

      <HoldingsTable onSelectionChange={handleSelectionChange} />
    </div>
  );
};

export default Dashboard;
