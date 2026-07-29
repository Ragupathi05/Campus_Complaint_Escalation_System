package com.campuscomplaint.entity;

import com.campuscomplaint.enums.RoleType;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User extends BaseEntity {

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(length = 20)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private RoleType role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    @Column(nullable = false)
    private Boolean active = true;

    public User() {}

    public User(String username, String password, String email, String fullName, String phone, RoleType role, Department department, Boolean active) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.fullName = fullName;
        this.phone = phone;
        this.role = role;
        this.department = department;
        this.active = active != null ? active : true;
    }

    public static UserBuilder builder() { return new UserBuilder(); }

    public static class UserBuilder {
        private String username;
        private String password;
        private String email;
        private String fullName;
        private String phone;
        private RoleType role;
        private Department department;
        private Boolean active = true;

        public UserBuilder username(String username) { this.username = username; return this; }
        public UserBuilder password(String password) { this.password = password; return this; }
        public UserBuilder email(String email) { this.email = email; return this; }
        public UserBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public UserBuilder phone(String phone) { this.phone = phone; return this; }
        public UserBuilder role(RoleType role) { this.role = role; return this; }
        public UserBuilder department(Department department) { this.department = department; return this; }
        public UserBuilder active(Boolean active) { this.active = active; return this; }
        public User build() { return new User(username, password, email, fullName, phone, role, department, active); }
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public RoleType getRole() { return role; }
    public void setRole(RoleType role) { this.role = role; }

    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
