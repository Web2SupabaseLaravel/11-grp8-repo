import React, { useState } from 'react';
import './Notifications.css';

function Notifications() {
  const [settings, setSettings] = useState({
    reservation: true,
    cancellations: false,
    reminders: true
  });

  const toggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleUpdate = () => {
    alert("Settings updated:\n" + JSON.stringify(settings, null, 2));
  };

  return (
    <div className="notifications-wrapper">
      <h2>Notifications</h2>
      <div className="notifications-box">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className="notification-option">
            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            <label className="switch">
              <input type="checkbox" checked={value} onChange={() => toggle(key)} />
              <span className="slider" />
            </label>
          </div>
        ))}
        <button className="update-btn" onClick={handleUpdate}>Update Settings</button>
      </div>
    </div>
  );
}

export default Notifications;
