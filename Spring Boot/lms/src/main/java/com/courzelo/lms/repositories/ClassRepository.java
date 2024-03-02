package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Class;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository extends MongoRepository<Class,String> {
}
