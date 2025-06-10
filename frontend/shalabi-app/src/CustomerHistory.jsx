import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomerHistory.css';

function CustomerHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/dataReservation')
      .then(response => {
      
      const filtered = response.data.filter(row =>
  typeof row.ID === 'number' &&
  typeof row.Customer_Name === 'string' &&
  typeof row.Action === 'string' &&
  typeof row.Date === 'string'&&
  typeof row.TID === 'number' &&
  typeof row.UID === 'number' &&
  typeof row.RID === 'number' 
);

      setHistory(filtered);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching customer history:', error);
        setLoading(false);
      });
      
  }, []);


  return (
    <div className="history-wrapper">
      <h2>Customer History</h2>
      <div className="history-box">
        {loading ? (
          <p>Loading...</p>
        ) : history.length === 0 ? (
          <p>No Data</p>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Action</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>TID</th>
                <th>UID</th>
                <th>RID</th>
              </tr>
            </thead>
            <tbody>
              {history.map(row => (
                <tr key={row.ID}>
                  <td>{row.ID}</td>
                  <td>{row.Action}</td>
                  <td>{row.Date}</td>
                  <td>{row.Costumer_Name}</td>
                  <td>{row.TID}</td>
                  <td>{row.UID}</td>
                  <td>{row.RID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CustomerHistory;
