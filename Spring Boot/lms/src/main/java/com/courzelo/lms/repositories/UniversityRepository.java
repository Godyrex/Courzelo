package com.courzelo.lms.repositories;


import com.courzelo.lms.entities.Universite;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversityRepository extends MongoRepository<Universite,String> {
}
