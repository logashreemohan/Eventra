import React, { useState, useEffect } from 'react';

const BackendTest = () => {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      setHealthStatus(data);
    } catch (err) {
      setError('Failed to connect to backend API');
      console.error('Backend connection error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Backend Connection Test</h2>
      
      {loading && <p>Checking backend health...</p>}
      
      {error && (
        <div style={{ color: 'red', backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '5px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {healthStatus && (
        <div style={{ color: 'green', backgroundColor: '#e6ffe6', padding: '10px', borderRadius: '5px' }}>
          <strong>Backend Status:</strong> {healthStatus.message}
          <br />
          <strong>Timestamp:</strong> {new Date(healthStatus.timestamp).toLocaleString()}
        </div>
      )}
      
      <button 
        onClick={checkHealth}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Refresh Status
      </button>
    </div>
  );
};

export default BackendTest;