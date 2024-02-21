package com.courzelo.lms.dto;

import com.courzelo.lms.entities.Departement;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class FieldOfStudyDTO {

    private String  id;

    @Size(max = 255)
    private String name;

    private Integer numbrWeeks;

    @Size(max = 255)
    private String chefField;
 private Departement departement;
}
