package com.campuscomplaint.service.impl;

import com.campuscomplaint.dto.AuthDtos;
import com.campuscomplaint.entity.Complaint;
import com.campuscomplaint.entity.Department;
import com.campuscomplaint.entity.User;
import com.campuscomplaint.enums.RoleType;
import com.campuscomplaint.exception.CustomExceptions;
import com.campuscomplaint.mapper.EntityDtoMapper;
import com.campuscomplaint.repository.ComplaintRepository;
import com.campuscomplaint.repository.DepartmentRepository;
import com.campuscomplaint.repository.UserRepository;
import com.campuscomplaint.service.UserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final ComplaintRepository complaintRepository;
    private final PasswordEncoder passwordEncoder;
    private final EntityDtoMapper mapper;

    @PersistenceContext
    private EntityManager entityManager;

    public UserServiceImpl(UserRepository userRepository,
                           DepartmentRepository departmentRepository,
                           ComplaintRepository complaintRepository,
                           PasswordEncoder passwordEncoder,
                           EntityDtoMapper mapper) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.complaintRepository = complaintRepository;
        this.passwordEncoder = passwordEncoder;
        this.mapper = mapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuthDtos.UserProfileDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(mapper::toUserProfileDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuthDtos.UserProfileDto> getUsersByRole(RoleType role) {
        return userRepository.findByRole(role).stream()
                .map(mapper::toUserProfileDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuthDtos.UserProfileDto> getDepartmentStaff(Long departmentId) {
        return userRepository.findByDepartmentIdAndRole(departmentId, RoleType.ROLE_STAFF).stream()
                .map(mapper::toUserProfileDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public AuthDtos.UserProfileDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("User not found with id: " + id));
        return mapper.toUserProfileDto(user);
    }

    @Override
    @Transactional
    public AuthDtos.UserProfileDto updateUserStatus(Long id, Boolean active) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("User not found with id: " + id));
        user.setActive(active);
        return mapper.toUserProfileDto(userRepository.save(user));
    }

    @Override
    @Transactional
    public AuthDtos.UserProfileDto createStaff(AuthDtos.CreateUserRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new CustomExceptions.BadRequestException("Username is already taken!");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new CustomExceptions.BadRequestException("Email is already registered!");
        }

        Department department = null;
        if (request.getDepartmentId() != null) {
            department = departmentRepository.findById(request.getDepartmentId())
                    .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Department not found"));
        }

        String rawPassword = request.getDefaultPassword() != null && !request.getDefaultPassword().isBlank()
                ? request.getDefaultPassword()
                : "MITS@123";

        User staff = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(rawPassword))
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .role(RoleType.ROLE_STAFF)
                .department(department)
                .active(true)
                .build();

        return mapper.toUserProfileDto(userRepository.save(staff));
    }

    @Override
    @Transactional
    public AuthDtos.UserProfileDto createDeptHead(AuthDtos.CreateUserRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new CustomExceptions.BadRequestException("Username is already taken!");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new CustomExceptions.BadRequestException("Email is already registered!");
        }

        Department department = null;
        if (request.getDepartmentId() != null) {
            department = departmentRepository.findById(request.getDepartmentId())
                    .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Department not found"));
        }

        String rawPassword = request.getDefaultPassword() != null && !request.getDefaultPassword().isBlank()
                ? request.getDefaultPassword()
                : "MITS@123";

        User deptHead = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(rawPassword))
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .role(RoleType.ROLE_DEPT_HEAD)
                .department(department)
                .active(true)
                .build();

        User savedHead = userRepository.save(deptHead);

        if (department != null) {
            department.setDeptHead(savedHead);
            departmentRepository.save(department);
        }

        return mapper.toUserProfileDto(savedHead);
    }

    @Override
    @Transactional
    public AuthDtos.UserProfileDto resetPassword(Long userId, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("User not found with id: " + userId));
        user.setPassword(passwordEncoder.encode(newPassword));
        return mapper.toUserProfileDto(userRepository.save(user));
    }

    @Override
    @Transactional
    public AuthDtos.UserProfileDto reassignDepartment(Long userId, Long departmentId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("User not found with id: " + userId));

        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Department not found with id: " + departmentId));

        user.setDepartment(department);
        return mapper.toUserProfileDto(userRepository.save(user));
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("User not found with id: " + userId));

        // 1. Unlink from any Department where user is deptHead
        List<Department> depts = departmentRepository.findAll();
        for (Department d : depts) {
            if (d.getDeptHead() != null && d.getDeptHead().getId().equals(userId)) {
                d.setDeptHead(null);
                departmentRepository.save(d);
            }
        }

        // 2. Unlink from complaint history audit logs
        entityManager.createQuery("UPDATE ComplaintHistory ch SET ch.updatedBy = null WHERE ch.updatedBy.id = :uid")
                .setParameter("uid", userId)
                .executeUpdate();

        // 3. Unlink from complaints (deptHead & assignedStaff)
        entityManager.createQuery("UPDATE Complaint c SET c.deptHead = null WHERE c.deptHead.id = :uid")
                .setParameter("uid", userId)
                .executeUpdate();

        entityManager.createQuery("UPDATE Complaint c SET c.assignedStaff = null WHERE c.assignedStaff.id = :uid")
                .setParameter("uid", userId)
                .executeUpdate();

        // 4. Clean up test complaints created by this student user
        List<Complaint> studentComplaints = complaintRepository.findByStudentId(userId);
        if (!studentComplaints.isEmpty()) {
            complaintRepository.deleteAll(studentComplaints);
        }

        // 5. Permanent deletion of user account from database
        userRepository.delete(user);
    }
}
