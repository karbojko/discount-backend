import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCampaigns, createCampaign, updateCampaign, deleteCampaign, getCampaignById as apiGetCampaignById } from '../data/api';

const DiscountCampaignContext = createContext();

export const useDiscountCampaigns = () => {
  const context = useContext(DiscountCampaignContext);
  if (!context) {
    throw new Error('useDiscountCampaigns must be used within a DiscountCampaignProvider');
  }
  return context;
};

export const DiscountCampaignProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load campaigns on initialization
  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  const addCampaign = async (campaignData) => {
    try {
      const newCampaign = await createCampaign(campaignData);
      setCampaigns((prev) => [...prev, newCampaign]);
      return newCampaign;
    } catch (err) {
      console.error('Failed to add campaign:', err);
      throw err;
    }
  };

  const updateCampaignData = async (id, campaignData) => {
    try {
      const updatedCampaign = await updateCampaign(id, campaignData);
      setCampaigns((prev) =>
        prev.map((campaign) => (campaign.id === id ? updatedCampaign : campaign))
      );
      return updatedCampaign;
    } catch (err) {
      console.error('Failed to update campaign:', err);
      throw err;
    }
  };

  const removeCampaign = async (id) => {
    try {
      await deleteCampaign(id);
      setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id));
    } catch (err) {
      console.error('Failed to delete campaign:', err);
      throw err;
    }
  };

  const getCampaignById = async (id) => {
    // Try to find in loaded campaigns first
    const cachedCampaign = campaigns.find((campaign) => campaign.id === id || campaign.id === String(id));
    if (cachedCampaign) {
      return cachedCampaign;
    }
    // If not found, fetch from API
    try {
      const campaign = await apiGetCampaignById(id);
      return campaign;
    } catch (err) {
      console.error('Failed to get campaign by ID:', err);
      throw err;
    }
  };

  const value = {
    campaigns,
    loading,
    error,
    addCampaign,
    updateCampaign: updateCampaignData,
    deleteCampaign: removeCampaign,
    getCampaignById,
    refreshCampaigns: loadCampaigns,
  };

  return (
    <DiscountCampaignContext.Provider value={value}>
      {children}
    </DiscountCampaignContext.Provider>
  );
};
