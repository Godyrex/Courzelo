package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Exam;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamRepository extends MongoRepository<Exam,String>
{
}
