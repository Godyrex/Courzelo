package com.courzelo.lms.entities;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;


@Document(collection = "Semester")
@Getter
@Setter
public class Semester {

    @Id
    private  String id;
    @NotNull

    private LocalDate startDate;
    @NotNull
    private LocalDate endDate;
    @NotNull
    @Size(max = 255)
    private String universityYear;

    @NotNull
    @NotNull
    private SemesterNumber semesterNumber ;


}
