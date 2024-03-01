package com.courzelo.lms.dto;

import com.courzelo.lms.entities.Department;
import com.courzelo.lms.entities.FieldOfStudy;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;


import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Data
@Getter
@Setter
public class DepartmentDTO {


    private String name;
    private String chefDepartment;





}
