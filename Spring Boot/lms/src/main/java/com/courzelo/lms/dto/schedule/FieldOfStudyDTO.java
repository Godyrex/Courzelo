package com.courzelo.lms.dto.schedule;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Data
public class FieldOfStudyDTO {
    private String id;
    @Size(max = 255)
    private String name;
    private Integer numbrWeeks;
    @Size(max = 255)
    private String chefField;
    private String departmentID;
}