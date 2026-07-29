package com.campuscomplaint.controller;

import com.campuscomplaint.dto.DepartmentLocationDtos;
import com.campuscomplaint.service.DepartmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public ResponseEntity<List<DepartmentLocationDtos.DepartmentDto>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    @GetMapping("/{id:\\d+}")
    public ResponseEntity<DepartmentLocationDtos.DepartmentDto> getDepartmentById(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.getDepartmentById(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<DepartmentLocationDtos.DepartmentDto> createDepartment(@Valid @RequestBody DepartmentLocationDtos.CreateDepartmentRequest request) {
        return new ResponseEntity<>(departmentService.createDepartment(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id:\\d+}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<DepartmentLocationDtos.DepartmentDto> updateDepartment(@PathVariable Long id, @Valid @RequestBody DepartmentLocationDtos.CreateDepartmentRequest request) {
        return ResponseEntity.ok(departmentService.updateDepartment(id, request));
    }

    @DeleteMapping("/{id:\\d+}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id:\\d+}/head/{userId:\\d+}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<DepartmentLocationDtos.DepartmentDto> assignDeptHead(@PathVariable Long id, @PathVariable Long userId) {
        return ResponseEntity.ok(departmentService.assignDeptHead(id, userId));
    }

    @PutMapping("/{id:\\d+}/head-username")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<DepartmentLocationDtos.DepartmentDto> assignDeptHeadByUsername(@PathVariable Long id, @RequestParam String username) {
        return ResponseEntity.ok(departmentService.assignDeptHeadByUsername(id, username));
    }

    @PutMapping("/{id:\\d+}/unassign-head")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<DepartmentLocationDtos.DepartmentDto> unassignDeptHead(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.unassignDeptHead(id));
    }
}
