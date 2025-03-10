import React from 'react';
import loader from '../assets/loader.gif';
import './Spinner.css';
import './Spinner.css';


const Spinner = () => {
  return (
    <div className="spinner-container fade-in">
      <img src={loader} alt="Loading..." className="spinner-image bounce" />
    </div>
  );
};

export default Spinner;
