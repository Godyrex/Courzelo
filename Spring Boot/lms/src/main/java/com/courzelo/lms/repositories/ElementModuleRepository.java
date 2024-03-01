package com.courzelo.lms.repositories;


import com.courzelo.lms.entities.ElementModule;
import com.courzelo.lms.entities.Period;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.DayOfWeek;
import java.util.List;


public interface ElementModuleRepository extends MongoRepository<ElementModule, String> {

 //   ElementModule findByDayOfWeekAndPeriode(DayOfWeek dayOfWeek, Period period);

   List<ElementModule> findByClasse(String classe);
}
