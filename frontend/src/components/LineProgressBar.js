import React from 'react';
import './LineProgressBar.css';
import './LineProgressBar.css';


const LineProgressBar = ({ label, percentage, lineColor }) => {
  return (
    <div className="line-progress-container fade-in">
      <div className="progress-label">{label} <span>{percentage}%</span></div>
      <div className="progress-bar">
        <div className="progress-fill animated-fill" style={{ width: `${percentage}%`, backgroundColor: lineColor }}></div>
      </div>
    </div>
  );
};

export default LineProgressBar;
