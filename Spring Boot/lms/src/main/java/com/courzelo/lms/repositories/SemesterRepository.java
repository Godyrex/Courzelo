package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Semester;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface SemesterRepository extends MongoRepository<Semester,String> {
}