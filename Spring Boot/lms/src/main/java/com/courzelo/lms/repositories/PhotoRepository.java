package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepository extends MongoRepository<Photo,String> {
}
