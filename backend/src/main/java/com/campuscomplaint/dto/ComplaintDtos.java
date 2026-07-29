package com.campuscomplaint.dto;

import com.campuscomplaint.enums.ComplaintStatus;
import com.campuscomplaint.enums.PriorityLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public class ComplaintDtos {

    public static class CreateComplaintRequest {
        @NotBlank(message = "Title is required")
        private String title;

        @NotBlank(message = "Description is required")
        private String description;

        @NotNull(message = "Category is required")
        private Long categoryId;

        @NotNull(message = "Location is required")
        private Long locationId;

        private String landmarkDetails;
        private String beforeImageUrl;

        public CreateComplaintRequest() {
        }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

        public Long getLocationId() { return locationId; }
        public void setLocationId(Long locationId) { this.locationId = locationId; }

        public String getLandmarkDetails() { return landmarkDetails; }
        public void setLandmarkDetails(String landmarkDetails) { this.landmarkDetails = landmarkDetails; }

        public String getBeforeImageUrl() { return beforeImageUrl; }
        public void setBeforeImageUrl(String beforeImageUrl) { this.beforeImageUrl = beforeImageUrl; }
    }

    public static class AssignStaffRequest {
        @NotNull(message = "Staff ID is required")
        private Long staffId;

        private String remarks;

        public AssignStaffRequest() {
        }

        public Long getStaffId() { return staffId; }
        public void setStaffId(Long staffId) { this.staffId = staffId; }

        public String getRemarks() { return remarks; }
        public void setRemarks(String remarks) { this.remarks = remarks; }
    }

    public static class UpdateStatusRequest {
        @NotNull(message = "Status is required")
        private ComplaintStatus status;

        private String remarks;
        private String afterImageUrl;

        public UpdateStatusRequest() {
        }

        public ComplaintStatus getStatus() { return status; }
        public void setStatus(ComplaintStatus status) { this.status = status; }

        public String getRemarks() { return remarks; }
        public void setRemarks(String remarks) { this.remarks = remarks; }

        public String getAfterImageUrl() { return afterImageUrl; }
        public void setAfterImageUrl(String afterImageUrl) { this.afterImageUrl = afterImageUrl; }
    }

    public static class ResolveComplaintRequest {
        private String remarks;
        private String afterImageUrl;

        public ResolveComplaintRequest() {
        }

        public String getRemarks() { return remarks; }
        public void setRemarks(String remarks) { this.remarks = remarks; }

        public String getAfterImageUrl() { return afterImageUrl; }
        public void setAfterImageUrl(String afterImageUrl) { this.afterImageUrl = afterImageUrl; }
    }

    public static class VerifyComplaintRequest {
        private Integer rating;
        private String feedback;

        public VerifyComplaintRequest() {
        }

        public Integer getRating() { return rating; }
        public void setRating(Integer rating) { this.rating = rating; }

        public String getFeedback() { return feedback; }
        public void setFeedback(String feedback) { this.feedback = feedback; }
    }

    public static class ComplaintResponseDto {
        private Long id;
        private String ticketNumber;
        private String title;
        private String description;
        private Long studentId;
        private String studentName;
        private String studentEmail;
        private Long categoryId;
        private String categoryName;
        private String departmentName;
        private Long locationId;
        private String locationFullPath;
        private String landmarkDetails;
        private PriorityLevel priority;
        private ComplaintStatus status;
        private Long deptHeadId;
        private String deptHeadName;
        private Long assignedStaffId;
        private String assignedStaffName;
        private LocalDateTime slaDueDate;
        private LocalDateTime createdAt;
        private String beforeImageUrl;
        private String afterImageUrl;
        private String resolutionRemarks;
        private Integer rating;
        private String feedback;
        private Integer upvoteCount;
        private Boolean hasUpvoted;
        private List<ComplaintHistoryDto> history;
        private List<CommentDto> comments;

        public ComplaintResponseDto() {
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getTicketNumber() { return ticketNumber; }
        public void setTicketNumber(String ticketNumber) { this.ticketNumber = ticketNumber; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public Long getStudentId() { return studentId; }
        public void setStudentId(Long studentId) { this.studentId = studentId; }

        public String getStudentName() { return studentName; }
        public void setStudentName(String studentName) { this.studentName = studentName; }

        public String getStudentEmail() { return studentEmail; }
        public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }

        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

        public String getCategoryName() { return categoryName; }
        public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

        public String getDepartmentName() { return departmentName; }
        public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

        public Long getLocationId() { return locationId; }
        public void setLocationId(Long locationId) { this.locationId = locationId; }

        public String getLocationFullPath() { return locationFullPath; }
        public void setLocationFullPath(String locationFullPath) { this.locationFullPath = locationFullPath; }

        public String getLandmarkDetails() { return landmarkDetails; }
        public void setLandmarkDetails(String landmarkDetails) { this.landmarkDetails = landmarkDetails; }

        public PriorityLevel getPriority() { return priority; }
        public void setPriority(PriorityLevel priority) { this.priority = priority; }

        public ComplaintStatus getStatus() { return status; }
        public void setStatus(ComplaintStatus status) { this.status = status; }

        public Long getDeptHeadId() { return deptHeadId; }
        public void setDeptHeadId(Long deptHeadId) { this.deptHeadId = deptHeadId; }

        public String getDeptHeadName() { return deptHeadName; }
        public void setDeptHeadName(String deptHeadName) { this.deptHeadName = deptHeadName; }

        public Long getAssignedStaffId() { return assignedStaffId; }
        public void setAssignedStaffId(Long assignedStaffId) { this.assignedStaffId = assignedStaffId; }

        public String getAssignedStaffName() { return assignedStaffName; }
        public void setAssignedStaffName(String assignedStaffName) { this.assignedStaffName = assignedStaffName; }

        public LocalDateTime getSlaDueDate() { return slaDueDate; }
        public void setSlaDueDate(LocalDateTime slaDueDate) { this.slaDueDate = slaDueDate; }

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

        public String getBeforeImageUrl() { return beforeImageUrl; }
        public void setBeforeImageUrl(String beforeImageUrl) { this.beforeImageUrl = beforeImageUrl; }

        public String getAfterImageUrl() { return afterImageUrl; }
        public void setAfterImageUrl(String afterImageUrl) { this.afterImageUrl = afterImageUrl; }

        public String getResolutionRemarks() { return resolutionRemarks; }
        public void setResolutionRemarks(String resolutionRemarks) { this.resolutionRemarks = resolutionRemarks; }

        public Integer getRating() { return rating; }
        public void setRating(Integer rating) { this.rating = rating; }

        public String getFeedback() { return feedback; }
        public void setFeedback(String feedback) { this.feedback = feedback; }

        public Integer getUpvoteCount() { return upvoteCount; }
        public void setUpvoteCount(Integer upvoteCount) { this.upvoteCount = upvoteCount; }

        public Boolean getHasUpvoted() { return hasUpvoted; }
        public void setHasUpvoted(Boolean hasUpvoted) { this.hasUpvoted = hasUpvoted; }

        public List<ComplaintHistoryDto> getHistory() { return history; }
        public void setHistory(List<ComplaintHistoryDto> history) { this.history = history; }

        public List<CommentDto> getComments() { return comments; }
        public void setComments(List<CommentDto> comments) { this.comments = comments; }
    }

    public static class ComplaintHistoryDto {
        private Long id;
        private ComplaintStatus statusFrom;
        private ComplaintStatus statusTo;
        private String remarks;
        private String imageUrl;
        private String updatedByName;
        private LocalDateTime createdAt;

        public ComplaintHistoryDto() {
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public ComplaintStatus getStatusFrom() { return statusFrom; }
        public void setStatusFrom(ComplaintStatus statusFrom) { this.statusFrom = statusFrom; }

        public ComplaintStatus getStatusTo() { return statusTo; }
        public void setStatusTo(ComplaintStatus statusTo) { this.statusTo = statusTo; }

        public String getRemarks() { return remarks; }
        public void setRemarks(String remarks) { this.remarks = remarks; }

        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

        public String getUpdatedByName() { return updatedByName; }
        public void setUpdatedByName(String updatedByName) { this.updatedByName = updatedByName; }

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }

    public static class CommentDto {
        private Long id;
        private String text;
        private String attachmentUrl;
        private Long authorId;
        private String authorName;
        private String authorRole;
        private LocalDateTime createdAt;

        public CommentDto() {
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getText() { return text; }
        public void setText(String text) { this.text = text; }

        public String getAttachmentUrl() { return attachmentUrl; }
        public void setAttachmentUrl(String attachmentUrl) { this.attachmentUrl = attachmentUrl; }

        public Long getAuthorId() { return authorId; }
        public void setAuthorId(Long authorId) { this.authorId = authorId; }

        public String getAuthorName() { return authorName; }
        public void setAuthorName(String authorName) { this.authorName = authorName; }

        public String getAuthorRole() { return authorRole; }
        public void setAuthorRole(String authorRole) { this.authorRole = authorRole; }

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
}
