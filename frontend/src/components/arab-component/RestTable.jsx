import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./RestTable.css";

export default function ReservePage() {
  const [reserves, setReserves] = useState([]);
  const [acceptedReserves, setAcceptedReserves] = useState([]);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = () => {
    axios.get('http://127.0.0.1:8000/api/rest-my-table')
      .then(response => {
        const data = response.data;
        const pending = data.filter(item => item.status === 'pending');
        const accepted = data.filter(item => item.status === 'accepted');

        setReserves(pending);
        setAcceptedReserves(accepted);
      })
      .catch(error => console.error("Error fetching tables:", error));
  };

  const handleReserve = (id) => {
    axios.put(`http://127.0.0.1:8000/api/reserve-table/${id}`, {
      status: 'accepted'
    })
    .then(response => {
      console.log("Reservation updated:", response.data);
      fetchTables(); // إعادة تحميل البيانات لتحديث الواجهة
    })
    .catch(error => console.error("Error updating reservation:", error));
  };

  return (
    <div className="page">
      {/* Header */}
      <div className="header">
        <img src="/frontend/public/assets/logo.jpg" alt="Logo" />
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Menu</a>
          <a href="#">Reserve</a>
          <a href="#">Online</a>
        </div>
        <div className="auth-buttons">
          <button className="signup-btn">Sign up</button>
          <button className="login-btn">Login</button>
        </div>
      </div>

      {/* Golden Cards (Pending Reserves) */}
      <h2 className="section-title">الكروت الذهبية (متاحة للحجز):-</h2>
      <div className="grid reserves">
        {reserves.map((item) => (
          <div key={item.id} className="box golden-card">
            <p>{item.description}</p>
            <button onClick={() => handleReserve(item.id)} className="reserve-btn">احجز</button>
          </div>
        ))}
      </div>

      {/* Accepted Reserves */}
      <h2 className="section-title">الحجوزات المقبولة:-</h2>
      <div className="grid accepted">
        {acceptedReserves.map((item) => (
          <div key={item.id} className="box">
            {item.description}
          </div>
        ))}
      </div>
    </div>
  );
}
