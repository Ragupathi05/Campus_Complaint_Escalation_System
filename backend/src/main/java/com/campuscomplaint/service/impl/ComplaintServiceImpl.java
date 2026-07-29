package com.campuscomplaint.service.impl;

import com.campuscomplaint.dto.ComplaintDtos;
import com.campuscomplaint.entity.*;
import com.campuscomplaint.enums.ComplaintStatus;
import com.campuscomplaint.enums.PriorityLevel;
import com.campuscomplaint.exception.CustomExceptions;
import com.campuscomplaint.mapper.EntityDtoMapper;
import com.campuscomplaint.repository.*;
import com.campuscomplaint.service.ComplaintService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final LocationNodeRepository locationNodeRepository;
    private final ComplaintHistoryRepository historyRepository;
    private final CommentRepository commentRepository;
    private final AuditLogRepository auditLogRepository;
    private final EntityDtoMapper mapper;

    public ComplaintServiceImpl(ComplaintRepository complaintRepository, UserRepository userRepository, CategoryRepository categoryRepository, LocationNodeRepository locationNodeRepository, ComplaintHistoryRepository historyRepository, CommentRepository commentRepository, AuditLogRepository auditLogRepository, EntityDtoMapper mapper) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.locationNodeRepository = locationNodeRepository;
        this.historyRepository = historyRepository;
        this.commentRepository = commentRepository;
        this.auditLogRepository = auditLogRepository;
        this.mapper = mapper;
    }

    @Override
    @Transactional
    public ComplaintDtos.ComplaintResponseDto createComplaint(ComplaintDtos.CreateComplaintRequest request, String username) {
        User student = userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Student user not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Category not found"));

        LocationNode location = locationNodeRepository.findById(request.getLocationId())
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Location node not found"));

        Department department = category.getDepartment();
        User deptHead = department != null ? department.getDeptHead() : null;

        String ticketNumber = "MITS-" + LocalDateTime.now().getYear() + "-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        PriorityLevel priority = category.getDefaultPriority();
        LocalDateTime slaDueDate = LocalDateTime.now().plusHours(category.getSlaHours());

        Complaint complaint = Complaint.builder()
                .ticketNumber(ticketNumber)
                .title(request.getTitle())
                .description(request.getDescription())
                .student(student)
                .category(category)
                .location(location)
                .landmarkDetails(request.getLandmarkDetails())
                .priority(priority)
                .status(ComplaintStatus.NEW)
                .deptHead(deptHead)
                .slaDueDate(slaDueDate)
                .beforeImageUrl(request.getBeforeImageUrl())
                .upvoteCount(1)
                .build();

        complaint.getUpvotedUserIds().add(student.getId());

        Complaint saved = complaintRepository.save(complaint);

        ComplaintHistory history = ComplaintHistory.builder()
                .complaint(saved)
                .statusFrom(null)
                .statusTo(ComplaintStatus.NEW)
                .remarks("Complaint created by student " + student.getFullName())
                .imageUrl(saved.getBeforeImageUrl())
                .updatedBy(student)
                .build();
        historyRepository.save(history);

        AuditLog audit = AuditLog.builder()
                .ticketNumber(saved.getTicketNumber())
                .complaintId(saved.getId())
                .action("TICKET_CREATED")
                .performedBy(student.getUsername())
                .details("Created ticket titled: " + saved.getTitle() + " in department: " + (department != null ? department.getName() : "General"))
                .build();
        auditLogRepository.save(audit);

        return mapper.toComplaintResponseDto(saved, student);
    }

    @Override
    @Transactional(readOnly = true)
    public ComplaintDtos.ComplaintResponseDto getComplaintById(Long id, String username) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Complaint not found with ID: " + id));
        User currentUser = userRepository.findByUsername(username).orElse(null);
        return mapper.toComplaintResponseDto(complaint, currentUser);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ComplaintDtos.ComplaintResponseDto> getMyComplaints(String username) {
        User student = userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("User not found"));
        return complaintRepository.findByStudentIdOrderByCreatedAtDesc(student.getId())
                .stream()
                .map(c -> mapper.toComplaintResponseDto(c, student))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ComplaintDtos.ComplaintResponseDto> getDepartmentComplaints(Long departmentId) {
        return complaintRepository.findByCategoryDepartmentIdOrderByCreatedAtDesc(departmentId)
                .stream()
                .map(mapper::toComplaintResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ComplaintDtos.ComplaintResponseDto> getAssignedStaffComplaints(String staffUsername) {
        User staff = userRepository.findByUsername(staffUsername)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Staff user not found"));
        return complaintRepository.findByAssignedStaffIdOrderByCreatedAtDesc(staff.getId())
                .stream()
                .map(c -> mapper.toComplaintResponseDto(c, staff))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ComplaintDtos.ComplaintResponseDto> getEscalatedComplaints() {
        return complaintRepository.findByStatusOrderByCreatedAtDesc(ComplaintStatus.ESCALATED)
                .stream()
                .map(mapper::toComplaintResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ComplaintDtos.ComplaintResponseDto> getPublicFeed(String username) {
        User currentUser = userRepository.findByUsername(username).orElse(null);
        return complaintRepository.findAllByOrderByUpvoteCountDescCreatedAtDesc()
                .stream()
                .map(c -> mapper.toComplaintResponseDto(c, currentUser))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ComplaintDtos.ComplaintResponseDto upvoteComplaint(Long complaintId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("User not found"));

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Complaint not found"));

        if (complaint.getUpvotedUserIds().contains(user.getId())) {
            complaint.getUpvotedUserIds().remove(user.getId());
            complaint.setUpvoteCount(Math.max(0, complaint.getUpvoteCount() - 1));
        } else {
            complaint.getUpvotedUserIds().add(user.getId());
            complaint.setUpvoteCount(complaint.getUpvoteCount() + 1);

            int upvotes = complaint.getUpvoteCount();
            PriorityLevel oldPriority = complaint.getPriority();

            if (upvotes >= 10 && oldPriority != PriorityLevel.CRITICAL) {
                complaint.setPriority(PriorityLevel.CRITICAL);
                complaint.setSlaDueDate(LocalDateTime.now().plusHours(4));
            } else if (upvotes >= 5 && (oldPriority == PriorityLevel.LOW || oldPriority == PriorityLevel.MEDIUM)) {
                complaint.setPriority(PriorityLevel.HIGH);
                complaint.setSlaDueDate(LocalDateTime.now().plusHours(12));
            }

            if (complaint.getPriority() != oldPriority) {
                ComplaintHistory history = ComplaintHistory.builder()
                        .complaint(complaint)
                        .statusFrom(complaint.getStatus())
                        .statusTo(complaint.getStatus())
                        .remarks("Priority auto-escalated to " + complaint.getPriority() + " due to " + upvotes + " community upvotes.")
                        .updatedBy(user)
                        .build();
                historyRepository.save(history);
            }
        }

        Complaint saved = complaintRepository.save(complaint);
        return mapper.toComplaintResponseDto(saved, user);
    }

    @Override
    @Transactional
    public ComplaintDtos.ComplaintResponseDto assignStaff(Long complaintId, ComplaintDtos.AssignStaffRequest request, String deptHeadUsername) {
        User deptHead = userRepository.findByUsername(deptHeadUsername)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Dept Head not found"));

        User staff = userRepository.findById(request.getStaffId())
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Staff member not found"));

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Complaint not found"));

        ComplaintStatus oldStatus = complaint.getStatus();
        complaint.setAssignedStaff(staff);
        complaint.setStatus(ComplaintStatus.ASSIGNED);

        Complaint saved = complaintRepository.save(complaint);

        ComplaintHistory history = ComplaintHistory.builder()
                .complaint(saved)
                .statusFrom(oldStatus)
                .statusTo(ComplaintStatus.ASSIGNED)
                .remarks("Assigned to staff " + staff.getFullName() + ". Remarks: " + (request.getRemarks() != null ? request.getRemarks() : "N/A"))
                .updatedBy(deptHead)
                .build();
        historyRepository.save(history);

        return mapper.toComplaintResponseDto(saved, deptHead);
    }

    @Override
    @Transactional
    public ComplaintDtos.ComplaintResponseDto acceptComplaint(Long complaintId, String staffUsername) {
        User staff = userRepository.findByUsername(staffUsername)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Staff user not found"));

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Complaint not found"));

        ComplaintStatus oldStatus = complaint.getStatus();
        complaint.setStatus(ComplaintStatus.ACCEPTED);

        Complaint saved = complaintRepository.save(complaint);

        ComplaintHistory history = ComplaintHistory.builder()
                .complaint(saved)
                .statusFrom(oldStatus)
                .statusTo(ComplaintStatus.ACCEPTED)
                .remarks("Task accepted by staff " + staff.getFullName())
                .updatedBy(staff)
                .build();
        historyRepository.save(history);

        return mapper.toComplaintResponseDto(saved, staff);
    }

    @Override
    @Transactional
    public ComplaintDtos.ComplaintResponseDto updateStatus(Long complaintId, ComplaintDtos.UpdateStatusRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("User not found"));

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Complaint not found"));

        ComplaintStatus oldStatus = complaint.getStatus();
        complaint.setStatus(request.getStatus());

        if (request.getAfterImageUrl() != null) {
            complaint.setAfterImageUrl(request.getAfterImageUrl());
        }

        Complaint saved = complaintRepository.save(complaint);

        ComplaintHistory history = ComplaintHistory.builder()
                .complaint(saved)
                .statusFrom(oldStatus)
                .statusTo(request.getStatus())
                .remarks(request.getRemarks() != null ? request.getRemarks() : "Status updated to " + request.getStatus())
                .imageUrl(request.getAfterImageUrl())
                .updatedBy(user)
                .build();
        historyRepository.save(history);

        return mapper.toComplaintResponseDto(saved, user);
    }

    @Override
    @Transactional
    public ComplaintDtos.ComplaintResponseDto resolveComplaint(Long complaintId, ComplaintDtos.ResolveComplaintRequest request, String staffUsername) {
        User staff = userRepository.findByUsername(staffUsername)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Staff user not found"));

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Complaint not found"));

        ComplaintStatus oldStatus = complaint.getStatus();
        complaint.setStatus(ComplaintStatus.RESOLVED);
        if (request.getAfterImageUrl() != null) {
            complaint.setAfterImageUrl(request.getAfterImageUrl());
        }
        if (request.getRemarks() != null) {
            complaint.setResolutionRemarks(request.getRemarks());
        }

        Complaint saved = complaintRepository.save(complaint);

        ComplaintHistory history = ComplaintHistory.builder()
                .complaint(saved)
                .statusFrom(oldStatus)
                .statusTo(ComplaintStatus.RESOLVED)
                .remarks("Marked resolved by staff " + staff.getFullName() + ". Proof uploaded.")
                .imageUrl(request.getAfterImageUrl())
                .updatedBy(staff)
                .build();
        historyRepository.save(history);

        return mapper.toComplaintResponseDto(saved, staff);
    }

    @Override
    @Transactional
    public ComplaintDtos.ComplaintResponseDto verifyComplaint(Long complaintId, ComplaintDtos.VerifyComplaintRequest request, String studentUsername) {
        User student = userRepository.findByUsername(studentUsername)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Student not found"));

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Complaint not found"));

        ComplaintStatus oldStatus = complaint.getStatus();
        complaint.setStatus(ComplaintStatus.CLOSED);
        if (request.getRating() != null) complaint.setRating(request.getRating());
        if (request.getFeedback() != null) complaint.setFeedback(request.getFeedback());

        Complaint saved = complaintRepository.save(complaint);

        ComplaintHistory history = ComplaintHistory.builder()
                .complaint(saved)
                .statusFrom(oldStatus)
                .statusTo(ComplaintStatus.CLOSED)
                .remarks("Student verified resolution and rated service: " + complaint.getRating() + "/5 stars.")
                .updatedBy(student)
                .build();
        historyRepository.save(history);

        return mapper.toComplaintResponseDto(saved, student);
    }

    @Override
    @Transactional
    public ComplaintDtos.ComplaintResponseDto reopenComplaint(Long complaintId, String remarks, String studentUsername) {
        User student = userRepository.findByUsername(studentUsername)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Student not found"));

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Complaint not found"));

        ComplaintStatus oldStatus = complaint.getStatus();
        complaint.setStatus(ComplaintStatus.REOPENED);
        complaint.setPriority(PriorityLevel.HIGH);
        complaint.setSlaDueDate(LocalDateTime.now().plusHours(12));

        Complaint saved = complaintRepository.save(complaint);

        ComplaintHistory history = ComplaintHistory.builder()
                .complaint(saved)
                .statusFrom(oldStatus)
                .statusTo(ComplaintStatus.REOPENED)
                .remarks("Reopened by student: " + remarks)
                .updatedBy(student)
                .build();
        historyRepository.save(history);

        return mapper.toComplaintResponseDto(saved, student);
    }

    @Override
    @Transactional
    public ComplaintDtos.CommentDto addComment(Long complaintId, String text, String username) {
        User author = userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("User not found"));

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Complaint not found"));

        Comment comment = Comment.builder()
                .complaint(complaint)
                .author(author)
                .text(text)
                .build();

        Comment saved = commentRepository.save(comment);
        return mapper.toCommentDto(saved);
    }
}
