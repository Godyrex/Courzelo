package com.courzelo.lms.repositories;


import com.courzelo.lms.entities.schedule.ElementModule;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;


public interface ElementModuleRepository extends MongoRepository<ElementModule, String> {

    //   ElementModule findByDayOfWeekAndPeriode(DayOfWeek dayOfWeek, Period period);

    //List<ElementModule> findByClasse(String classe);
    // Assuming ElementModuleRepository extends MongoRepository<ElementModule, String>

    // Within your ElementModuleRepository interface
     List<ElementModule> getEmploisByClasses(String classeId);


}
