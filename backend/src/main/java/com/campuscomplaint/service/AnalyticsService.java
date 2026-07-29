package com.campuscomplaint.service;

import com.campuscomplaint.dto.AnalyticsDtos;
import com.campuscomplaint.entity.AuditLog;
import java.util.List;

public interface AnalyticsService {
    AnalyticsDtos.DashboardStatsDto getGlobalDashboardStats();
    AnalyticsDtos.DashboardStatsDto getStudentDashboardStats(String studentUsername);
    AnalyticsDtos.DashboardStatsDto getStaffDashboardStats(String staffUsername);
    AnalyticsDtos.DashboardStatsDto getDepartmentDashboardStats(Long departmentId);
    List<AnalyticsDtos.DepartmentWorkloadDto> getDepartmentWorkload(Long departmentId);
    List<AuditLog> getAuditLogs();
}
