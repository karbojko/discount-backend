import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Paper,
  CircularProgress,
} from '@mui/material';
import NavigateNextRounded from '@mui/icons-material/NavigateNextRounded';
import MoreVertRounded from '@mui/icons-material/MoreVertRounded';
import AppLayout from '../../components/layout/AppLayout';
import { useDiscountCampaigns } from '../context/DiscountCampaignContext';

function DiscountCampaignDetails() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const { campaigns, loading, deleteCampaign } = useDiscountCampaigns();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [membershipWidgetMenuAnchor, setMembershipWidgetMenuAnchor] = useState(null);
  const [flatFeeWidgetMenuAnchor, setFlatFeeWidgetMenuAnchor] = useState(null);
  const [moduleWidgetMenuAnchor, setModuleWidgetMenuAnchor] = useState(null);

  // Debug logging
  console.log('Campaign ID from URL:', campaignId);
  console.log('Available campaigns:', campaigns);
  
  // Find campaign using string comparison
  const campaign = campaigns.find(c => String(c.id) === String(campaignId));
  console.log('Found campaign:', campaign);

  if (loading) {
    return (
      <AppLayout currentPage="Discount Campaigns">
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <CircularProgress />
        </Box>
      </AppLayout>
    );
  }

  if (!campaign) {
    return (
      <AppLayout currentPage="Discount Campaigns">
        <Box sx={{ p: 3 }}>
          <Typography variant="h5">Campaign not found</Typography>
        </Box>
      </AppLayout>
    );
  }

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleMembershipWidgetMenuOpen = (event) => {
    setMembershipWidgetMenuAnchor(event.currentTarget);
  };

  const handleMembershipWidgetMenuClose = () => {
    setMembershipWidgetMenuAnchor(null);
  };

  const handleFlatFeeWidgetMenuOpen = (event) => {
    setFlatFeeWidgetMenuAnchor(event.currentTarget);
  };

  const handleFlatFeeWidgetMenuClose = () => {
    setFlatFeeWidgetMenuAnchor(null);
  };

  const handleModuleWidgetMenuOpen = (event) => {
    setModuleWidgetMenuAnchor(event.currentTarget);
  };

  const handleModuleWidgetMenuClose = () => {
    setModuleWidgetMenuAnchor(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    alert('Edit campaign');
  };

  const handleDelete = async () => {
    handleMenuClose();
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await deleteCampaign(campaignId);
        navigate('/settings/discount-campaigns');
      } catch (error) {
        alert('Failed to delete campaign');
      }
    }
  };

  const handleEditMembershipWidget = () => {
    handleMembershipWidgetMenuClose();
    alert('Edit Membership fee discounts widget');
  };

  const handleDeleteMembershipWidget = () => {
    handleMembershipWidgetMenuClose();
    if (window.confirm('Are you sure you want to delete all membership fee discounts?')) {
      alert('Membership fee discounts deleted');
    }
  };

  const handleEditFlatFeeWidget = () => {
    handleFlatFeeWidgetMenuClose();
    alert('Edit Flat fee discounts widget');
  };

  const handleDeleteFlatFeeWidget = () => {
    handleFlatFeeWidgetMenuClose();
    if (window.confirm('Are you sure you want to delete all flat fee discounts?')) {
      alert('Flat fee discounts deleted');
    }
  };

  const handleEditModuleWidget = () => {
    handleModuleWidgetMenuClose();
    alert('Edit Module discounts widget');
  };

  const handleDeleteModuleWidget = () => {
    handleModuleWidgetMenuClose();
    if (window.confirm('Are you sure you want to delete all module discounts?')) {
      alert('Module discounts deleted');
    }
  };

  const formatDiscountValue = (type, value) => {
    if (type === 'percentage') {
      return `${value}%`;
    } else if (type === 'substitute') {
      return value;
    } else if (type === 'absolute') {
      return value;
    }
    return value;
  };

  return (
    <AppLayout currentPage="Discount Campaigns">
      <Box sx={{ p: 3 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextRounded fontSize="small" />}
          sx={{ mb: 2 }}
        >
          <Link
            underline="hover"
            color="text.secondary"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/settings');
            }}
            sx={{ 
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            Settings
          </Link>
          <Link
            underline="hover"
            color="text.secondary"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/settings/discount-campaigns');
            }}
            sx={{ 
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            Discount Campaigns
          </Link>
        </Breadcrumbs>

        {/* Page Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {campaign.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip
              label={campaign.status}
              color={campaign.status === 'Active' ? 'success' : 'default'}
              size="small"
              sx={{ fontWeight: 500 }}
            />
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
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              sx={{ color: 'text.secondary' }}
            >
              <MoreVertRounded fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Overview Panel - Key & Value Widget */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            border: '1px solid #B0BEC5',
            borderRadius: '8px',
            boxShadow: 'none',
            bgcolor: '#FFFFFF',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
            Overview
          </Typography>
          <Divider sx={{ mb: 2, borderColor: 'rgba(176, 190, 197, 0.6)' }} />
          
          <Box sx={{ display: 'flex', gap: 6 }}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Discount period
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {campaign.discountPeriod}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Combination with vouchers allowed
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {campaign.combinationWithVouchers ? 'Yes' : 'No'}
              </Typography>
            </Box>
          </Box>
          
          {campaign.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {campaign.description}
            </Typography>
          )}
        </Paper>

        {/* Discount Widgets Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(2, 1fr)',
              xl: 'repeat(3, 1fr)',
            },
            gap: 3,
            mt: 3,
            width: '100%',
            '& > *': {
              width: '100%',
            },
          }}
        >
          {/* Membership Fee Discounts Widget */}
          <Paper
            sx={{
              p: 3,
              border: '1px solid #B0BEC5',
              borderRadius: '8px',
              boxShadow: 'none',
              bgcolor: '#FFFFFF',
              width: '100%',
              maxWidth: '700px',
              height: '520px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Membership fee discounts
            </Typography>
            <IconButton
              size="small"
              onClick={handleMembershipWidgetMenuOpen}
              sx={{ color: 'text.secondary' }}
            >
              <MoreVertRounded fontSize="small" />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2, borderColor: 'rgba(176, 190, 197, 0.6)' }} />
          
          {campaign.membershipDiscounts.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
              There are currently no membership discounts configured
            </Typography>
          ) : (
            campaign.membershipDiscounts.map((discount, index) => (
              <Box key={discount.id}>
                {index > 0 && <Divider sx={{ my: 2, borderColor: 'rgba(176, 190, 197, 0.6)' }} />}
                <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                      {discount.membershipOffer}
                    </Typography>
                    
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 1 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Terms: <Typography component="span" variant="body2" color="text.primary">{discount.terms}</Typography>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Payment frequency: <Typography component="span" variant="body2" color="text.primary">{discount.paymentFrequency}</Typography>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Discount type: <Typography component="span" variant="body2" color="text.primary" sx={{ textTransform: 'capitalize' }}>{discount.discountType}</Typography>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Value: <Typography component="span" variant="body2" color="text.primary">{formatDiscountValue(discount.discountType, discount.value)}</Typography>
                        </Typography>
                      </Box>
                      {discount.starterPackageDiscount && (
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Starter package discount: <Typography component="span" variant="body2" color="text.primary">{discount.starterPackageDiscount}%</Typography>
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    
                    {discount.facilityPrices && discount.facilityPrices.length > 0 && (
                      <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {discount.facilityPrices.map((fp, idx) => (
                          <Chip
                            key={idx}
                            label={`${fp.facility}: ${fp.price}`}
                            size="small"
                            sx={{
                              bgcolor: '#C8E6C9',
                              color: '#1B5E20',
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Box>
                    )}
                </Box>
              </Box>
            ))
          )}
          </Paper>

          {/* Flat Fee Discounts Widget */}
          <Paper
            sx={{
              p: 3,
              border: '1px solid #B0BEC5',
              borderRadius: '8px',
              boxShadow: 'none',
              bgcolor: '#FFFFFF',
              width: '100%',
              maxWidth: '700px',
              height: '520px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Flat fee discounts
            </Typography>
            <IconButton
              size="small"
              onClick={handleFlatFeeWidgetMenuOpen}
              sx={{ color: 'text.secondary' }}
            >
              <MoreVertRounded fontSize="small" />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2, borderColor: 'rgba(176, 190, 197, 0.6)' }} />
          
          {campaign.flatFeeDiscounts.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
              There are currently no flat fee discounts configured
            </Typography>
          ) : (
            campaign.flatFeeDiscounts.map((discount, index) => (
              <Box key={discount.id}>
                {index > 0 && <Divider sx={{ my: 2, borderColor: 'rgba(176, 190, 197, 0.6)' }} />}
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                    {discount.flatFeeType}
                  </Typography>
                  
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 1 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Duration: <Typography component="span" variant="body2" color="text.primary">{discount.duration}</Typography>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Discount type: <Typography component="span" variant="body2" color="text.primary" sx={{ textTransform: 'capitalize' }}>{discount.discountType}</Typography>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Value: <Typography component="span" variant="body2" color="text.primary">{formatDiscountValue(discount.discountType, discount.value)}</Typography>
                        </Typography>
                      </Box>
                    </Box>
                    
                    {discount.facilityPrices && discount.facilityPrices.length > 0 && (
                      <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {discount.facilityPrices.map((fp, idx) => (
                          <Chip
                            key={idx}
                            label={`${fp.facility}: ${fp.price}`}
                            size="small"
                            sx={{
                              bgcolor: '#C8E6C9',
                              color: '#1B5E20',
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Box>
                    )}
                </Box>
              </Box>
            ))
          )}
          </Paper>

          {/* Module Discounts Widget */}
          <Paper
            sx={{
              p: 3,
              border: '1px solid #B0BEC5',
              borderRadius: '8px',
              boxShadow: 'none',
              bgcolor: '#FFFFFF',
              width: '100%',
              maxWidth: '700px',
              height: '520px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Module discounts
            </Typography>
            <IconButton
              size="small"
              onClick={handleModuleWidgetMenuOpen}
              sx={{ color: 'text.secondary' }}
            >
              <MoreVertRounded fontSize="small" />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2, borderColor: 'rgba(176, 190, 197, 0.6)' }} />
          
          {campaign.moduleDiscounts.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
              There are currently no module discounts configured
            </Typography>
          ) : (
            campaign.moduleDiscounts.map((discount, index) => (
              <Box key={discount.id}>
                {index > 0 && <Divider sx={{ my: 2, borderColor: 'rgba(176, 190, 197, 0.6)' }} />}
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                    {discount.moduleName}
                  </Typography>
                  
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Duration: <Typography component="span" variant="body2" color="text.primary">{discount.duration}</Typography>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Discount type: <Typography component="span" variant="body2" color="text.primary" sx={{ textTransform: 'capitalize' }}>{discount.discountType}</Typography>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Value: <Typography component="span" variant="body2" color="text.primary">{formatDiscountValue(discount.discountType, discount.value)}</Typography>
                        </Typography>
                      </Box>
                    </Box>
                </Box>
              </Box>
            ))
          )}
          </Paper>
        </Box>

        {/* Campaign Context Menu */}
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
          <MenuItem onClick={handleEdit}>Edit campaign</MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            Delete campaign
          </MenuItem>
        </Menu>

        {/* Membership Widget Context Menu */}
        <Menu
          anchorEl={membershipWidgetMenuAnchor}
          open={Boolean(membershipWidgetMenuAnchor)}
          onClose={handleMembershipWidgetMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleEditMembershipWidget}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteMembershipWidget} sx={{ color: 'error.main' }}>
            Delete
          </MenuItem>
        </Menu>

        {/* Flat Fee Widget Context Menu */}
        <Menu
          anchorEl={flatFeeWidgetMenuAnchor}
          open={Boolean(flatFeeWidgetMenuAnchor)}
          onClose={handleFlatFeeWidgetMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleEditFlatFeeWidget}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteFlatFeeWidget} sx={{ color: 'error.main' }}>
            Delete
          </MenuItem>
        </Menu>

        {/* Module Widget Context Menu */}
        <Menu
          anchorEl={moduleWidgetMenuAnchor}
          open={Boolean(moduleWidgetMenuAnchor)}
          onClose={handleModuleWidgetMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleEditModuleWidget}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteModuleWidget} sx={{ color: 'error.main' }}>
            Delete
          </MenuItem>
        </Menu>
      </Box>
    </AppLayout>
  );
}

export default DiscountCampaignDetails;
