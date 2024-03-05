package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.user.DeviceMetadata;
import com.courzelo.lms.entities.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DeviceMetadataRepository extends MongoRepository<DeviceMetadata, String> {
    List<DeviceMetadata> findByUser(User user);

    List<DeviceMetadata> findByUser(User user, Pageable pageable);

    long countByUser(User user);
}
