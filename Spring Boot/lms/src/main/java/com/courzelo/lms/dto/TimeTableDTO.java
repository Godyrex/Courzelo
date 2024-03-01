package com.courzelo.lms.dto;

import com.courzelo.lms.entities.Department;
import com.courzelo.lms.entities.ElementModule;
import com.courzelo.lms.entities.Period;
import com.courzelo.lms.entities.Semester;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Data
@Getter
@Setter
public class TimeTableDTO {
    private String id;

    private List<Semester>semesters;

    private List<Department>departments;

    private List<ElementModule>elementModules;





}
