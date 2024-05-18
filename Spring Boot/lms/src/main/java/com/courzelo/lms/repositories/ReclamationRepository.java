package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.reclamation.Reclamation;
import com.courzelo.lms.entities.reclamation.TypeReclamation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReclamationRepository extends MongoRepository<Reclamation,String> {
        List<Reclamation> findByType(TypeReclamation type);
        List<Reclamation> findBySujetAndDetails(String sujet, String details);
}

