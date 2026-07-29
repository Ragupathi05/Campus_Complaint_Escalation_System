package com.campuscomplaint.service.impl;

import com.campuscomplaint.dto.AuthDtos;
import com.campuscomplaint.entity.Department;
import com.campuscomplaint.entity.User;
import com.campuscomplaint.enums.RoleType;
import com.campuscomplaint.exception.CustomExceptions;
import com.campuscomplaint.mapper.EntityDtoMapper;
import com.campuscomplaint.repository.DepartmentRepository;
import com.campuscomplaint.repository.UserRepository;
import com.campuscomplaint.security.JwtTokenProvider;
import com.campuscomplaint.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final EntityDtoMapper mapper;

    public AuthServiceImpl(AuthenticationManager authenticationManager, UserRepository userRepository, DepartmentRepository departmentRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider, EntityDtoMapper mapper) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.mapper = mapper;
    }

    @Override
    public AuthDtos.JwtResponse login(AuthDtos.LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsernameOrEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(authentication.getName())
                .orElseGet(() -> userRepository.findByEmail(authentication.getName())
                        .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("User not found")));

        return AuthDtos.JwtResponse.builder()
                .token(jwt)
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .departmentId(user.getDepartment() != null ? user.getDepartment().getId() : null)
                .departmentName(user.getDepartment() != null ? user.getDepartment().getName() : null)
                .build();
    }

    @Override
    @Transactional
    public AuthDtos.UserProfileDto register(AuthDtos.RegisterRequest request) {
        // Enforce role restriction: Only STUDENT and FACULTY can self-register
        if (request.getRole() != RoleType.ROLE_STUDENT && request.getRole() != RoleType.ROLE_FACULTY) {
            throw new CustomExceptions.BadRequestException("Only Students and Teaching Faculty can self-register. Maintenance Staff and Department Supervisors must be created by Admin.");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new CustomExceptions.BadRequestException("Username is already taken!");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new CustomExceptions.BadRequestException("Email is already registered!");
        }

        Department department = null;
        if (request.getDepartmentId() != null) {
            department = departmentRepository.findById(request.getDepartmentId()).orElse(null);
        } else if (request.getDepartmentCode() != null && !request.getDepartmentCode().isBlank()) {
            String codeOrName = request.getDepartmentCode().trim();
            department = departmentRepository.findByCode(codeOrName.toUpperCase())
                    .orElseGet(() -> departmentRepository.findByName(codeOrName).orElse(null));
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .role(request.getRole())
                .department(department)
                .active(true)
                .build();

        User savedUser = userRepository.save(user);

        return mapper.toUserProfileDto(savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public AuthDtos.UserProfileDto getCurrentUserProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("User not found with username: " + username));
        return mapper.toUserProfileDto(user);
    }
}
