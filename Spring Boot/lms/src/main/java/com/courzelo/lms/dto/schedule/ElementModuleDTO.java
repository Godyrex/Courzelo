package com.courzelo.lms.dto.schedule;

import com.courzelo.lms.entities.institution.Class;
import com.courzelo.lms.entities.schedule.*;
import com.courzelo.lms.entities.user.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.time.DayOfWeek;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Data
public class ElementModuleDTO {

    @Id
    private String id;
    private Integer nmbrHours;
    @Size(max = 255)
    private String name;
    private DayOfWeek dayOfWeek;
    private Period period;
    private List<Semester> semesters;
    private List<Department> departments;
    private int numSemesters;
    private int numDepartments;
    private List<Class> classes;
    private User teacher;
    private Modul modul;


}
