package com.courzelo.lms.dto;

import com.courzelo.lms.entities.SemesterNumber;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Data

@Getter
@Setter
public class SemesterDTO {

    private String id;

    private LocalDate startDate;

    private LocalDate endDate;

    @Size(max = 255)
    private String universityYear;
    private SemesterNumber semesterNumber;
}
