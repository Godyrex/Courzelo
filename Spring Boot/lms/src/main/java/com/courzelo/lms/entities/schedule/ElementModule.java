package com.courzelo.lms.entities.schedule;

import com.courzelo.lms.entities.institution.Class;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.DayOfWeek;
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
    private DayOfWeek dayOfWeek;
    @NotNull
    private Period period;
   @NotNull
   private List<Class> classes;
    @NotNull
    @DBRef
    private List<Semester> semesters ;
    @DBRef
    @NotNull
    private List<Department> departments;
    @NotNull
    private  String ModuleName;

    @NotNull
    private int numSemesters;

    @NotNull
    private int numDepartments;
    @NotNull
    private Teacher teacher;
    @DBRef
    private Modul modul;


}
