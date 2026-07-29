package com.campuscomplaint.controller;

import com.campuscomplaint.dto.DepartmentLocationDtos;
import com.campuscomplaint.enums.LocationType;
import com.campuscomplaint.service.LocationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/roots")
    public ResponseEntity<List<DepartmentLocationDtos.LocationNodeDto>> getRootLocations() {
        return ResponseEntity.ok(locationService.getRootLocations());
    }

    @GetMapping("/{parentId}/children")
    public ResponseEntity<List<DepartmentLocationDtos.LocationNodeDto>> getChildLocations(@PathVariable Long parentId) {
        return ResponseEntity.ok(locationService.getChildLocations(parentId));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<DepartmentLocationDtos.LocationNodeDto>> getLocationsByType(@PathVariable LocationType type) {
        return ResponseEntity.ok(locationService.getLocationsByType(type));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<DepartmentLocationDtos.LocationNodeDto> createLocationNode(@Valid @RequestBody DepartmentLocationDtos.CreateLocationNodeRequest request) {
        return ResponseEntity.ok(locationService.createLocationNode(request));
    }
}
