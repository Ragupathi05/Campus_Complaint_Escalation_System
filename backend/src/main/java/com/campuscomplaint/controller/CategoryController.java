package com.campuscomplaint.controller;

import com.campuscomplaint.dto.DepartmentLocationDtos;
import com.campuscomplaint.service.DepartmentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final DepartmentService departmentService;

    public CategoryController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public ResponseEntity<List<DepartmentLocationDtos.CategoryDto>> getAllCategories() {
        return ResponseEntity.ok(departmentService.getAllCategories());
    }

    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<DepartmentLocationDtos.CategoryDto>> getCategoriesByDepartment(@PathVariable Long departmentId) {
        return ResponseEntity.ok(departmentService.getCategoriesByDepartment(departmentId));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<DepartmentLocationDtos.CategoryDto> createCategory(@Valid @RequestBody DepartmentLocationDtos.CreateCategoryRequest request) {
        return ResponseEntity.ok(departmentService.createCategory(request));
    }
}
