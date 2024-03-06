package com.courzelo.lms.entities;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;


@Document(collection = "elementModule")
@Getter
@Setter
public class ElementModule {
    @Id
    private  String id;
    @NotNull
    private Integer nmbrHours;
    @NotNull
    @Size(max = 255)
    private String name;
    @NotNull
    private List<DayOfWeek> dayOfWeeks;
    @NotNull
    private List<Period> periods;
    @NotNull
   // private List<Class>classes;
    @NotNull
    private String module;
    @NotNull
   // @DBRef
    private List<Semester> semesters ;
    //@DBRef
    @NotNull
    private List<Department> departments;

    @NotNull
    private int numSemesters;

    @NotNull
    private int numDepartments;



}