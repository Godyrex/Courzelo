package com.courzelo.lms.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
public class SemesterDTO {

    private String  id;

    private LocalDate startDate;

    private LocalDate endDate;

    @Size(max = 255)
    private String universityYear;

}
