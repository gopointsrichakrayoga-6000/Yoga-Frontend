import api from './api';

export const createOfferingOrder = async (orderData) => {
  const response = await api.post('/offerings/create-order', orderData);
  return response.data;
};

export const verifyOfferingPayment = async (verificationData) => {
  const response = await api.post('/offerings/verify-payment', verificationData);
  return response.data;
};

export const getOfferingLedger = async () => {
  const response = await api.get('/admin/offerings/ledger');
  return response.data;
};
