package com.campuscomplaint.controller;

import com.campuscomplaint.dto.AnalyticsDtos;
import com.campuscomplaint.entity.AuditLog;
import com.campuscomplaint.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/global")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HIGHER_OFFICIAL')")
    public ResponseEntity<AnalyticsDtos.DashboardStatsDto> getGlobalDashboardStats() {
        return ResponseEntity.ok(analyticsService.getGlobalDashboardStats());
    }

    @GetMapping("/student")
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'ROLE_FACULTY')")
    public ResponseEntity<AnalyticsDtos.DashboardStatsDto> getStudentDashboardStats(Authentication authentication) {
        return ResponseEntity.ok(analyticsService.getStudentDashboardStats(authentication.getName()));
    }

    @GetMapping("/staff")
    @PreAuthorize("hasAuthority('ROLE_STAFF')")
    public ResponseEntity<AnalyticsDtos.DashboardStatsDto> getStaffDashboardStats(Authentication authentication) {
        return ResponseEntity.ok(analyticsService.getStaffDashboardStats(authentication.getName()));
    }

    @GetMapping("/department/{departmentId}")
    @PreAuthorize("hasAnyAuthority('ROLE_DEPT_HEAD', 'ROLE_ADMIN', 'ROLE_HIGHER_OFFICIAL')")
    public ResponseEntity<AnalyticsDtos.DashboardStatsDto> getDepartmentDashboardStats(@PathVariable Long departmentId) {
        return ResponseEntity.ok(analyticsService.getDepartmentDashboardStats(departmentId));
    }

    @GetMapping("/department/{departmentId}/workload")
    @PreAuthorize("hasAnyAuthority('ROLE_DEPT_HEAD', 'ROLE_ADMIN')")
    public ResponseEntity<List<AnalyticsDtos.DepartmentWorkloadDto>> getDepartmentWorkload(@PathVariable Long departmentId) {
        return ResponseEntity.ok(analyticsService.getDepartmentWorkload(departmentId));
    }

    @GetMapping("/audit-logs")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HIGHER_OFFICIAL')")
    public ResponseEntity<List<AuditLog>> getAuditLogs() {
        return ResponseEntity.ok(analyticsService.getAuditLogs());
    }
}
