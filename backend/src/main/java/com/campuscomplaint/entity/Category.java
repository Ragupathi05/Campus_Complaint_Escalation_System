package com.campuscomplaint.entity;

import com.campuscomplaint.enums.PriorityLevel;
import jakarta.persistence.*;

@Entity
@Table(name = "categories")
public class Category extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(length = 255)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "default_priority", nullable = false, length = 20)
    private PriorityLevel defaultPriority;

    @Column(name = "sla_hours", nullable = false)
    private Integer slaHours = 48;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    public Category() {}

    public Category(String name, String description, PriorityLevel defaultPriority, Integer slaHours, Department department) {
        this.name = name;
        this.description = description;
        this.defaultPriority = defaultPriority;
        this.slaHours = slaHours != null ? slaHours : 48;
        this.department = department;
    }

    public static CategoryBuilder builder() { return new CategoryBuilder(); }

    public static class CategoryBuilder {
        private String name;
        private String description;
        private PriorityLevel defaultPriority;
        private Integer slaHours = 48;
        private Department department;

        public CategoryBuilder name(String name) { this.name = name; return this; }
        public CategoryBuilder description(String description) { this.description = description; return this; }
        public CategoryBuilder defaultPriority(PriorityLevel defaultPriority) { this.defaultPriority = defaultPriority; return this; }
        public CategoryBuilder slaHours(Integer slaHours) { this.slaHours = slaHours; return this; }
        public CategoryBuilder department(Department department) { this.department = department; return this; }
        public Category build() { return new Category(name, description, defaultPriority, slaHours, department); }
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public PriorityLevel getDefaultPriority() { return defaultPriority; }
    public void setDefaultPriority(PriorityLevel defaultPriority) { this.defaultPriority = defaultPriority; }

    public Integer getSlaHours() { return slaHours; }
    public void setSlaHours(Integer slaHours) { this.slaHours = slaHours; }

    public Department getDepartment() { return department; }
    public void setDepartment(Department department) { this.department = department; }
}
