package com.campuscomplaint.service;

import com.campuscomplaint.dto.AuthDtos;
import com.campuscomplaint.enums.RoleType;

import java.util.List;

public interface UserService {
    List<AuthDtos.UserProfileDto> getAllUsers();
    List<AuthDtos.UserProfileDto> getUsersByRole(RoleType role);
    List<AuthDtos.UserProfileDto> getDepartmentStaff(Long departmentId);
    AuthDtos.UserProfileDto getUserById(Long id);
    AuthDtos.UserProfileDto updateUserStatus(Long id, Boolean active);
    AuthDtos.UserProfileDto createStaff(AuthDtos.CreateUserRequest request);
    AuthDtos.UserProfileDto createDeptHead(AuthDtos.CreateUserRequest request);
    AuthDtos.UserProfileDto resetPassword(Long userId, String newPassword);
    AuthDtos.UserProfileDto reassignDepartment(Long userId, Long departmentId);
    void deleteUser(Long userId);
}
