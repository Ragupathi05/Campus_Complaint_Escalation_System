package com.campuscomplaint.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "departments")
public class Department extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 20)
    private String code;

    @Column(length = 255)
    private String description;

    @Column(nullable = false)
    private Boolean active = true;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dept_head_id")
    private User deptHead;

    public Department() {}

    public Department(String name, String code, String description, Boolean active, User deptHead) {
        this.name = name;
        this.code = code;
        this.description = description;
        this.active = active != null ? active : true;
        this.deptHead = deptHead;
    }

    public static DepartmentBuilder builder() { return new DepartmentBuilder(); }

    public static class DepartmentBuilder {
        private String name;
        private String code;
        private String description;
        private Boolean active = true;
        private User deptHead;

        public DepartmentBuilder name(String name) { this.name = name; return this; }
        public DepartmentBuilder code(String code) { this.code = code; return this; }
        public DepartmentBuilder description(String description) { this.description = description; return this; }
        public DepartmentBuilder active(Boolean active) { this.active = active; return this; }
        public DepartmentBuilder deptHead(User deptHead) { this.deptHead = deptHead; return this; }
        public Department build() { return new Department(name, code, description, active, deptHead); }
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public User getDeptHead() { return deptHead; }
    public void setDeptHead(User deptHead) { this.deptHead = deptHead; }
}
