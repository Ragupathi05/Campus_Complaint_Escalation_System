package com.campuscomplaint.service.impl;

import com.campuscomplaint.dto.AnalyticsDtos;
import com.campuscomplaint.entity.AuditLog;
import com.campuscomplaint.entity.Complaint;
import com.campuscomplaint.entity.User;
import com.campuscomplaint.enums.ComplaintStatus;
import com.campuscomplaint.enums.PriorityLevel;
import com.campuscomplaint.exception.CustomExceptions;
import com.campuscomplaint.repository.AuditLogRepository;
import com.campuscomplaint.repository.ComplaintRepository;
import com.campuscomplaint.repository.UserRepository;
import com.campuscomplaint.service.AnalyticsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final AuditLogRepository auditLogRepository;

    public AnalyticsServiceImpl(ComplaintRepository complaintRepository, UserRepository userRepository, AuditLogRepository auditLogRepository) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public AnalyticsDtos.DashboardStatsDto getGlobalDashboardStats() {
        List<Complaint> allComplaints = complaintRepository.findAll();
        return calculateStats(allComplaints);
    }

    @Override
    @Transactional(readOnly = true)
    public AnalyticsDtos.DashboardStatsDto getStudentDashboardStats(String studentUsername) {
        User student = userRepository.findByUsername(studentUsername)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Student user not found"));
        List<Complaint> complaints = complaintRepository.findByStudentId(student.getId());
        return calculateStats(complaints);
    }

    @Override
    @Transactional(readOnly = true)
    public AnalyticsDtos.DashboardStatsDto getStaffDashboardStats(String staffUsername) {
        User staff = userRepository.findByUsername(staffUsername)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Staff user not found"));
        List<Complaint> complaints = complaintRepository.findByAssignedStaffId(staff.getId());
        return calculateStats(complaints);
    }

    @Override
    @Transactional(readOnly = true)
    public AnalyticsDtos.DashboardStatsDto getDepartmentDashboardStats(Long departmentId) {
        List<Complaint> complaints = complaintRepository.findByCategoryDepartmentId(departmentId);
        return calculateStats(complaints);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AnalyticsDtos.DepartmentWorkloadDto> getDepartmentWorkload(Long departmentId) {
        List<User> staffMembers = userRepository.findByDepartmentIdAndRole(departmentId, com.campuscomplaint.enums.RoleType.ROLE_STAFF);
        List<AnalyticsDtos.DepartmentWorkloadDto> result = new ArrayList<>();

        for (User staff : staffMembers) {
            Long assigned = complaintRepository.countByAssignedStaffIdAndStatusIn(staff.getId(), Arrays.asList(ComplaintStatus.ASSIGNED));
            Long inProgress = complaintRepository.countByAssignedStaffIdAndStatusIn(staff.getId(), Arrays.asList(ComplaintStatus.ACCEPTED, ComplaintStatus.IN_PROGRESS, ComplaintStatus.WAITING_PARTS));
            Long resolved = complaintRepository.countByAssignedStaffIdAndStatusIn(staff.getId(), Arrays.asList(ComplaintStatus.RESOLVED, ComplaintStatus.VERIFIED, ComplaintStatus.CLOSED));

            AnalyticsDtos.DepartmentWorkloadDto dto = new AnalyticsDtos.DepartmentWorkloadDto();
            dto.setStaffId(staff.getId());
            dto.setStaffName(staff.getFullName());
            dto.setStaffEmail(staff.getEmail());
            dto.setAssignedCount(assigned);
            dto.setInProgressCount(inProgress);
            dto.setResolvedCount(resolved);
            result.add(dto);
        }

        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuditLog> getAuditLogs() {
        return auditLogRepository.findAllByOrderByCreatedAtDesc();
    }

    private AnalyticsDtos.DashboardStatsDto calculateStats(List<Complaint> complaints) {
        long total = complaints.size();
        long inProgress = complaints.stream().filter(c -> c.getStatus() == ComplaintStatus.IN_PROGRESS || c.getStatus() == ComplaintStatus.ACCEPTED || c.getStatus() == ComplaintStatus.WAITING_PARTS).count();
        long resolved = complaints.stream().filter(c -> c.getStatus() == ComplaintStatus.RESOLVED || c.getStatus() == ComplaintStatus.VERIFIED).count();
        long escalated = complaints.stream().filter(c -> c.getStatus() == ComplaintStatus.ESCALATED).count();
        long closed = complaints.stream().filter(c -> c.getStatus() == ComplaintStatus.CLOSED).count();

        AnalyticsDtos.DashboardStatsDto stats = new AnalyticsDtos.DashboardStatsDto();
        stats.setTotalComplaints(total);
        stats.setInProgressComplaints(inProgress);
        stats.setResolvedComplaints(resolved);
        stats.setEscalatedComplaints(escalated);
        stats.setClosedComplaints(closed);

        for (Complaint c : complaints) {
            String catName = c.getCategory() != null ? c.getCategory().getName() : "Unknown";
            stats.getComplaintsByCategory().put(catName, stats.getComplaintsByCategory().getOrDefault(catName, 0L) + 1);

            String priority = c.getPriority() != null ? c.getPriority().name() : PriorityLevel.LOW.name();
            stats.getComplaintsByPriority().put(priority, stats.getComplaintsByPriority().getOrDefault(priority, 0L) + 1);

            String status = c.getStatus() != null ? c.getStatus().name() : ComplaintStatus.NEW.name();
            stats.getComplaintsByStatus().put(status, stats.getComplaintsByStatus().getOrDefault(status, 0L) + 1);
        }

        return stats;
    }
}
