package com.campuscomplaint.service.impl;

import com.campuscomplaint.dto.DepartmentLocationDtos;
import com.campuscomplaint.entity.Category;
import com.campuscomplaint.entity.Department;
import com.campuscomplaint.entity.User;
import com.campuscomplaint.enums.RoleType;
import com.campuscomplaint.exception.CustomExceptions;
import com.campuscomplaint.mapper.EntityDtoMapper;
import com.campuscomplaint.repository.CategoryRepository;
import com.campuscomplaint.repository.DepartmentRepository;
import com.campuscomplaint.repository.UserRepository;
import com.campuscomplaint.service.DepartmentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final EntityDtoMapper mapper;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository, CategoryRepository categoryRepository, UserRepository userRepository, EntityDtoMapper mapper) {
        this.departmentRepository = departmentRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentLocationDtos.DepartmentDto> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(mapper::toDepartmentDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DepartmentLocationDtos.DepartmentDto getDepartmentById(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Department not found with id: " + id));
        return mapper.toDepartmentDto(department);
    }

    @Override
    @Transactional
    public DepartmentLocationDtos.DepartmentDto createDepartment(DepartmentLocationDtos.CreateDepartmentRequest request) {
        User deptHead = null;
        if (request.getDeptHeadId() != null) {
            deptHead = userRepository.findById(request.getDeptHeadId())
                    .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Department Head user not found"));
        }

        Department department = Department.builder()
                .name(request.getName())
                .code(request.getCode())
                .description(request.getDescription())
                .deptHead(deptHead)
                .active(true)
                .build();

        return mapper.toDepartmentDto(departmentRepository.save(department));
    }

    @Override
    @Transactional
    public DepartmentLocationDtos.DepartmentDto updateDepartment(Long id, DepartmentLocationDtos.CreateDepartmentRequest request) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Department not found with id: " + id));

        department.setName(request.getName());
        department.setCode(request.getCode());
        department.setDescription(request.getDescription());

        if (request.getDeptHeadId() != null) {
            User head = userRepository.findById(request.getDeptHeadId())
                    .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("User not found with id: " + request.getDeptHeadId()));
            head.setRole(RoleType.ROLE_DEPT_HEAD);
            head.setDepartment(department);
            userRepository.save(head);
            department.setDeptHead(head);
        }

        return mapper.toDepartmentDto(departmentRepository.save(department));
    }

    @Override
    @Transactional
    public void deleteDepartment(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Department not found with id: " + id));

        department.setActive(false);
        departmentRepository.save(department);
    }

    @Override
    @Transactional
    public DepartmentLocationDtos.DepartmentDto assignDeptHead(Long departmentId, Long userId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Department not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("User not found"));

        user.setRole(RoleType.ROLE_DEPT_HEAD);
        user.setDepartment(department);
        userRepository.save(user);

        department.setDeptHead(user);
        return mapper.toDepartmentDto(departmentRepository.save(department));
    }

    @Override
    @Transactional
    public DepartmentLocationDtos.DepartmentDto assignDeptHeadByUsername(Long departmentId, String username) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Department not found"));

        User user = userRepository.findByUsername(username)
                .orElseGet(() -> userRepository.findByEmail(username)
                        .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("User not found with username/email: " + username)));

        user.setRole(RoleType.ROLE_DEPT_HEAD);
        user.setDepartment(department);
        userRepository.save(user);

        department.setDeptHead(user);
        return mapper.toDepartmentDto(departmentRepository.save(department));
    }

    @Override
    @Transactional
    public DepartmentLocationDtos.DepartmentDto unassignDeptHead(Long departmentId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Department not found with id: " + departmentId));

        if (department.getDeptHead() != null) {
            User head = department.getDeptHead();
            head.setRole(RoleType.ROLE_STAFF);
            userRepository.save(head);
            department.setDeptHead(null);
        }

        return mapper.toDepartmentDto(departmentRepository.save(department));
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentLocationDtos.CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(mapper::toCategoryDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentLocationDtos.CategoryDto> getCategoriesByDepartment(Long departmentId) {
        return categoryRepository.findByDepartmentId(departmentId).stream()
                .map(mapper::toCategoryDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DepartmentLocationDtos.CategoryDto createCategory(DepartmentLocationDtos.CreateCategoryRequest request) {
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Department not found"));

        Category category = Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .defaultPriority(request.getDefaultPriority())
                .slaHours(request.getSlaHours())
                .department(department)
                .build();

        return mapper.toCategoryDto(categoryRepository.save(category));
    }
}
