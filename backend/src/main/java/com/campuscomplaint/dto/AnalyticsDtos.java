package com.campuscomplaint.dto;

import java.util.HashMap;
import java.util.Map;

public class AnalyticsDtos {

    public static class DashboardStatsDto {
        private Long totalComplaints = 0L;
        private Long inProgressComplaints = 0L;
        private Long resolvedComplaints = 0L;
        private Long escalatedComplaints = 0L;
        private Long closedComplaints = 0L;

        private Map<String, Long> complaintsByCategory = new HashMap<>();
        private Map<String, Long> complaintsByPriority = new HashMap<>();
        private Map<String, Long> complaintsByStatus = new HashMap<>();

        public DashboardStatsDto() {
        }

        public Long getTotalComplaints() { return totalComplaints; }
        public void setTotalComplaints(Long totalComplaints) { this.totalComplaints = totalComplaints; }

        public Long getInProgressComplaints() { return inProgressComplaints; }
        public void setInProgressComplaints(Long inProgressComplaints) { this.inProgressComplaints = inProgressComplaints; }

        public Long getResolvedComplaints() { return resolvedComplaints; }
        public void setResolvedComplaints(Long resolvedComplaints) { this.resolvedComplaints = resolvedComplaints; }

        public Long getEscalatedComplaints() { return escalatedComplaints; }
        public void setEscalatedComplaints(Long escalatedComplaints) { this.escalatedComplaints = escalatedComplaints; }

        public Long getClosedComplaints() { return closedComplaints; }
        public void setClosedComplaints(Long closedComplaints) { this.closedComplaints = closedComplaints; }

        public Map<String, Long> getComplaintsByCategory() { return complaintsByCategory; }
        public void setComplaintsByCategory(Map<String, Long> complaintsByCategory) { this.complaintsByCategory = complaintsByCategory; }

        public Map<String, Long> getComplaintsByPriority() { return complaintsByPriority; }
        public void setComplaintsByPriority(Map<String, Long> complaintsByPriority) { this.complaintsByPriority = complaintsByPriority; }

        public Map<String, Long> getComplaintsByStatus() { return complaintsByStatus; }
        public void setComplaintsByStatus(Map<String, Long> complaintsByStatus) { this.complaintsByStatus = complaintsByStatus; }
    }

    public static class DepartmentWorkloadDto {
        private Long staffId;
        private String staffName;
        private String staffEmail;
        private Long assignedCount = 0L;
        private Long inProgressCount = 0L;
        private Long resolvedCount = 0L;

        public DepartmentWorkloadDto() {
        }

        public Long getStaffId() { return staffId; }
        public void setStaffId(Long staffId) { this.staffId = staffId; }

        public String getStaffName() { return staffName; }
        public void setStaffName(String staffName) { this.staffName = staffName; }

        public String getStaffEmail() { return staffEmail; }
        public void setStaffEmail(String staffEmail) { this.staffEmail = staffEmail; }

        public Long getAssignedCount() { return assignedCount; }
        public void setAssignedCount(Long assignedCount) { this.assignedCount = assignedCount; }

        public Long getInProgressCount() { return inProgressCount; }
        public void setInProgressCount(Long inProgressCount) { this.inProgressCount = inProgressCount; }

        public Long getResolvedCount() { return resolvedCount; }
        public void setResolvedCount(Long resolvedCount) { this.resolvedCount = resolvedCount; }
    }
}
