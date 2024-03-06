package com.courzelo.lms.dto;

import com.courzelo.lms.entities.FieldOfStudy;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


import java.util.List;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Data
@Getter
@Setter
public class DepartmentDTO {

    private String id;
    private String name;
    private String chefDepartment;
    private List<FieldOfStudy>fieldOfStudies;





}
