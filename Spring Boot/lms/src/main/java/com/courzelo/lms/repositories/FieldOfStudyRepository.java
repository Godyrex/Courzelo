package com.courzelo.lms.repositories;


import com.courzelo.lms.entities.schedule.FieldOfStudy;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface FieldOfStudyRepository extends MongoRepository<FieldOfStudy, String> {
}
