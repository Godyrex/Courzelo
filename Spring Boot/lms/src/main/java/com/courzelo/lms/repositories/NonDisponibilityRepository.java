package com.courzelo.lms.repositories;


import com.courzelo.lms.entities.NonDisponibility;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface NonDisponibilityRepository extends MongoRepository<NonDisponibility, String> {
}
