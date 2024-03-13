import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const Preset = {
  placesCount: 16,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCount={Preset.placesCount} />
  </React.StrictMode>
);
