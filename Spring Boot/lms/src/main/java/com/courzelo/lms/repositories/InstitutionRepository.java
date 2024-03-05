package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Institution;
import com.courzelo.lms.entities.Program;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstitutionRepository extends MongoRepository<Institution, String> {
}