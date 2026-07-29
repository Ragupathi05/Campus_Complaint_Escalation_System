package com.campuscomplaint.entity;

import com.campuscomplaint.enums.LocationType;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "location_nodes")
public class LocationNode extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private LocationType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private LocationNode parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LocationNode> children = new ArrayList<>();

    @Column(length = 50)
    private String blockName;

    private Integer floorNumber;

    @Column(length = 50)
    private String roomNumber;

    public LocationNode() {
    }

    public LocationNode(String name, LocationType type, LocationNode parent, String blockName, Integer floorNumber, String roomNumber) {
        this.name = name;
        this.type = type;
        this.parent = parent;
        this.blockName = blockName;
        this.floorNumber = floorNumber;
        this.roomNumber = roomNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocationType getType() {
        return type;
    }

    public void setType(LocationType type) {
        this.type = type;
    }

    public LocationNode getParent() {
        return parent;
    }

    public void setParent(LocationNode parent) {
        this.parent = parent;
    }

    public List<LocationNode> getChildren() {
        return children;
    }

    public void setChildren(List<LocationNode> children) {
        this.children = children;
    }

    public String getBlockName() {
        return blockName;
    }

    public void setBlockName(String blockName) {
        this.blockName = blockName;
    }

    public Integer getFloorNumber() {
        return floorNumber;
    }

    public void setFloorNumber(Integer floorNumber) {
        this.floorNumber = floorNumber;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getFullPath() {
        if (parent == null) {
            return name;
        }
        return parent.getFullPath() + " -> " + name;
    }

    public static LocationNodeBuilder builder() {
        return new LocationNodeBuilder();
    }

    public static class LocationNodeBuilder {
        private String name;
        private LocationType type;
        private LocationNode parent;
        private String blockName;
        private Integer floorNumber;
        private String roomNumber;

        public LocationNodeBuilder name(String name) {
            this.name = name;
            return this;
        }

        public LocationNodeBuilder type(LocationType type) {
            this.type = type;
            return this;
        }

        public LocationNodeBuilder parent(LocationNode parent) {
            this.parent = parent;
            return this;
        }

        public LocationNodeBuilder blockName(String blockName) {
            this.blockName = blockName;
            return this;
        }

        public LocationNodeBuilder floorNumber(Integer floorNumber) {
            this.floorNumber = floorNumber;
            return this;
        }

        public LocationNodeBuilder roomNumber(String roomNumber) {
            this.roomNumber = roomNumber;
            return this;
        }

        public LocationNode build() {
            return new LocationNode(name, type, parent, blockName, floorNumber, roomNumber);
        }
    }
}
