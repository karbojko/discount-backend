import React from 'react';
import { Box } from '@mui/material';
import TopNav from './TopNav';
import SideNav from './SideNav';

const AppLayout = ({ children, currentPage = 'Discount Campaigns' }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Navigation */}
      <TopNav />

      {/* Main Container: Sidebar + Content */}
      <Box sx={{ display: 'flex', flexGrow: 1, mt: '56px' }}>
        {/* Side Navigation */}
        <SideNav currentPage={currentPage} />

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flex: 1,
            bgcolor: '#FFFFFF',
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
