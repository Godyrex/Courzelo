package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.schedule.Semester;
import com.courzelo.lms.entities.schedule.SemesterNumber;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface SemesterRepository extends MongoRepository<Semester, String> {
    List<Semester> findSemesterBySemesterNumber(SemesterNumber semesterNumber);
}
