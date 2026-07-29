package com.campuscomplaint.service;

import com.campuscomplaint.dto.AuthDtos;

public interface AuthService {
    AuthDtos.JwtResponse login(AuthDtos.LoginRequest request);
    AuthDtos.UserProfileDto register(AuthDtos.RegisterRequest request);
    AuthDtos.UserProfileDto getCurrentUserProfile(String username);
}
