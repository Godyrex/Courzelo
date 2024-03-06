package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Class;
import com.courzelo.lms.entities.Grades;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GradeRepository extends MongoRepository<Grades,String>
{
}
