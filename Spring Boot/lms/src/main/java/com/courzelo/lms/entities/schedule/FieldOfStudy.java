package com.courzelo.lms.entities.schedule;

import com.courzelo.lms.entities.institution.Class;
import com.courzelo.lms.entities.schedule.Department;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document(collection = "FieldOfStudy")
@Data
public class FieldOfStudy {

    @Id
    private String id;
    @NotNull
    @Size(max = 255)
    private String name;
    @NotNull
    private Integer numbrWeeks;
    @NotNull
    @Size(max = 255)
    private String chefField;
    @DBRef
    private Department department;
    @DBRef
    private List<Class> classes;


}
