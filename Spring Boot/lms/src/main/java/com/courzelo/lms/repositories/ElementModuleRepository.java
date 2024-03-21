package com.courzelo.lms.repositories;


import com.courzelo.lms.entities.schedule.ElementModule;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ElementModuleRepository extends MongoRepository<ElementModule, String> {

 //   ElementModule findByDayOfWeekAndPeriode(DayOfWeek dayOfWeek, Period period);

   //List<ElementModule> findByClasse(String classe);
}
