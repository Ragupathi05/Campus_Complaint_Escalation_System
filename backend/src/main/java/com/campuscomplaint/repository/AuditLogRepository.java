package com.campuscomplaint.repository;

import com.campuscomplaint.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByComplaintIdOrderByCreatedAtDesc(Long complaintId);
    List<AuditLog> findAllByOrderByCreatedAtDesc();
}
