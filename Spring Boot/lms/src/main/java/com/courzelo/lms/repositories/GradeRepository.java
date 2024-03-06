package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Grades;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradeRepository extends MongoRepository<Grades,String>
{
        List<Grades> findAllByIdExamen(String examId);
}
