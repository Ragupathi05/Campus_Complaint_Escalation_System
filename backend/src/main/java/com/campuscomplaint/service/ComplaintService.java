package com.campuscomplaint.service;

import com.campuscomplaint.dto.ComplaintDtos;
import java.util.List;

public interface ComplaintService {
    ComplaintDtos.ComplaintResponseDto createComplaint(ComplaintDtos.CreateComplaintRequest request, String username);
    ComplaintDtos.ComplaintResponseDto getComplaintById(Long id, String username);
    List<ComplaintDtos.ComplaintResponseDto> getMyComplaints(String username);
    List<ComplaintDtos.ComplaintResponseDto> getDepartmentComplaints(Long departmentId);
    List<ComplaintDtos.ComplaintResponseDto> getAssignedStaffComplaints(String staffUsername);
    List<ComplaintDtos.ComplaintResponseDto> getEscalatedComplaints();
    List<ComplaintDtos.ComplaintResponseDto> getPublicFeed(String username);
    ComplaintDtos.ComplaintResponseDto upvoteComplaint(Long complaintId, String username);
    ComplaintDtos.ComplaintResponseDto assignStaff(Long complaintId, ComplaintDtos.AssignStaffRequest request, String deptHeadUsername);
    ComplaintDtos.ComplaintResponseDto acceptComplaint(Long complaintId, String staffUsername);
    ComplaintDtos.ComplaintResponseDto updateStatus(Long complaintId, ComplaintDtos.UpdateStatusRequest request, String username);
    ComplaintDtos.ComplaintResponseDto resolveComplaint(Long complaintId, ComplaintDtos.ResolveComplaintRequest request, String staffUsername);
    ComplaintDtos.ComplaintResponseDto verifyComplaint(Long complaintId, ComplaintDtos.VerifyComplaintRequest request, String studentUsername);
    ComplaintDtos.ComplaintResponseDto reopenComplaint(Long complaintId, String remarks, String studentUsername);
    ComplaintDtos.CommentDto addComment(Long complaintId, String text, String username);
}
