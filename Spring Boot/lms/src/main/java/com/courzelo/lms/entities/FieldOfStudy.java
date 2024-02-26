package com.courzelo.lms.entities;

import com.courzelo.lms.dto.DepartmentDTO;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection =  "FieldOfStudy")
@Getter
@Setter
public class FieldOfStudy {

    @Id
    private  String id;

    @Size(max = 255)
    private String name;

    private Integer numbrWeeks;

    @Size(max = 255)
    private String chefField;
    private Department department;




}
