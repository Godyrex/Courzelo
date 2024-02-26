package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Department;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface DepartmentRepository extends MongoRepository<Department, String> {
}
