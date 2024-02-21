package com.courzelo.lms.dto;

import com.courzelo.lms.entities.FieldOfStudy;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Getter
@Setter
public class DepartementDTO {

    private String  id;
    private String chefDepartement;
    @Size(max = 255)
    private String name;
  private List<FieldOfStudy>fieldOfStudies ;
}
