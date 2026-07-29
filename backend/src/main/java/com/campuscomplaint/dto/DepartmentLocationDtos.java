package com.campuscomplaint.dto;

import com.campuscomplaint.enums.LocationType;
import com.campuscomplaint.enums.PriorityLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class DepartmentLocationDtos {

    public static class CreateDepartmentRequest {
        @NotBlank(message = "Department name is required")
        private String name;

        @NotBlank(message = "Department code is required")
        private String code;

        private String description;
        private Long deptHeadId;

        public CreateDepartmentRequest() {
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public Long getDeptHeadId() { return deptHeadId; }
        public void setDeptHeadId(Long deptHeadId) { this.deptHeadId = deptHeadId; }
    }

    public static class CreateCategoryRequest {
        @NotBlank(message = "Category name is required")
        private String name;

        private String description;

        @NotNull(message = "SLA hours is required")
        private Integer slaHours;

        @NotNull(message = "Default priority is required")
        private PriorityLevel defaultPriority;

        @NotNull(message = "Department ID is required")
        private Long departmentId;

        public CreateCategoryRequest() {
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public Integer getSlaHours() { return slaHours; }
        public void setSlaHours(Integer slaHours) { this.slaHours = slaHours; }

        public PriorityLevel getDefaultPriority() { return defaultPriority; }
        public void setDefaultPriority(PriorityLevel defaultPriority) { this.defaultPriority = defaultPriority; }

        public Long getDepartmentId() { return departmentId; }
        public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }
    }

    public static class CreateLocationNodeRequest {
        @NotBlank(message = "Location name is required")
        private String name;

        @NotNull(message = "Location type is required")
        private LocationType type;

        private Long parentId;
        private String blockName;
        private Integer floorNumber;
        private String roomNumber;

        public CreateLocationNodeRequest() {
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public LocationType getType() { return type; }
        public void setType(LocationType type) { this.type = type; }

        public Long getParentId() { return parentId; }
        public void setParentId(Long parentId) { this.parentId = parentId; }

        public String getBlockName() { return blockName; }
        public void setBlockName(String blockName) { this.blockName = blockName; }

        public Integer getFloorNumber() { return floorNumber; }
        public void setFloorNumber(Integer floorNumber) { this.floorNumber = floorNumber; }

        public String getRoomNumber() { return roomNumber; }
        public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    }

    public static class DepartmentDto {
        private Long id;
        private String name;
        private String code;
        private String description;
        private Boolean active;
        private Long deptHeadId;
        private String deptHeadName;

        public DepartmentDto() {
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public Boolean getActive() { return active; }
        public void setActive(Boolean active) { this.active = active; }

        public Long getDeptHeadId() { return deptHeadId; }
        public void setDeptHeadId(Long deptHeadId) { this.deptHeadId = deptHeadId; }

        public String getDeptHeadName() { return deptHeadName; }
        public void setDeptHeadName(String deptHeadName) { this.deptHeadName = deptHeadName; }
    }

    public static class CategoryDto {
        private Long id;
        private String name;
        private String description;
        private Integer slaHours;
        private PriorityLevel defaultPriority;
        private Long departmentId;
        private String departmentName;

        public CategoryDto() {
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public Integer getSlaHours() { return slaHours; }
        public void setSlaHours(Integer slaHours) { this.slaHours = slaHours; }

        public PriorityLevel getDefaultPriority() { return defaultPriority; }
        public void setDefaultPriority(PriorityLevel defaultPriority) { this.defaultPriority = defaultPriority; }

        public Long getDepartmentId() { return departmentId; }
        public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }

        public String getDepartmentName() { return departmentName; }
        public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }
    }

    public static class LocationNodeDto {
        private Long id;
        private String name;
        private LocationType type;
        private Long parentId;
        private String parentName;
        private String blockName;
        private Integer floorNumber;
        private String roomNumber;
        private String fullPath;
        private List<LocationNodeDto> children;

        public LocationNodeDto() {
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public LocationType getType() { return type; }
        public void setType(LocationType type) { this.type = type; }

        public Long getParentId() { return parentId; }
        public void setParentId(Long parentId) { this.parentId = parentId; }

        public String getParentName() { return parentName; }
        public void setParentName(String parentName) { this.parentName = parentName; }

        public String getBlockName() { return blockName; }
        public void setBlockName(String blockName) { this.blockName = blockName; }

        public Integer getFloorNumber() { return floorNumber; }
        public void setFloorNumber(Integer floorNumber) { this.floorNumber = floorNumber; }

        public String getRoomNumber() { return roomNumber; }
        public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

        public String getFullPath() { return fullPath; }
        public void setFullPath(String fullPath) { this.fullPath = fullPath; }

        public List<LocationNodeDto> getChildren() { return children; }
        public void setChildren(List<LocationNodeDto> children) { this.children = children; }
    }
}
