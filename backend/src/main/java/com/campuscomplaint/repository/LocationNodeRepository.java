package com.campuscomplaint.repository;

import com.campuscomplaint.entity.LocationNode;
import com.campuscomplaint.enums.LocationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationNodeRepository extends JpaRepository<LocationNode, Long> {
    List<LocationNode> findByParentId(Long parentId);
    List<LocationNode> findByType(LocationType type);
    List<LocationNode> findByParentIsNull();
    Optional<LocationNode> findByName(String name);
    boolean existsByName(String name);
}
