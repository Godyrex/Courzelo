package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Class;
import com.courzelo.lms.entities.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoursRepository extends MongoRepository<Course,String>
{
}
