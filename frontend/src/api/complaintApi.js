import axiosClient from './axiosClient';

export const complaintApi = {
  create: (data) => axiosClient.post('/complaints', data),
  getById: (id) => axiosClient.get(`/complaints/${id}`),
  getMyComplaints: () => axiosClient.get('/complaints/my'),
  getPublicFeed: () => axiosClient.get('/complaints/feed'),
  upvote: (id) => axiosClient.post(`/complaints/${id}/upvote`),
  getDepartmentComplaints: (departmentId) => axiosClient.get(`/complaints/department/${departmentId}`),
  getAssignedToMe: () => axiosClient.get('/complaints/assigned-me'),
  getEscalated: () => axiosClient.get('/complaints/escalated'),
  assignStaff: (id, data) => axiosClient.put(`/complaints/${id}/assign`, data),
  accept: (id) => axiosClient.put(`/complaints/${id}/accept`),
  updateStatus: (id, data) => axiosClient.put(`/complaints/${id}/status`, data),
  resolve: (id, data) => axiosClient.put(`/complaints/${id}/resolve`, data),
  verify: (id, data) => axiosClient.put(`/complaints/${id}/verify`, data),
  reopen: (id, remarks) => axiosClient.put(`/complaints/${id}/reopen`, remarks),
  addComment: (id, text) => axiosClient.post(`/complaints/${id}/comments`, text),
  uploadFile: (formData) =>
    axiosClient.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
