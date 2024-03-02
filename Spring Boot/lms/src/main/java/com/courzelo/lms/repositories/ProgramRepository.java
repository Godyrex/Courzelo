package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Program;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramRepository extends MongoRepository<Program, String> {
}
