package com.courzelo.lms.entities;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Objects;

@Getter
@Document(collation = "TimeTables")
@Setter

public class TimeTable {
    @Id
    private String id;
 @DBRef
 private List<Semester>semesters;
 @DBRef
 private List<Department>departments;
 @DBRef
 private List<ElementModule>elementModules;


}
