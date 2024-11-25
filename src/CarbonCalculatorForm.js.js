import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2'; // Import the Pie chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const CarbonCalculatorForm = () => {
  const [dailyKm, setDailyKm] = useState('');
  const [weeklyKm, setWeeklyKm] = useState('');
  const [result, setResult] = useState(null);

  const EMISSION_FACTOR = 0.21;

  const handleSubmit = (e) => {
    e.preventDefault();
    const dailyEmission = dailyKm ? dailyKm * EMISSION_FACTOR : 0;
    const weeklyEmission = weeklyKm ? weeklyKm * EMISSION_FACTOR : 0;

    setResult({
      daily: dailyEmission.toFixed(2),
      weekly: weeklyEmission.toFixed(2),
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Carbon Footprint Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="dailyKm">How many km do you drive per day?</label>
          <input
            type="number"
            id="dailyKm"
            value={dailyKm}
            onChange={(e) => setDailyKm(e.target.value)}
            placeholder="Enter daily km"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="weeklyKm">How many km do you drive per week?</label>
          <input
            type="number"
            id="weeklyKm"
            value={weeklyKm}
            onChange={(e) => setWeeklyKm(e.target.value)}
            placeholder="Enter weekly km"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 15px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Calculate
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Results</h2>
          <p>Daily Carbon Emission: {result.daily} kg CO₂</p>
          <p>Weekly Carbon Emission: {result.weekly} kg CO₂</p>

          <h3>Emissions Chart</h3>
          <Pie
            data={{
              labels: ['Daily Emissions', 'Weekly Emissions'],
              datasets: [
                {
                  label: 'Carbon Emissions (kg CO₂)',
                  data: [result.daily, result.weekly],
                  backgroundColor: ['#FF6384', '#36A2EB'], // Colors for each section
                  hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CarbonCalculatorForm;
