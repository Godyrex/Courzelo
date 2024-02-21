package com.courzelo.lms.entities;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.OffsetDateTime;


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

    @CreatedDate
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    private OffsetDateTime lastUpdated;

    @Version
    private Integer version;
    private Departement departement;

}
