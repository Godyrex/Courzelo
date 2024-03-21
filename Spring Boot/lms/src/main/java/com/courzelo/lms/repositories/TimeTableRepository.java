package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.schedule.TimeTable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TimeTableRepository extends MongoRepository<TimeTable, String> {

}
