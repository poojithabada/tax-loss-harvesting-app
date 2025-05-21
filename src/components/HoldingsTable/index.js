import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';


import './index.css';

const defaultData = [
  {
    id: 1,
    asset: 'Ethereum',
    ticker: 'ETH',
    amount: 20028.05,
    avgBuyPrice: 3367.78,
    currentPrice: 2531.06,
    shortTerm: 20028.05,
    longTerm: 0,
    selected: false,
  },
  {
    id: 2,
    asset: 'Solana',
    ticker: 'SOL',
    amount: 20277.78,
    avgBuyPrice: 192.15,
    currentPrice: 174.37,
    shortTerm: 20277.78,
    longTerm: 0,
    selected: false,
  },
  {
    id: 3,
    asset: 'BNB',
    ticker: 'BNB',
    amount: 7020.16,
    avgBuyPrice: 708.72,
    currentPrice: 665.55,
    shortTerm: 7020.16,
    longTerm: 0,
    selected: false,
  },
  {
    id: 4,
    asset: 'Aave',
    ticker: 'AAVE',
    amount: 2615.93,
    avgBuyPrice: 321.51,
    currentPrice: 224.33,
    shortTerm: 2615.93,
    longTerm: 0,
    selected: false,
  },
  {
    id: 5,
    asset: 'Bitcoin',
    ticker: 'BTC',
    amount: 15.75,
    avgBuyPrice: 41250.00,
    currentPrice: 67500.00,
    shortTerm: 7.5,
    longTerm: 8.25,
    selected: false,
  },
  {
    id: 6,
    asset: 'Cardano',
    ticker: 'ADA',
    amount: 125000,
    avgBuyPrice: 0.75,
    currentPrice: 0.62,
    shortTerm: 60000,
    longTerm: 65000,
    selected: false,
  },
  {
    id: 7,
    asset: 'Polkadot',
    ticker: 'DOT',
    amount: 8750,
    avgBuyPrice: 6.10,
    currentPrice: 7.45,
    shortTerm: 5000,
    longTerm: 3750,
    selected: false,
  },
  {
    id: 8,
    asset: 'Chainlink',
    ticker: 'LINK',
    amount: 4200,
    avgBuyPrice: 18.00,
    currentPrice: 14.20,
    shortTerm: 2200,
    longTerm: 2000,
    selected: false,
  },
  {
    id: 9,
    asset: 'Polygon',
    ticker: 'MATIC',
    amount: 38000,
    avgBuyPrice: 1.20,
    currentPrice: 0.89,
    shortTerm: 18000,
    longTerm: 20000,
    selected: false,
  },
  {
    id: 10,
    asset: 'Litecoin',
    ticker: 'LTC',
    amount: 925,
    avgBuyPrice: 90.00,
    currentPrice: 105.50,
    shortTerm: 500,
    longTerm: 425,
    selected: false,
  },
];

          const formatAbbreviatedCurrency = (value) => {
            const abs = Math.abs(value);
            if (abs >= 1e6) return `${value < 0 ? '-' : ''}$${(abs / 1e6).toFixed(2)}M`;
            if (abs >= 1e3) return `${value < 0 ? '-' : ''}$${(abs / 1e3).toFixed(2)}K`;
            return `$${value.toFixed(2)}`;
          };

          const HoldingsTable = ({ onSelectionChange }) => {
            const [data, setData] = useState(defaultData);
            const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
              const [showAll, setShowAll] = useState(false);
          const anySelected = data.some((item) => item.selected);

          const deselectAll = () => {
            const updated = data.map((item) => ({ ...item, selected: false }));
            setData(updated);
          };


            const toggleSelection = (id) => {
              const updatedData = data.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item
              );
              setData(updatedData);
            };

            useEffect(() => {
              if (onSelectionChange) {
                const selectedRows = data.filter((item) => item.selected);
                onSelectionChange(selectedRows);
              }
            }, [data, onSelectionChange]);

            const handleSort = (key) => {
            setSortConfig((prev) => ({
              key,
              direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
            }));
          };


            const sortedData = [...data].sort((a, b) => {
              if (!sortConfig.key) return 0;

              const getValue = (item) => {
                if (sortConfig.key === 'shortTermValue') {
                  return (item.currentPrice - item.avgBuyPrice) * item.shortTerm;
                } else if (sortConfig.key === 'longTerm') {
                  return item.longTerm;
                }
                return 0;
              };

              const aVal = getValue(a);
              const bVal = getValue(b);

              return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
            });

          const visibleData = showAll ? sortedData : sortedData.slice(0, 4);


              return (
                <div className="holdings-table">
                  <h2>Holdings</h2>
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>
              <div className="asset-header-wrapper">
                {anySelected ? (
                  <span className="asset-header-icon" onClick={deselectAll} />
                ) : (
                  <span className="asset-header-placeholder" />
                )}
                Asset
              </div>
            </th>


            <th>Holdings<br /><span className="subtext">Avg Buy Price</span></th>
            <th>Current Price</th>

          <th onClick={() => handleSort('shortTermValue')} className="sortable">
            {sortConfig.key === 'shortTermValue' && (
              <FontAwesomeIcon
                icon={sortConfig.direction === 'asc' ? faCaretUp : faCaretDown}
                className="mr-1" 
              />
            )}
            Short-Term
          </th>
            <th>Long-Term</th>
            <th>Amount to Sell</th>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((h) => {
            const shortTermValue = (h.currentPrice - h.avgBuyPrice) * h.shortTerm;
            const shortTermClass = shortTermValue < 0 ? 'red' : 'green';

            return (
              <tr key={h.id}>
               <td>
  <label className="custom-checkbox">
    <input
      type="checkbox"
      checked={h.selected}
      onChange={() => toggleSelection(h.id)}
    />
    <span className="checkmark" />
  </label>
</td>
                <td>
                  <div className="asset-name">{h.asset}</div>
                  <div className="subtext">{h.ticker}</div>
                </td>
                <td>
                  {h.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {h.ticker}
                  <br />
                  <span className="subtext">
                    ${h.avgBuyPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}/{h.ticker}
                  </span>
                </td>
                <td>${h.currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                <td className={shortTermClass}>
                  <div className="tooltip-container">
  {formatAbbreviatedCurrency(shortTermValue)}
  <div className="tooltip-box">
    {shortTermValue.toLocaleString(undefined, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    })}
  </div>
</div>
<br />
<span className="subtext">
  {h.shortTerm.toLocaleString(undefined, { maximumFractionDigits: 2 })} {h.ticker}
</span>

                </td>
                <td>
                  $0.00<br />
                  <span className="subtext">{h.longTerm} {h.ticker}</span>
                </td>
                <td>
  {h.selected ? (
    <>
      {h.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {h.ticker}
    </>
  ) : (
    '-'
  )}
</td>
              </tr>
            );
          })}
        </tbody>
      </table>
<div className="view-toggle">
  <button className="view-toggle-link" onClick={() => setShowAll(!showAll)}>
    {showAll ? 'View Less' : 'View All'}
  </button>
</div>

    </div>
  );
};

export default HoldingsTable;
