package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Departement;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface DepartementRepository extends MongoRepository<Departement, String> {
}
