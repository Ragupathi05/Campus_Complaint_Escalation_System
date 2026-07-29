package com.campuscomplaint.scheduler;

import com.campuscomplaint.entity.AuditLog;
import com.campuscomplaint.entity.Complaint;
import com.campuscomplaint.entity.ComplaintHistory;
import com.campuscomplaint.enums.ComplaintStatus;
import com.campuscomplaint.repository.AuditLogRepository;
import com.campuscomplaint.repository.ComplaintHistoryRepository;
import com.campuscomplaint.repository.ComplaintRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class EscalationScheduler {

    private static final Logger log = LoggerFactory.getLogger(EscalationScheduler.class);

    private final ComplaintRepository complaintRepository;
    private final ComplaintHistoryRepository historyRepository;
    private final AuditLogRepository auditLogRepository;

    public EscalationScheduler(ComplaintRepository complaintRepository, ComplaintHistoryRepository historyRepository, AuditLogRepository auditLogRepository) {
        this.complaintRepository = complaintRepository;
        this.historyRepository = historyRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @Scheduled(cron = "${app.sla.check-cron:0 */15 * * * *}")
    @Transactional
    public void processOverdueComplaints() {
        LocalDateTime now = LocalDateTime.now();
        List<Complaint> overdueComplaints = complaintRepository.findOverdueUnescalatedComplaints(now);

        if (overdueComplaints.isEmpty()) {
            return;
        }

        log.info("SLA Escalation Scheduler found {} overdue complaints to escalate.", overdueComplaints.size());

        for (Complaint complaint : overdueComplaints) {
            ComplaintStatus prevStatus = complaint.getStatus();
            complaint.setStatus(ComplaintStatus.ESCALATED);
            complaint.setEscalatedAt(now);

            complaintRepository.save(complaint);

            ComplaintHistory history = ComplaintHistory.builder()
                    .complaint(complaint)
                    .updatedBy(null)
                    .statusFrom(prevStatus)
                    .statusTo(ComplaintStatus.ESCALATED)
                    .remarks("Automated SLA timeout trigger. Escalated to Department Head and Admin.")
                    .build();
            historyRepository.save(history);

            AuditLog auditLog = AuditLog.builder()
                    .action("SLA_AUTO_ESCALATION")
                    .complaintId(complaint.getId())
                    .ticketNumber(complaint.getTicketNumber())
                    .performedBy("SYSTEM_CRON_SCHEDULER")
                    .details("Ticket breached SLA due date (" + complaint.getSlaDueDate() + "). Auto-escalated.")
                    .build();
            auditLogRepository.save(auditLog);
        }
    }
}
