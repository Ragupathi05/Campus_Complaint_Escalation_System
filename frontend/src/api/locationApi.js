import axiosClient from './axiosClient';

export const locationApi = {
  getRoots: () => axiosClient.get('/locations/roots'),
  getChildren: (parentId) => axiosClient.get(`/locations/${parentId}/children`),
  getByType: (type) => axiosClient.get(`/locations/type/${type}`),
  createNode: (data) => axiosClient.post('/locations', data),
};
