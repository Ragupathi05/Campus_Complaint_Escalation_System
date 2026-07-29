package com.campuscomplaint.repository;

import com.campuscomplaint.entity.Complaint;
import com.campuscomplaint.enums.ComplaintStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByStudentId(Long studentId);
    List<Complaint> findByAssignedStaffId(Long staffId);
    List<Complaint> findByCategoryDepartmentId(Long departmentId);

    List<Complaint> findByStudentIdOrderByCreatedAtDesc(Long studentId);
    List<Complaint> findByCategoryDepartmentIdOrderByCreatedAtDesc(Long departmentId);
    List<Complaint> findByAssignedStaffIdOrderByCreatedAtDesc(Long staffId);
    List<Complaint> findByStatusOrderByCreatedAtDesc(ComplaintStatus status);
    List<Complaint> findAllByOrderByUpvoteCountDescCreatedAtDesc();

    Long countByAssignedStaffIdAndStatusIn(Long staffId, List<ComplaintStatus> statuses);

    @Query("SELECT c FROM Complaint c WHERE c.slaDueDate < :now AND c.status NOT IN ('RESOLVED', 'VERIFIED', 'CLOSED', 'ESCALATED', 'REJECTED')")
    List<Complaint> findOverdueUnescalatedComplaints(@Param("now") LocalDateTime now);
}
