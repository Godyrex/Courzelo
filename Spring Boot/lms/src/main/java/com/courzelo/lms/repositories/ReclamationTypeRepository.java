package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.reclamation.ReclamationType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ReclamationTypeRepository extends MongoRepository<ReclamationType, String> {
    ReclamationType findByType(String type);}
