import React from 'react';
import CircularProgressBar from './CircularProgressBar';
import LineProgressBar from '../../components/LineProgressBar';
import Spinner from '../../components/Spinner';
import Header from '../../components/Header';

const Dashboard = () => {
  return (
    <div>
      <Header />
      <h2>Dashboard</h2>

      <h3>Performance</h3>
      <CircularProgressBar percentage={75} color="green" />

      <h3>Spending Progress</h3>
      <LineProgressBar label="Savings" percentage={60} lineColor="blue" />

      <h3>Loading Animation</h3>
      <Spinner />
    </div>
  );
};

export default Dashboard;
