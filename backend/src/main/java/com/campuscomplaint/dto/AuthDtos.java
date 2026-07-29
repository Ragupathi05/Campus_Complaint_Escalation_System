package com.campuscomplaint.dto;

import com.campuscomplaint.enums.RoleType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class AuthDtos {

    public static class LoginRequest {
        @NotBlank(message = "Username or email is required")
        private String usernameOrEmail;

        @NotBlank(message = "Password is required")
        private String password;

        public LoginRequest() {}
        public LoginRequest(String usernameOrEmail, String password) {
            this.usernameOrEmail = usernameOrEmail;
            this.password = password;
        }
        public String getUsernameOrEmail() { return usernameOrEmail; }
        public void setUsernameOrEmail(String usernameOrEmail) { this.usernameOrEmail = usernameOrEmail; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        @NotBlank(message = "Username is required")
        @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
        private String username;

        @NotBlank(message = "Email is required")
        @Email(message = "Must be a valid email address")
        private String email;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;

        @NotBlank(message = "Full name is required")
        private String fullName;

        private String phone;

        @NotNull(message = "Role is required")
        private RoleType role;

        private Long departmentId;
        private String departmentCode; // Accepts free text academic branch code like CSE, CSM, ECE

        public RegisterRequest() {}
        public RegisterRequest(String username, String email, String password, String fullName, String phone, RoleType role, Long departmentId, String departmentCode) {
            this.username = username;
            this.email = email;
            this.password = password;
            this.fullName = fullName;
            this.phone = phone;
            this.role = role;
            this.departmentId = departmentId;
            this.departmentCode = departmentCode;
        }
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public RoleType getRole() { return role; }
        public void setRole(RoleType role) { this.role = role; }
        public Long getDepartmentId() { return departmentId; }
        public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }
        public String getDepartmentCode() { return departmentCode; }
        public void setDepartmentCode(String departmentCode) { this.departmentCode = departmentCode; }
    }

    public static class CreateUserRequest {
        @NotBlank(message = "Username is required")
        private String username;

        @NotBlank(message = "Email is required")
        @Email(message = "Must be a valid email address")
        private String email;

        @NotBlank(message = "Full name is required")
        private String fullName;

        private String phone;

        private String defaultPassword;

        @NotNull(message = "Role is required")
        private RoleType role;

        private Long departmentId;

        public CreateUserRequest() {}
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public String getDefaultPassword() { return defaultPassword; }
        public void setDefaultPassword(String defaultPassword) { this.defaultPassword = defaultPassword; }
        public RoleType getRole() { return role; }
        public void setRole(RoleType role) { this.role = role; }
        public Long getDepartmentId() { return departmentId; }
        public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }
    }

    public static class ResetPasswordRequest {
        private String currentPassword;

        @NotBlank(message = "New password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String newPassword;

        public ResetPasswordRequest() {}
        public String getCurrentPassword() { return currentPassword; }
        public void setCurrentPassword(String currentPassword) { this.currentPassword = currentPassword; }
        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }

    public static class JwtResponse {
        private String token;
        private String type = "Bearer";
        private Long id;
        private String username;
        private String email;
        private String fullName;
        private RoleType role;
        private Long departmentId;
        private String departmentName;

        public JwtResponse() {}
        public JwtResponse(String token, String type, Long id, String username, String email, String fullName, RoleType role, Long departmentId, String departmentName) {
            this.token = token;
            this.type = type != null ? type : "Bearer";
            this.id = id;
            this.username = username;
            this.email = email;
            this.fullName = fullName;
            this.role = role;
            this.departmentId = departmentId;
            this.departmentName = departmentName;
        }

        public static JwtResponseBuilder builder() { return new JwtResponseBuilder(); }
        public static class JwtResponseBuilder {
            private String token;
            private String type = "Bearer";
            private Long id;
            private String username;
            private String email;
            private String fullName;
            private RoleType role;
            private Long departmentId;
            private String departmentName;

            public JwtResponseBuilder token(String token) { this.token = token; return this; }
            public JwtResponseBuilder type(String type) { this.type = type; return this; }
            public JwtResponseBuilder id(Long id) { this.id = id; return this; }
            public JwtResponseBuilder username(String username) { this.username = username; return this; }
            public JwtResponseBuilder email(String email) { this.email = email; return this; }
            public JwtResponseBuilder fullName(String fullName) { this.fullName = fullName; return this; }
            public JwtResponseBuilder role(RoleType role) { this.role = role; return this; }
            public JwtResponseBuilder departmentId(Long departmentId) { this.departmentId = departmentId; return this; }
            public JwtResponseBuilder departmentName(String departmentName) { this.departmentName = departmentName; return this; }
            public JwtResponse build() { return new JwtResponse(token, type, id, username, email, fullName, role, departmentId, departmentName); }
        }

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public RoleType getRole() { return role; }
        public void setRole(RoleType role) { this.role = role; }
        public Long getDepartmentId() { return departmentId; }
        public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }
        public String getDepartmentName() { return departmentName; }
        public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }
    }

    public static class UserProfileDto {
        private Long id;
        private String username;
        private String email;
        private String fullName;
        private String phone;
        private RoleType role;
        private Long departmentId;
        private String departmentName;
        private Boolean active;

        public UserProfileDto() {}
        public UserProfileDto(Long id, String username, String email, String fullName, String phone, RoleType role, Long departmentId, String departmentName, Boolean active) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.fullName = fullName;
            this.phone = phone;
            this.role = role;
            this.departmentId = departmentId;
            this.departmentName = departmentName;
            this.active = active;
        }

        public static UserProfileDtoBuilder builder() { return new UserProfileDtoBuilder(); }
        public static class UserProfileDtoBuilder {
            private Long id;
            private String username;
            private String email;
            private String fullName;
            private String phone;
            private RoleType role;
            private Long departmentId;
            private String departmentName;
            private Boolean active;

            public UserProfileDtoBuilder id(Long id) { this.id = id; return this; }
            public UserProfileDtoBuilder username(String username) { this.username = username; return this; }
            public UserProfileDtoBuilder email(String email) { this.email = email; return this; }
            public UserProfileDtoBuilder fullName(String fullName) { this.fullName = fullName; return this; }
            public UserProfileDtoBuilder phone(String phone) { this.phone = phone; return this; }
            public UserProfileDtoBuilder role(RoleType role) { this.role = role; return this; }
            public UserProfileDtoBuilder departmentId(Long departmentId) { this.departmentId = departmentId; return this; }
            public UserProfileDtoBuilder departmentName(String departmentName) { this.departmentName = departmentName; return this; }
            public UserProfileDtoBuilder active(Boolean active) { this.active = active; return this; }
            public UserProfileDto build() { return new UserProfileDto(id, username, email, fullName, phone, role, departmentId, departmentName, active); }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public RoleType getRole() { return role; }
        public void setRole(RoleType role) { this.role = role; }
        public Long getDepartmentId() { return departmentId; }
        public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }
        public String getDepartmentName() { return departmentName; }
        public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }
        public Boolean getActive() { return active; }
        public void setActive(Boolean active) { this.active = active; }
    }
}
