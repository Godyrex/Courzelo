package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.institution.Program;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgamRepository extends MongoRepository<Program,String> {
}
