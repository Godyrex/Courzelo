package com.courzelo.lms.dto;

import com.courzelo.lms.entities.Department;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


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

    private Department department;

}
