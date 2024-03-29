package com.courzelo.lms.dto.schedule;

import com.courzelo.lms.entities.schedule.Department;
import com.courzelo.lms.entities.schedule.ElementModule;
import com.courzelo.lms.entities.schedule.Period;
import com.courzelo.lms.entities.schedule.Semester;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Data
@Getter
@Setter
public class TimeTableDTO {
    private String id;
    private String name;

    private List<Semester> semesters;
    private String classe;
    private List<Department> departments;

    private List<ElementModule> elementModules;
    private Map<DayOfWeek, Map<Period, List<ElementModule>>> schedule;


}