package com.campuscomplaint.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "audit_logs")
public class AuditLog extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String action;

    @Column(name = "complaint_id")
    private Long complaintId;

    @Column(name = "ticket_number", length = 50)
    private String ticketNumber;

    @Column(name = "performed_by", length = 100)
    private String performedBy;

    @Column(columnDefinition = "TEXT")
    private String details;

    public AuditLog() {}

    public AuditLog(String action, Long complaintId, String ticketNumber, String performedBy, String details) {
        this.action = action;
        this.complaintId = complaintId;
        this.ticketNumber = ticketNumber;
        this.performedBy = performedBy;
        this.details = details;
    }

    public static AuditLogBuilder builder() { return new AuditLogBuilder(); }

    public static class AuditLogBuilder {
        private String action;
        private Long complaintId;
        private String ticketNumber;
        private String performedBy;
        private String details;

        public AuditLogBuilder action(String action) { this.action = action; return this; }
        public AuditLogBuilder complaintId(Long complaintId) { this.complaintId = complaintId; return this; }
        public AuditLogBuilder ticketNumber(String ticketNumber) { this.ticketNumber = ticketNumber; return this; }
        public AuditLogBuilder performedBy(String performedBy) { this.performedBy = performedBy; return this; }
        public AuditLogBuilder details(String details) { this.details = details; return this; }
        public AuditLog build() { return new AuditLog(action, complaintId, ticketNumber, performedBy, details); }
    }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public Long getComplaintId() { return complaintId; }
    public void setComplaintId(Long complaintId) { this.complaintId = complaintId; }

    public String getTicketNumber() { return ticketNumber; }
    public void setTicketNumber(String ticketNumber) { this.ticketNumber = ticketNumber; }

    public String getPerformedBy() { return performedBy; }
    public void setPerformedBy(String performedBy) { this.performedBy = performedBy; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
}
