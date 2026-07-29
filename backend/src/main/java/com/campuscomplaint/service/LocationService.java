package com.campuscomplaint.service;

import com.campuscomplaint.dto.DepartmentLocationDtos;
import com.campuscomplaint.enums.LocationType;

import java.util.List;

public interface LocationService {
    List<DepartmentLocationDtos.LocationNodeDto> getRootLocations();
    List<DepartmentLocationDtos.LocationNodeDto> getChildLocations(Long parentId);
    List<DepartmentLocationDtos.LocationNodeDto> getLocationsByType(LocationType type);
    DepartmentLocationDtos.LocationNodeDto createLocationNode(DepartmentLocationDtos.CreateLocationNodeRequest request);
}
