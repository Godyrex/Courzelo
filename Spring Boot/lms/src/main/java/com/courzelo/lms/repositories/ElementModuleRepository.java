package com.courzelo.lms.repositories;


import com.courzelo.lms.entities.ElementModule;
import com.courzelo.lms.entities.Period;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.DayOfWeek;


public interface ElementModuleRepository extends MongoRepository<ElementModule, String> {
    @Query("{ 'jour' : ?0, 'period' : ?1 }")
    ElementModule findByDayOfWeekAndPeriode(DayOfWeek dayOfWeek, Period period);
}
