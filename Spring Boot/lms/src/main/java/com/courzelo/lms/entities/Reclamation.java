package com.courzelo.lms.entities;

<<<<<<< Updated upstream
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Size;
=======
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Size;
import lombok.Data;
>>>>>>> Stashed changes
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
<<<<<<< Updated upstream
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
=======
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
public class Reclamation {

    @Id
    private String id;

    @Size(max = 255)
    private String name;

    @Size(max = 255)
    private String details;

    @CreatedDate
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateCreation = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private Etat etat = Etat.EN_ATTENTE;

    @DBRef
    private TypeReclamation type;
    @DBRef
    private User client;


>>>>>>> Stashed changes
}
