package com.campuscomplaint.service;

import com.campuscomplaint.dto.DepartmentLocationDtos;

import java.util.List;

public interface DepartmentService {
    List<DepartmentLocationDtos.DepartmentDto> getAllDepartments();
    DepartmentLocationDtos.DepartmentDto getDepartmentById(Long id);
    DepartmentLocationDtos.DepartmentDto createDepartment(DepartmentLocationDtos.CreateDepartmentRequest request);
    DepartmentLocationDtos.DepartmentDto updateDepartment(Long id, DepartmentLocationDtos.CreateDepartmentRequest request);
    void deleteDepartment(Long id);
    DepartmentLocationDtos.DepartmentDto assignDeptHead(Long departmentId, Long userId);
    DepartmentLocationDtos.DepartmentDto assignDeptHeadByUsername(Long departmentId, String username);
    DepartmentLocationDtos.DepartmentDto unassignDeptHead(Long departmentId);

    List<DepartmentLocationDtos.CategoryDto> getAllCategories();
    List<DepartmentLocationDtos.CategoryDto> getCategoriesByDepartment(Long departmentId);
    DepartmentLocationDtos.CategoryDto createCategory(DepartmentLocationDtos.CreateCategoryRequest request);
}
