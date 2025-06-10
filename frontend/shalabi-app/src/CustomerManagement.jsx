import React, { useState } from 'react';
import './CustomerManagement.css';

function CustomerManagement() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    if (first && last && email) {
      alert(`Saved:\n${first} ${last}\n${email}`);
      setFirst('');
      setLast('');
      setEmail('');
    } else {
      alert("Fill all fields");
    }
  };

  return (
    <div className="management-wrapper">
      <h2>Customer Management</h2>
      <div className="form-box">
        <input placeholder="Name" value={first} onChange={e => setFirst(e.target.value)} />
        <input placeholder="Phone" value={last} onChange={e => setLast(e.target.value)} />
        <input placeholder="Order" value={email} onChange={e => setEmail(e.target.value)} />
        <button onClick={handleSave}>Save Information</button>
      </div>
    </div>
  );
}

export default CustomerManagement;
