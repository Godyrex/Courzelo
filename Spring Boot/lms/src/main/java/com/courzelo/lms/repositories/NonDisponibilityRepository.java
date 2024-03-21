package com.courzelo.lms.repositories;


import com.courzelo.lms.entities.schedule.NonDisponibility;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface NonDisponibilityRepository extends MongoRepository<NonDisponibility,String> {
}
