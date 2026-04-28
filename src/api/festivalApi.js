import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getFestivalList = async () => {
  const response = await axios.get(`${API_BASE_URL}/festivals`);
  return response.data;
};

export const getFestivalDetail = async (festivalId) => {
  const response = await axios.get(`${API_BASE_URL}/festivals/${festivalId}`);
  return response.data;
};

export const getRecentFestivals = async () => {
  const response = await axios.get(`${API_BASE_URL}/festivals/recent`);
  return response.data;
};

export const getMonthFestivals = async () => {
  const response = await axios.get(`${API_BASE_URL}/festivals/month`);
  return response.data;
};

export const getRecommendFestivals = async () => {
  const response = await axios.get(`${API_BASE_URL}/festivals/recommend`);
  return response.data;
};
