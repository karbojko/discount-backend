import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import MoreVertRounded from '@mui/icons-material/MoreVertRounded';
import DiscountCampaignWizard from '../../components/DiscountCampaignWizard';
import AppLayout from '../../components/layout/AppLayout';
import { useDiscountCampaigns } from '../context/DiscountCampaignContext';

function DiscountCampaignList() {
  const navigate = useNavigate();
  const { campaigns, loading, deleteCampaign } = useDiscountCampaigns();
  const [showWizard, setShowWizard] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const handleCreateNew = () => {
    setShowWizard(true);
  };

  const handleCancel = () => {
    setShowWizard(false);
  };

  const handleComplete = () => {
    setShowWizard(false);
    alert('Campaign saved successfully!');
  };

  const handleMenuOpen = (event, campaign) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedCampaign(campaign);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedCampaign(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    alert(`Edit campaign: ${selectedCampaign.name}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await deleteCampaign(selectedCampaign.id);
      } catch (error) {
        alert('Failed to delete campaign');
      }
    }
    handleMenuClose();
  };

  const handleRowClick = (campaignId) => {
    navigate(`/settings/discount-campaigns/${campaignId}`);
  };

  const normalizeStatus = (status) => {
    return status === 'Active' ? 'Active' : 'Inactive';
  };

  const getStatusColor = (status) => {
    const normalized = normalizeStatus(status);
    return normalized === 'Active' ? 'success' : 'default';
  };

  // Generate discount summary from campaign data
  const getDiscountSummary = (campaign) => {
    const membershipCount = campaign.membershipDiscounts?.length || 0;
    const flatFeeCount = campaign.flatFeeDiscounts?.length || 0;
    const moduleCount = campaign.moduleDiscounts?.length || 0;

    const membershipNames = campaign.membershipDiscounts?.map((d) => {
      const discountText = d.discountType === 'percentage' ? `${d.value}% discount` : 
                          d.discountType === 'substitute' ? 'Substitute price' : 
                          `${d.value} discount`;
      return `${d.membershipOffer} - ${discountText}`;
    }) || [];

    const flatFeeNames = campaign.flatFeeDiscounts?.map((d) => {
      const discountText = d.discountType === 'percentage' ? `${d.value}% off` : 
                          d.discountType === 'substitute' ? `${d.value}` : 
                          `${d.value} discount`;
      return `${d.flatFeeType} - ${discountText}`;
    }) || [];

    const moduleNames = campaign.moduleDiscounts?.map((d) => {
      const discountText = d.discountType === 'percentage' ? `${d.value}%` : 
                          d.discountType === 'substitute' ? d.value : 
                          `${d.value}`;
      return `${d.moduleName} - ${discountText}`;
    }) || [];

    return {
      membership: { count: membershipCount, names: membershipNames },
      flatFee: { count: flatFeeCount, names: flatFeeNames },
      module: { count: moduleCount, names: moduleNames },
    };
  };

  if (loading) {
    return (
      <AppLayout currentPage="Discount Campaigns">
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <CircularProgress />
        </Box>
      </AppLayout>
    );
  }

  return (
    <AppLayout currentPage="Discount Campaigns">
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Discount Campaigns
          </Typography>
          <Button
            variant="contained"
            onClick={handleCreateNew}
            sx={{ textTransform: 'none', height: 40 }}
          >
            Create new
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ border: '1px solid #B0BEC5', boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 500 }}>Campaign Name</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Campaign Period</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Discounts</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 500 }} align="right">Facilities</TableCell>
                <TableCell sx={{ fontWeight: 500, width: 60 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((campaign) => {
                const discounts = getDiscountSummary(campaign);
                return (
                <TableRow
                  key={campaign.id}
                  onClick={() => handleRowClick(campaign.id)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'rgba(22, 108, 184, 0.04)',
                    },
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {campaign.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{campaign.discountPeriod}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {discounts.membership.count > 0 && (
                        <Tooltip
                          title={
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                Membership discounts
                              </Typography>
                              <Box component="ul" sx={{ margin: 0, paddingLeft: 2 }}>
                                {discounts.membership.names.map((name, index) => (
                                  <li key={index}>
                                    <Typography variant="body2">{name}</Typography>
                                  </li>
                                ))}
                              </Box>
                            </Box>
                          }
                          arrow
                          placement="top"
                        >
                          <Chip
                            label={`${discounts.membership.count} Membership`}
                            size="small"
                            variant="outlined"
                          />
                        </Tooltip>
                      )}
                      {discounts.flatFee.count > 0 && (
                        <Tooltip
                          title={
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                Flat fee discounts
                              </Typography>
                              <Box component="ul" sx={{ margin: 0, paddingLeft: 2 }}>
                                {discounts.flatFee.names.map((name, index) => (
                                  <li key={index}>
                                    <Typography variant="body2">{name}</Typography>
                                  </li>
                                ))}
                              </Box>
                            </Box>
                          }
                          arrow
                          placement="top"
                        >
                          <Chip
                            label={`${discounts.flatFee.count} Flat Fee`}
                            size="small"
                            variant="outlined"
                          />
                        </Tooltip>
                      )}
                      {discounts.module.count > 0 && (
                        <Tooltip
                          title={
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                Module discounts
                              </Typography>
                              <Box component="ul" sx={{ margin: 0, paddingLeft: 2 }}>
                                {discounts.module.names.map((name, index) => (
                                  <li key={index}>
                                    <Typography variant="body2">{name}</Typography>
                                  </li>
                                ))}
                              </Box>
                            </Box>
                          }
                          arrow
                          placement="top"
                        >
                          <Chip
                            label={`${discounts.module.count} Module`}
                            size="small"
                            variant="outlined"
                          />
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={normalizeStatus(campaign.status)}
                      color={getStatusColor(campaign.status)}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={campaign.facilitiesCount}
                      size="small"
                      sx={{
                        bgcolor: '#4CAF50',
                        color: '#FFFFFF',
                        fontWeight: 500,
                        minWidth: 32,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ py: 1 }}>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, campaign)}
                      sx={{ color: 'text.secondary' }}
                    >
                      <MoreVertRounded fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Context Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            Delete
          </MenuItem>
        </Menu>
      </Box>

      <DiscountCampaignWizard
        open={showWizard}
        onCancel={handleCancel}
        onComplete={handleComplete}
      />
    </AppLayout>
  );
}

export default DiscountCampaignList;
