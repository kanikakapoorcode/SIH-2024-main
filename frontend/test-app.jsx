import React from 'react';
import { createRoot } from 'react-dom/client';

function TestApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Application</h1>
      <p>If you can see this, React is working!</p>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<TestApp />);
