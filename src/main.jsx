import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { DiscountCampaignProvider } from './context/DiscountCampaignContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DiscountCampaignProvider>
        <App />
      </DiscountCampaignProvider>
    </BrowserRouter>
  </React.StrictMode>
);
