package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.TypeReclamation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TypeReclamationRepository extends MongoRepository<TypeReclamation,String> {
}
