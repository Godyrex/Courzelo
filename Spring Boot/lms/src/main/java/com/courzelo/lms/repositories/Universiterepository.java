package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Universite;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface Universiterepository extends MongoRepository<Universite, String> {
}
