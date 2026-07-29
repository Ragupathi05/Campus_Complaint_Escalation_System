package com.campuscomplaint.entity;

import com.campuscomplaint.enums.ComplaintStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "complaint_history")
public class ComplaintHistory extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "complaint_id", nullable = false)
    private Complaint complaint;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by_id")
    private User updatedBy;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_from", length = 30)
    private ComplaintStatus statusFrom;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_to", nullable = false, length = 30)
    private ComplaintStatus statusTo;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    public ComplaintHistory() {}

    public ComplaintHistory(Complaint complaint, User updatedBy, ComplaintStatus statusFrom, ComplaintStatus statusTo, String remarks, String imageUrl) {
        this.complaint = complaint;
        this.updatedBy = updatedBy;
        this.statusFrom = statusFrom;
        this.statusTo = statusTo;
        this.remarks = remarks;
        this.imageUrl = imageUrl;
    }

    public static ComplaintHistoryBuilder builder() { return new ComplaintHistoryBuilder(); }

    public static class ComplaintHistoryBuilder {
        private Complaint complaint;
        private User updatedBy;
        private ComplaintStatus statusFrom;
        private ComplaintStatus statusTo;
        private String remarks;
        private String imageUrl;

        public ComplaintHistoryBuilder complaint(Complaint complaint) { this.complaint = complaint; return this; }
        public ComplaintHistoryBuilder updatedBy(User updatedBy) { this.updatedBy = updatedBy; return this; }
        public ComplaintHistoryBuilder statusFrom(ComplaintStatus statusFrom) { this.statusFrom = statusFrom; return this; }
        public ComplaintHistoryBuilder statusTo(ComplaintStatus statusTo) { this.statusTo = statusTo; return this; }
        public ComplaintHistoryBuilder remarks(String remarks) { this.remarks = remarks; return this; }
        public ComplaintHistoryBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public ComplaintHistory build() { return new ComplaintHistory(complaint, updatedBy, statusFrom, statusTo, remarks, imageUrl); }
    }

    public Complaint getComplaint() { return complaint; }
    public void setComplaint(Complaint complaint) { this.complaint = complaint; }

    public User getUpdatedBy() { return updatedBy; }
    public void setUpdatedBy(User updatedBy) { this.updatedBy = updatedBy; }

    public ComplaintStatus getStatusFrom() { return statusFrom; }
    public void setStatusFrom(ComplaintStatus statusFrom) { this.statusFrom = statusFrom; }

    public ComplaintStatus getStatusTo() { return statusTo; }
    public void setStatusTo(ComplaintStatus statusTo) { this.statusTo = statusTo; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
