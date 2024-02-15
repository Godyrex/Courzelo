package com.courzelo.lms.entities;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.OffsetDateTime;

@Document
@Getter
@Setter
public class Reclamation {

    @Id
    private Long id;

    @Size(max = 255)
    private String contenu;

    @CreatedDate
    private OffsetDateTime dateCreated;

    @Enumerated(EnumType.STRING)
    private TypeReclamation TypeReclamation;
}
