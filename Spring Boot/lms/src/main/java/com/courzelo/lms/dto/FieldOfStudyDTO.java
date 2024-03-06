package com.courzelo.lms.dto;

import com.courzelo.lms.entities.Department;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;


@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Data
@Getter
@Setter
public class FieldOfStudyDTO {


    @Size(max = 255)
    private String name;

    private Integer numbrWeeks;

    @Size(max = 255)
    private String chefField;
    private List<Department> departments;

}
