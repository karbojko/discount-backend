import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import DiscountCampaignList from './pages/DiscountCampaignList';
import DiscountCampaignDetails from './pages/DiscountCampaignDetails';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to="/settings/discount-campaigns" replace />} />
        <Route path="/settings/discount-campaigns" element={<DiscountCampaignList />} />
        <Route path="/settings/discount-campaigns/:campaignId" element={<DiscountCampaignDetails />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
