package com.campuscomplaint.controller;

import com.campuscomplaint.dto.ComplaintDtos;
import com.campuscomplaint.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('STUDENT', 'FACULTY')")
    public ResponseEntity<ComplaintDtos.ComplaintResponseDto> createComplaint(@Valid @RequestBody ComplaintDtos.CreateComplaintRequest request, Principal principal) {
        return new ResponseEntity<>(complaintService.createComplaint(request, principal.getName()), HttpStatus.CREATED);
    }

    @GetMapping("/my")
    @PreAuthorize("hasAnyRole('STUDENT', 'FACULTY')")
    public ResponseEntity<List<ComplaintDtos.ComplaintResponseDto>> getMyComplaints(Principal principal) {
        return ResponseEntity.ok(complaintService.getMyComplaints(principal.getName()));
    }

    @GetMapping("/feed")
    public ResponseEntity<List<ComplaintDtos.ComplaintResponseDto>> getPublicFeed(Principal principal) {
        String username = principal != null ? principal.getName() : null;
        return ResponseEntity.ok(complaintService.getPublicFeed(username));
    }

    @GetMapping("/assigned-me")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<List<ComplaintDtos.ComplaintResponseDto>> getAssignedStaffComplaints(Principal principal) {
        return ResponseEntity.ok(complaintService.getAssignedStaffComplaints(principal.getName()));
    }

    @GetMapping("/escalated")
    @PreAuthorize("hasAnyRole('ADMIN', 'HIGHER_OFFICIAL')")
    public ResponseEntity<List<ComplaintDtos.ComplaintResponseDto>> getEscalatedComplaints() {
        return ResponseEntity.ok(complaintService.getEscalatedComplaints());
    }

    @GetMapping("/department/{departmentId:\\d+}")
    @PreAuthorize("hasAnyRole('DEPT_HEAD', 'ADMIN')")
    public ResponseEntity<List<ComplaintDtos.ComplaintResponseDto>> getDepartmentComplaints(@PathVariable Long departmentId) {
        return ResponseEntity.ok(complaintService.getDepartmentComplaints(departmentId));
    }

    @GetMapping("/{id:\\d+}")
    public ResponseEntity<ComplaintDtos.ComplaintResponseDto> getComplaintById(@PathVariable Long id, Principal principal) {
        String username = principal != null ? principal.getName() : null;
        return ResponseEntity.ok(complaintService.getComplaintById(id, username));
    }

    @PostMapping("/{id:\\d+}/upvote")
    public ResponseEntity<ComplaintDtos.ComplaintResponseDto> upvoteComplaint(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(complaintService.upvoteComplaint(id, principal.getName()));
    }

    @PutMapping("/{id:\\d+}/assign")
    @PreAuthorize("hasRole('DEPT_HEAD')")
    public ResponseEntity<ComplaintDtos.ComplaintResponseDto> assignStaff(@PathVariable Long id, @Valid @RequestBody ComplaintDtos.AssignStaffRequest request, Principal principal) {
        return ResponseEntity.ok(complaintService.assignStaff(id, request, principal.getName()));
    }

    @PutMapping("/{id:\\d+}/accept")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<ComplaintDtos.ComplaintResponseDto> acceptComplaint(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(complaintService.acceptComplaint(id, principal.getName()));
    }

    @PutMapping("/{id:\\d+}/status")
    @PreAuthorize("hasAnyRole('STAFF', 'DEPT_HEAD', 'ADMIN')")
    public ResponseEntity<ComplaintDtos.ComplaintResponseDto> updateStatus(@PathVariable Long id, @Valid @RequestBody ComplaintDtos.UpdateStatusRequest request, Principal principal) {
        return ResponseEntity.ok(complaintService.updateStatus(id, request, principal.getName()));
    }

    @PutMapping("/{id:\\d+}/resolve")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<ComplaintDtos.ComplaintResponseDto> resolveComplaint(@PathVariable Long id, @Valid @RequestBody ComplaintDtos.ResolveComplaintRequest request, Principal principal) {
        return ResponseEntity.ok(complaintService.resolveComplaint(id, request, principal.getName()));
    }

    @PutMapping("/{id:\\d+}/verify")
    @PreAuthorize("hasAnyRole('STUDENT', 'FACULTY')")
    public ResponseEntity<ComplaintDtos.ComplaintResponseDto> verifyComplaint(@PathVariable Long id, @Valid @RequestBody ComplaintDtos.VerifyComplaintRequest request, Principal principal) {
        return ResponseEntity.ok(complaintService.verifyComplaint(id, request, principal.getName()));
    }

    @PutMapping("/{id:\\d+}/reopen")
    @PreAuthorize("hasAnyRole('STUDENT', 'FACULTY')")
    public ResponseEntity<ComplaintDtos.ComplaintResponseDto> reopenComplaint(@PathVariable Long id, @RequestBody String remarks, Principal principal) {
        return ResponseEntity.ok(complaintService.reopenComplaint(id, remarks, principal.getName()));
    }

    @PostMapping("/{id:\\d+}/comments")
    public ResponseEntity<ComplaintDtos.CommentDto> addComment(@PathVariable Long id, @RequestBody String text, Principal principal) {
        return ResponseEntity.ok(complaintService.addComment(id, text, principal.getName()));
    }
}
