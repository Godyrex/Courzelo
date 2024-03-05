package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Institution;
import com.courzelo.lms.entities.Program;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends MongoRepository<Program, String> {
    Page<Program> findAllByInstitution(Institution institution, Pageable pageable);

    List<Program> findByInstitution(Institution institution);


}
