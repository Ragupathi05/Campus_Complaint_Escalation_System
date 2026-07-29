package com.campuscomplaint.mapper;

import com.campuscomplaint.dto.*;
import com.campuscomplaint.entity.*;
import com.campuscomplaint.enums.ComplaintStatus;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class EntityDtoMapper {

    public AuthDtos.UserProfileDto toUserProfileDto(User user) {
        if (user == null) return null;

        AuthDtos.UserProfileDto dto = new AuthDtos.UserProfileDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setFullName(user.getFullName());
        dto.setPhone(user.getPhone());
        dto.setRole(user.getRole());
        dto.setActive(user.getActive());
        if (user.getDepartment() != null) {
            dto.setDepartmentId(user.getDepartment().getId());
            dto.setDepartmentName(user.getDepartment().getName());
        }
        return dto;
    }

    public DepartmentLocationDtos.DepartmentDto toDepartmentDto(Department department) {
        if (department == null) return null;

        DepartmentLocationDtos.DepartmentDto dto = new DepartmentLocationDtos.DepartmentDto();
        dto.setId(department.getId());
        dto.setName(department.getName());
        dto.setCode(department.getCode());
        dto.setDescription(department.getDescription());
        dto.setActive(department.getActive());
        if (department.getDeptHead() != null) {
            dto.setDeptHeadId(department.getDeptHead().getId());
            dto.setDeptHeadName(department.getDeptHead().getFullName());
        }
        return dto;
    }

    public DepartmentLocationDtos.CategoryDto toCategoryDto(Category category) {
        if (category == null) return null;

        DepartmentLocationDtos.CategoryDto dto = new DepartmentLocationDtos.CategoryDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());
        dto.setSlaHours(category.getSlaHours());
        dto.setDefaultPriority(category.getDefaultPriority());
        if (category.getDepartment() != null) {
            dto.setDepartmentId(category.getDepartment().getId());
            dto.setDepartmentName(category.getDepartment().getName());
        }
        return dto;
    }

    public DepartmentLocationDtos.LocationNodeDto toLocationNodeDto(LocationNode node) {
        if (node == null) return null;

        DepartmentLocationDtos.LocationNodeDto dto = new DepartmentLocationDtos.LocationNodeDto();
        dto.setId(node.getId());
        dto.setName(node.getName());
        dto.setType(node.getType());
        dto.setBlockName(node.getBlockName());
        dto.setFloorNumber(node.getFloorNumber());
        dto.setRoomNumber(node.getRoomNumber());
        dto.setFullPath(node.getFullPath());
        if (node.getParent() != null) {
            dto.setParentId(node.getParent().getId());
            dto.setParentName(node.getParent().getName());
        }
        if (node.getChildren() != null) {
            dto.setChildren(node.getChildren().stream().map(this::toLocationNodeDto).collect(Collectors.toList()));
        }
        return dto;
    }

    public ComplaintDtos.ComplaintResponseDto toComplaintResponseDto(Complaint complaint) {
        return toComplaintResponseDto(complaint, null);
    }

    public ComplaintDtos.ComplaintResponseDto toComplaintResponseDto(Complaint complaint, User currentUser) {
        if (complaint == null) return null;

        ComplaintDtos.ComplaintResponseDto dto = new ComplaintDtos.ComplaintResponseDto();
        dto.setId(complaint.getId());
        dto.setTicketNumber(complaint.getTicketNumber());
        dto.setTitle(complaint.getTitle());
        dto.setDescription(complaint.getDescription());

        if (complaint.getStudent() != null) {
            dto.setStudentId(complaint.getStudent().getId());
            dto.setStudentName(complaint.getStudent().getFullName());
            dto.setStudentEmail(complaint.getStudent().getEmail());
        }

        if (complaint.getCategory() != null) {
            dto.setCategoryId(complaint.getCategory().getId());
            dto.setCategoryName(complaint.getCategory().getName());
            if (complaint.getCategory().getDepartment() != null) {
                dto.setDepartmentName(complaint.getCategory().getDepartment().getName());
            }
        }

        if (complaint.getLocation() != null) {
            dto.setLocationId(complaint.getLocation().getId());
            dto.setLocationFullPath(complaint.getLocation().getFullPath());
        }

        dto.setLandmarkDetails(complaint.getLandmarkDetails());
        dto.setPriority(complaint.getPriority());
        dto.setStatus(complaint.getStatus());

        if (complaint.getDeptHead() != null) {
            dto.setDeptHeadId(complaint.getDeptHead().getId());
            dto.setDeptHeadName(complaint.getDeptHead().getFullName());
        }

        if (complaint.getAssignedStaff() != null) {
            dto.setAssignedStaffId(complaint.getAssignedStaff().getId());
            dto.setAssignedStaffName(complaint.getAssignedStaff().getFullName());
        }

        dto.setSlaDueDate(complaint.getSlaDueDate());
        dto.setCreatedAt(complaint.getCreatedAt());
        dto.setBeforeImageUrl(complaint.getBeforeImageUrl());
        dto.setAfterImageUrl(complaint.getAfterImageUrl());
        dto.setResolutionRemarks(complaint.getResolutionRemarks());
        dto.setRating(complaint.getRating());
        dto.setFeedback(complaint.getFeedback());
        dto.setUpvoteCount(complaint.getUpvoteCount() != null ? complaint.getUpvoteCount() : 0);

        if (currentUser != null && complaint.getUpvotedUserIds() != null) {
            dto.setHasUpvoted(complaint.getUpvotedUserIds().contains(currentUser.getId()));
        } else {
            dto.setHasUpvoted(false);
        }

        if (complaint.getHistory() != null) {
            dto.setHistory(complaint.getHistory().stream().map(this::toComplaintHistoryDto).collect(Collectors.toList()));
        }

        if (complaint.getComments() != null) {
            dto.setComments(complaint.getComments().stream().map(this::toCommentDto).collect(Collectors.toList()));
        }

        return dto;
    }

    public ComplaintDtos.ComplaintHistoryDto toComplaintHistoryDto(ComplaintHistory history) {
        if (history == null) return null;

        ComplaintDtos.ComplaintHistoryDto dto = new ComplaintDtos.ComplaintHistoryDto();
        dto.setId(history.getId());
        dto.setStatusFrom(history.getStatusFrom());
        dto.setStatusTo(history.getStatusTo());
        dto.setRemarks(history.getRemarks());

        String img = history.getImageUrl();
        if ((img == null || img.isBlank()) && history.getComplaint() != null) {
            if (history.getStatusTo() == ComplaintStatus.IN_PROGRESS ||
                history.getStatusTo() == ComplaintStatus.WAITING_PARTS ||
                history.getStatusTo() == ComplaintStatus.RESOLVED ||
                history.getStatusTo() == ComplaintStatus.VERIFIED ||
                history.getStatusTo() == ComplaintStatus.ACCEPTED) {
                img = history.getComplaint().getAfterImageUrl();
            } else if (history.getStatusTo() == ComplaintStatus.NEW) {
                img = history.getComplaint().getBeforeImageUrl();
            }
        }
        dto.setImageUrl(img);

        if (history.getUpdatedBy() != null) {
            dto.setUpdatedByName(history.getUpdatedBy().getFullName());
        }
        dto.setCreatedAt(history.getCreatedAt());
        return dto;
    }

    public ComplaintDtos.CommentDto toCommentDto(Comment comment) {
        if (comment == null) return null;

        ComplaintDtos.CommentDto dto = new ComplaintDtos.CommentDto();
        dto.setId(comment.getId());
        dto.setText(comment.getText());
        dto.setAttachmentUrl(comment.getAttachmentUrl());
        if (comment.getAuthor() != null) {
            dto.setAuthorId(comment.getAuthor().getId());
            dto.setAuthorName(comment.getAuthor().getFullName());
            dto.setAuthorRole(comment.getAuthor().getRole().name());
        }
        dto.setCreatedAt(comment.getCreatedAt());
        return dto;
    }
}
