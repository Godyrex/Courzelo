package com.courzelo.lms.entities;

import com.courzelo.lms.dto.FieldOfStudyDTO;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


@Document(collection = "Departments")
@Getter
@Setter
public class Department {

    @Id
    private String id;

    @Size(max = 255)
    private String name;
    private String chefDepartment;
    private List<FieldOfStudy>fieldOfStudy=new ArrayList<>();




}
