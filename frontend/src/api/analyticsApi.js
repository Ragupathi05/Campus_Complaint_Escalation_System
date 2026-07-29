import axiosClient from './axiosClient';

export const analyticsApi = {
  getGlobal: () => axiosClient.get('/analytics/global'),
  getStudent: () => axiosClient.get('/analytics/student'),
  getStaff: () => axiosClient.get('/analytics/staff'),
  getDepartment: (deptId) => axiosClient.get(`/analytics/department/${deptId}`),
  getDepartmentWorkload: (deptId) => axiosClient.get(`/analytics/department/${deptId}/workload`),
};
