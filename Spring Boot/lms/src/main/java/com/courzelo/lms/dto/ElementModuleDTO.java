package com.courzelo.lms.dto;

import com.courzelo.lms.entities.Department;
import com.courzelo.lms.entities.Period;
import com.courzelo.lms.entities.Semester;
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
@Getter
@Setter
public class ElementModuleDTO {

    @Id
    private  String id;
    private Integer nmbrHours;
    @Size(max = 255)
    private String name;
    private List<DayOfWeek> dayOfWeeks;
    private List<Period> periods;
    private String module;
    private List<Semester> semesters;
    private List<Department> departments;
    private int numSemesters;
    private int numDepartments;


}
