package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Department;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface DepartmentRepository extends MongoRepository<Department, String> {
     List <Department> findByName(String name);
}
