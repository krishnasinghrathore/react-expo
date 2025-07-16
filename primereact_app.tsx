import React from 'react';
import ReactDOM from 'react-dom/client';
import PrimeReactDashboard from './primereact_dashboard';

// Import PrimeReact themes and styles
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Import Tailwind CSS for utility classes
import './primereact_styles.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <PrimeReactDashboard />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);