package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Assignment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AsseignmentRepository extends MongoRepository<Assignment,String> {
    List<Assignment> findAssignmentByIdAndCoursId(String idCorus);
}
