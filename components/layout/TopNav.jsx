import React from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import SearchRounded from '@mui/icons-material/SearchRounded';
import FavoriteRounded from '@mui/icons-material/FavoriteRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import SchoolRounded from '@mui/icons-material/SchoolRounded';
import GroupsRounded from '@mui/icons-material/GroupsRounded';
import EventRounded from '@mui/icons-material/EventRounded';
import SettingsRounded from '@mui/icons-material/SettingsRounded';
import MoreHorizRounded from '@mui/icons-material/MoreHorizRounded';
import HelpOutlineRounded from '@mui/icons-material/HelpOutlineRounded';
import DownloadRounded from '@mui/icons-material/DownloadRounded';
import RefreshRounded from '@mui/icons-material/RefreshRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import AppsRounded from '@mui/icons-material/AppsRounded';

const TopNav = () => {
  const [facilityAnchorEl, setFacilityAnchorEl] = React.useState(null);

  const handleFacilityClick = (event) => {
    setFacilityAnchorEl(event.currentTarget);
  };

  const handleFacilityClose = () => {
    setFacilityAnchorEl(null);
  };

  const navIconStyle = {
    color: '#7A7A7A',
    '&:hover': {
      bgcolor: 'rgba(22, 108, 184, 0.04)',
    },
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: '#F4F5F7',
        borderBottom: '1px solid #DADDE1',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: '56px !important',
          height: 56,
          px: 2,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Logo */}
          <Box
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1,
            }}
          >
            <AppsRounded sx={{ color: '#fff', fontSize: 20 }} />
          </Box>

          {/* Search */}
          <IconButton size="small" sx={navIconStyle}>
            <SearchRounded fontSize="small" />
          </IconButton>

          {/* Section Icons */}
          <IconButton size="small" sx={navIconStyle}>
            <FavoriteRounded fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={navIconStyle}>
            <CheckCircleRounded fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={navIconStyle}>
            <SchoolRounded fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={navIconStyle}>
            <GroupsRounded fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={navIconStyle}>
            <EventRounded fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={navIconStyle}>
            <SettingsRounded fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={navIconStyle}>
            <MoreHorizRounded fontSize="small" />
          </IconButton>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Facility Selector */}
          <Box
            onClick={handleFacilityClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 2,
              py: 0.75,
              bgcolor: 'rgba(76, 175, 80, 0.1)',
              borderRadius: 1,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'rgba(76, 175, 80, 0.15)',
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              HH, Stellingen
            </Typography>
            <KeyboardArrowDownRounded
              sx={{ fontSize: 20, color: 'rgba(38, 50, 56, 0.56)' }}
            />
          </Box>
          <Menu
            anchorEl={facilityAnchorEl}
            open={Boolean(facilityAnchorEl)}
            onClose={handleFacilityClose}
          >
            <MenuItem onClick={handleFacilityClose}>HH, Stellingen</MenuItem>
            <MenuItem onClick={handleFacilityClose}>HH, Winterhude</MenuItem>
            <MenuItem onClick={handleFacilityClose}>HH, Altona</MenuItem>
          </Menu>

          {/* Action Icons */}
          <IconButton size="small" sx={navIconStyle}>
            <HelpOutlineRounded fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={navIconStyle}>
            <DownloadRounded fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={navIconStyle}>
            <RefreshRounded fontSize="small" />
          </IconButton>

          {/* User Avatar */}
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: 12,
              fontWeight: 500,
              ml: 0.5,
            }}
          >
            OP
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
