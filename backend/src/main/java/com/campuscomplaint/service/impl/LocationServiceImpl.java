package com.campuscomplaint.service.impl;

import com.campuscomplaint.dto.DepartmentLocationDtos;
import com.campuscomplaint.entity.LocationNode;
import com.campuscomplaint.enums.LocationType;
import com.campuscomplaint.exception.CustomExceptions;
import com.campuscomplaint.mapper.EntityDtoMapper;
import com.campuscomplaint.repository.LocationNodeRepository;
import com.campuscomplaint.service.LocationService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationServiceImpl implements LocationService {

    private final LocationNodeRepository locationRepository;
    private final EntityDtoMapper mapper;

    public LocationServiceImpl(LocationNodeRepository locationRepository, EntityDtoMapper mapper) {
        this.locationRepository = locationRepository;
        this.mapper = mapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentLocationDtos.LocationNodeDto> getRootLocations() {
        return locationRepository.findByParentIsNull().stream()
                .map(mapper::toLocationNodeDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentLocationDtos.LocationNodeDto> getChildLocations(Long parentId) {
        return locationRepository.findByParentId(parentId).stream()
                .map(mapper::toLocationNodeDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentLocationDtos.LocationNodeDto> getLocationsByType(LocationType type) {
        return locationRepository.findByType(type).stream()
                .map(mapper::toLocationNodeDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DepartmentLocationDtos.LocationNodeDto createLocationNode(DepartmentLocationDtos.CreateLocationNodeRequest request) {
        LocationNode parent = null;
        if (request.getParentId() != null) {
            parent = locationRepository.findById(request.getParentId())
                    .orElseThrow(() -> new CustomExceptions.ResourceNotFoundException("Parent location node not found"));
        }

        LocationNode node = LocationNode.builder()
                .name(request.getName())
                .type(request.getType())
                .parent(parent)
                .blockName(request.getBlockName())
                .floorNumber(request.getFloorNumber())
                .roomNumber(request.getRoomNumber())
                .build();

        return mapper.toLocationNodeDto(locationRepository.save(node));
    }
}
