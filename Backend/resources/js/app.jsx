// import React from 'react';
import ReactDOM from 'react-dom/client';

export function App() {
    return <h1>Hello from React inside Laravel!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);