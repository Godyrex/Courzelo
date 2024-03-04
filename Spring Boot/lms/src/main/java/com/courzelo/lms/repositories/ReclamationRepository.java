package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Reclamation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReclamationRepository extends MongoRepository<Reclamation,String> {
}
