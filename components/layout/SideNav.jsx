import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material';
import SearchRounded from '@mui/icons-material/SearchRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRounded from '@mui/icons-material/ExpandLessRounded';

const DRAWER_WIDTH = 264;

const SideNav = ({ currentPage = 'Discount Campaigns' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({
    'Membership management': true,
  });

  const handleCategoryToggle = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const menuStructure = [
    {
      category: 'Dashboard',
      items: [
        { label: 'Overview', path: 'overview' },
        { label: 'Analytics', path: 'analytics' },
      ],
    },
    {
      category: 'Membership management',
      items: [
        { label: 'Members', path: 'members' },
        { label: 'Membership offers', path: 'membership-offers' },
        { label: 'Discount Campaigns', path: 'discount-campaigns', badge: 'NEW' },
        { label: 'Contracts', path: 'contracts' },
        { label: 'Billing', path: 'billing' },
      ],
    },
    {
      category: 'Classes & Training',
      items: [
        { label: 'Class Schedule', path: 'class-schedule' },
        { label: 'Trainers', path: 'trainers' },
        { label: 'Bookings', path: 'bookings' },
      ],
    },
    {
      category: 'Facility',
      items: [
        { label: 'Equipment', path: 'equipment' },
        { label: 'Rooms', path: 'rooms' },
        { label: 'Maintenance', path: 'maintenance' },
      ],
    },
    {
      category: 'Reports',
      items: [
        { label: 'Financial Reports', path: 'financial-reports' },
        { label: 'Member Reports', path: 'member-reports' },
        { label: 'Custom Reports', path: 'custom-reports' },
      ],
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid #DADDE1',
          bgcolor: '#F4F5F7',
          position: 'relative',
          border: 'none',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', height: '100%' }}>
        {/* Search Field */}
        <Box sx={{ p: 2, pb: 1 }}>
          <TextField
            placeholder="Search navigation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded sx={{ fontSize: 20, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 40,
                fontSize: 14,
              },
            }}
          />
        </Box>

        {/* Navigation Menu */}
        <List sx={{ px: 1 }}>
          {menuStructure.map((section) => (
            <Box key={section.category}>
              {/* Category Header */}
              <ListItemButton
                onClick={() => handleCategoryToggle(section.category)}
                sx={{
                  py: 1,
                  px: 2,
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemText
                  primary={section.category}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#343434',
                  }}
                />
                {expandedCategories[section.category] ? (
                  <ExpandLessRounded sx={{ fontSize: 20, color: '#7A7A7A' }} />
                ) : (
                  <ExpandMoreRounded sx={{ fontSize: 20, color: '#7A7A7A' }} />
                )}
              </ListItemButton>

              {/* Category Items */}
              <Collapse in={expandedCategories[section.category]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {section.items.map((item) => {
                    const isActive = item.label === currentPage;
                    return (
                      <ListItemButton
                        key={item.path}
                        sx={{
                          py: 1,
                          px: 2,
                          pl: 4,
                          borderRadius: 1,
                          borderLeft: isActive ? '4px solid #1F72EB' : '4px solid transparent',
                          bgcolor: isActive ? '#FFFFFF' : 'transparent',
                          '&:hover': {
                            bgcolor: isActive
                              ? '#FFFFFF'
                              : 'rgba(22, 108, 184, 0.04)',
                          },
                        }}
                      >
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: 14,
                            fontWeight: isActive ? 500 : 400,
                            color: isActive ? '#1F72EB' : '#343434',
                          }}
                        />
                        {item.badge && (
                          <Chip
                            label={item.badge}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: 10,
                              fontWeight: 500,
                              bgcolor: '#1F72EB',
                              color: '#FFFFFF',
                              borderRadius: '6px',
                              '& .MuiChip-label': {
                                px: 0.75,
                                py: 0,
                              },
                            }}
                          />
                        )}
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideNav;
