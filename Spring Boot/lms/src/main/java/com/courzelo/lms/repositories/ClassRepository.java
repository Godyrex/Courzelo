package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.institution.Class;
import com.courzelo.lms.entities.schedule.SemesterNumber;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface ClassRepository extends MongoRepository<Class, String> {
   List<Class> findBySemester_SemesterNumber(SemesterNumber semesterNumber);

}
