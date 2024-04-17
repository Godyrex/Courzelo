package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.schedule.Modul;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ModulRepository extends MongoRepository<Modul,String> {
    boolean existsByIdIgnoreCase(String id);
}
