package com.campuscomplaint.entity;

import com.campuscomplaint.enums.ComplaintStatus;
import com.campuscomplaint.enums.PriorityLevel;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "complaints")
public class Complaint extends BaseEntity {

    @Column(nullable = false, unique = true, length = 50)
    private String ticketNumber;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "location_id", nullable = false)
    private LocationNode location;

    @Column(length = 255)
    private String landmarkDetails;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PriorityLevel priority;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ComplaintStatus status = ComplaintStatus.NEW;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dept_head_id")
    private User deptHead;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_staff_id")
    private User assignedStaff;

    @Column(nullable = false)
    private LocalDateTime slaDueDate;

    private LocalDateTime escalatedAt;

    @Column(length = 255)
    private String beforeImageUrl;

    @Column(length = 255)
    private String afterImageUrl;

    @Column(columnDefinition = "TEXT")
    private String resolutionRemarks;

    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    @Column(nullable = false)
    private Integer upvoteCount = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "complaint_upvotes", joinColumns = @JoinColumn(name = "complaint_id"))
    @Column(name = "user_id")
    private Set<Long> upvotedUserIds = new HashSet<>();

    @OneToMany(mappedBy = "complaint", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ComplaintHistory> history = new ArrayList<>();

    @OneToMany(mappedBy = "complaint", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    public Complaint() {
    }

    public Complaint(String ticketNumber, String title, String description, User student, Category category, LocationNode location, String landmarkDetails, PriorityLevel priority, ComplaintStatus status, User deptHead, User assignedStaff, LocalDateTime slaDueDate, LocalDateTime escalatedAt, String beforeImageUrl, String afterImageUrl, String resolutionRemarks, Integer rating, String feedback, Integer upvoteCount, Set<Long> upvotedUserIds) {
        this.ticketNumber = ticketNumber;
        this.title = title;
        this.description = description;
        this.student = student;
        this.category = category;
        this.location = location;
        this.landmarkDetails = landmarkDetails;
        this.priority = priority;
        this.status = status;
        this.deptHead = deptHead;
        this.assignedStaff = assignedStaff;
        this.slaDueDate = slaDueDate;
        this.escalatedAt = escalatedAt;
        this.beforeImageUrl = beforeImageUrl;
        this.afterImageUrl = afterImageUrl;
        this.resolutionRemarks = resolutionRemarks;
        this.rating = rating;
        this.feedback = feedback;
        this.upvoteCount = upvoteCount != null ? upvoteCount : 0;
        this.upvotedUserIds = upvotedUserIds != null ? upvotedUserIds : new HashSet<>();
    }

    public String getTicketNumber() {
        return ticketNumber;
    }

    public void setTicketNumber(String ticketNumber) {
        this.ticketNumber = ticketNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public LocationNode getLocation() {
        return location;
    }

    public void setLocation(LocationNode location) {
        this.location = location;
    }

    public String getLandmarkDetails() {
        return landmarkDetails;
    }

    public void setLandmarkDetails(String landmarkDetails) {
        this.landmarkDetails = landmarkDetails;
    }

    public PriorityLevel getPriority() {
        return priority;
    }

    public void setPriority(PriorityLevel priority) {
        this.priority = priority;
    }

    public ComplaintStatus getStatus() {
        return status;
    }

    public void setStatus(ComplaintStatus status) {
        this.status = status;
    }

    public User getDeptHead() {
        return deptHead;
    }

    public void setDeptHead(User deptHead) {
        this.deptHead = deptHead;
    }

    public User getAssignedStaff() {
        return assignedStaff;
    }

    public void setAssignedStaff(User assignedStaff) {
        this.assignedStaff = assignedStaff;
    }

    public LocalDateTime getSlaDueDate() {
        return slaDueDate;
    }

    public void setSlaDueDate(LocalDateTime slaDueDate) {
        this.slaDueDate = slaDueDate;
    }

    public LocalDateTime getEscalatedAt() {
        return escalatedAt;
    }

    public void setEscalatedAt(LocalDateTime escalatedAt) {
        this.escalatedAt = escalatedAt;
    }

    public String getBeforeImageUrl() {
        return beforeImageUrl;
    }

    public void setBeforeImageUrl(String beforeImageUrl) {
        this.beforeImageUrl = beforeImageUrl;
    }

    public String getAfterImageUrl() {
        return afterImageUrl;
    }

    public void setAfterImageUrl(String afterImageUrl) {
        this.afterImageUrl = afterImageUrl;
    }

    public String getResolutionRemarks() {
        return resolutionRemarks;
    }

    public void setResolutionRemarks(String resolutionRemarks) {
        this.resolutionRemarks = resolutionRemarks;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public Integer getUpvoteCount() {
        return upvoteCount;
    }

    public void setUpvoteCount(Integer upvoteCount) {
        this.upvoteCount = upvoteCount;
    }

    public Set<Long> getUpvotedUserIds() {
        return upvotedUserIds;
    }

    public void setUpvotedUserIds(Set<Long> upvotedUserIds) {
        this.upvotedUserIds = upvotedUserIds;
    }

    public List<ComplaintHistory> getHistory() {
        return history;
    }

    public void setHistory(List<ComplaintHistory> history) {
        this.history = history;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public static ComplaintBuilder builder() {
        return new ComplaintBuilder();
    }

    public static class ComplaintBuilder {
        private String ticketNumber;
        private String title;
        private String description;
        private User student;
        private Category category;
        private LocationNode location;
        private String landmarkDetails;
        private PriorityLevel priority;
        private ComplaintStatus status = ComplaintStatus.NEW;
        private User deptHead;
        private User assignedStaff;
        private LocalDateTime slaDueDate;
        private LocalDateTime escalatedAt;
        private String beforeImageUrl;
        private String afterImageUrl;
        private String resolutionRemarks;
        private Integer rating;
        private String feedback;
        private Integer upvoteCount = 0;
        private Set<Long> upvotedUserIds = new HashSet<>();

        public ComplaintBuilder ticketNumber(String ticketNumber) {
            this.ticketNumber = ticketNumber;
            return this;
        }

        public ComplaintBuilder title(String title) {
            this.title = title;
            return this;
        }

        public ComplaintBuilder description(String description) {
            this.description = description;
            return this;
        }

        public ComplaintBuilder student(User student) {
            this.student = student;
            return this;
        }

        public ComplaintBuilder category(Category category) {
            this.category = category;
            return this;
        }

        public ComplaintBuilder location(LocationNode location) {
            this.location = location;
            return this;
        }

        public ComplaintBuilder landmarkDetails(String landmarkDetails) {
            this.landmarkDetails = landmarkDetails;
            return this;
        }

        public ComplaintBuilder priority(PriorityLevel priority) {
            this.priority = priority;
            return this;
        }

        public ComplaintBuilder status(ComplaintStatus status) {
            this.status = status;
            return this;
        }

        public ComplaintBuilder deptHead(User deptHead) {
            this.deptHead = deptHead;
            return this;
        }

        public ComplaintBuilder assignedStaff(User assignedStaff) {
            this.assignedStaff = assignedStaff;
            return this;
        }

        public ComplaintBuilder slaDueDate(LocalDateTime slaDueDate) {
            this.slaDueDate = slaDueDate;
            return this;
        }

        public ComplaintBuilder escalatedAt(LocalDateTime escalatedAt) {
            this.escalatedAt = escalatedAt;
            return this;
        }

        public ComplaintBuilder beforeImageUrl(String beforeImageUrl) {
            this.beforeImageUrl = beforeImageUrl;
            return this;
        }

        public ComplaintBuilder afterImageUrl(String afterImageUrl) {
            this.afterImageUrl = afterImageUrl;
            return this;
        }

        public ComplaintBuilder resolutionRemarks(String resolutionRemarks) {
            this.resolutionRemarks = resolutionRemarks;
            return this;
        }

        public ComplaintBuilder rating(Integer rating) {
            this.rating = rating;
            return this;
        }

        public ComplaintBuilder feedback(String feedback) {
            this.feedback = feedback;
            return this;
        }

        public ComplaintBuilder upvoteCount(Integer upvoteCount) {
            this.upvoteCount = upvoteCount;
            return this;
        }

        public ComplaintBuilder upvotedUserIds(Set<Long> upvotedUserIds) {
            this.upvotedUserIds = upvotedUserIds;
            return this;
        }

        public Complaint build() {
            return new Complaint(ticketNumber, title, description, student, category, location, landmarkDetails, priority, status, deptHead, assignedStaff, slaDueDate, escalatedAt, beforeImageUrl, afterImageUrl, resolutionRemarks, rating, feedback, upvoteCount, upvotedUserIds);
        }
    }
}
