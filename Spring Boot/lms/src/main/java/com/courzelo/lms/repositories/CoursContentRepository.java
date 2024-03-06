package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.CourseContent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoursContentRepository extends MongoRepository<CourseContent,String>
{
    List<CourseContent> findAllByCoursId(String id);

}
