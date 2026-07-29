package com.campuscomplaint.controller;

import com.campuscomplaint.dto.AuthDtos;
import com.campuscomplaint.enums.RoleType;
import com.campuscomplaint.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HIGHER_OFFICIAL', 'ROLE_DEPT_HEAD')")
    public ResponseEntity<List<AuthDtos.UserProfileDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<AuthDtos.UserProfileDto>> getUsersByRole(@PathVariable RoleType role) {
        return ResponseEntity.ok(userService.getUsersByRole(role));
    }

    @GetMapping("/department/{departmentId:\\d+}/staff")
    public ResponseEntity<List<AuthDtos.UserProfileDto>> getDepartmentStaff(@PathVariable Long departmentId) {
        return ResponseEntity.ok(userService.getDepartmentStaff(departmentId));
    }

    @PostMapping("/create-staff")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_DEPT_HEAD')")
    public ResponseEntity<AuthDtos.UserProfileDto> createStaff(@Valid @RequestBody AuthDtos.CreateUserRequest request) {
        return new ResponseEntity<>(userService.createStaff(request), HttpStatus.CREATED);
    }

    @PostMapping("/create-dept-head")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<AuthDtos.UserProfileDto> createDeptHead(@Valid @RequestBody AuthDtos.CreateUserRequest request) {
        return new ResponseEntity<>(userService.createDeptHead(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id:\\d+}")
    public ResponseEntity<AuthDtos.UserProfileDto> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PatchMapping("/{id:\\d+}/status")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<AuthDtos.UserProfileDto> updateUserStatus(@PathVariable Long id, @RequestParam Boolean active) {
        return ResponseEntity.ok(userService.updateUserStatus(id, active));
    }

    @PutMapping("/{id:\\d+}/reset-password")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_DEPT_HEAD', 'ROLE_STUDENT', 'ROLE_FACULTY', 'ROLE_STAFF', 'ROLE_HIGHER_OFFICIAL')")
    public ResponseEntity<AuthDtos.UserProfileDto> resetPassword(@PathVariable Long id, @Valid @RequestBody AuthDtos.ResetPasswordRequest request) {
        return ResponseEntity.ok(userService.resetPassword(id, request.getNewPassword()));
    }

    @PutMapping("/{id:\\d+}/reassign-department")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<AuthDtos.UserProfileDto> reassignDepartment(@PathVariable Long id, @RequestParam Long departmentId) {
        return ResponseEntity.ok(userService.reassignDepartment(id, departmentId));
    }

    @DeleteMapping("/{id:\\d+}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
