package com.courzelo.lms.repositories;


import com.courzelo.lms.entities.ElementModule;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ElementModuleRepository extends MongoRepository<ElementModule, String> {
}
