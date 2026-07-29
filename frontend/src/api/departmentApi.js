import axiosClient from './axiosClient';

export const departmentApi = {
  getAll: () => axiosClient.get('/departments'),
  getById: (id) => axiosClient.get(`/departments/${id}`),
  create: (data) => axiosClient.post('/departments', data),
  assignHead: (deptId, userId) => axiosClient.put(`/departments/${deptId}/head/${userId}`),
  unassignHead: (deptId) => axiosClient.put(`/departments/${deptId}/unassign-head`),
  getAllCategories: () => axiosClient.get('/categories'),
  getCategoriesByDept: (deptId) => axiosClient.get(`/categories/department/${deptId}`),
  createCategory: (data) => axiosClient.post('/categories', data),
};
