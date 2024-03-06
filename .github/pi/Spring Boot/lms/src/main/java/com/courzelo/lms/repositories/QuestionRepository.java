package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Admin;
import com.courzelo.lms.entities.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends MongoRepository<Question,String> {
}
