package com.courzelo.lms.entities.reclamation;


import com.courzelo.lms.entities.user.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
@NoArgsConstructor
public class Reclamation {

    @Id
    private String id;

    @Size(max = 255)
    private String sujet;

    @Size(max = 255)
    private String details;

    @CreatedDate
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateCreation = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private Status status = Status.EN_ATTENTE;

  //  @DBRef
//private User client;

    @DBRef
    private ReclamationType type;


   /* public Reclamation(String id, String sujet, String details, LocalDateTime dateCreation, Status status, TypeReclamation type) {
        this.id = id;
        this.sujet = sujet;
        this.details = details;
        this.dateCreation = dateCreation;
        this.status = status;
        this.type = type;
    }

    public Reclamation(String name, String details, LocalDateTime dateCreation, Status etat, TypeReclamation type) {
        this.sujet = name;
        this.details = details;
        this.dateCreation = dateCreation;
        this.status = etat;
        this.type = type;
    }


    public Reclamation(String name, String details, LocalDateTime dateCreation, Status etat, TypeReclamation type,User user) {
        this.sujet = name;
        this.details = details;
        this.dateCreation = dateCreation;
        this.status = etat;
        this.type = type;
        this.Solution=user;
    }*/

    @Override
    public String toString() {
        return "Reclamation{" +
                "id='" + id + '\'' +
                ", name='" + sujet + '\'' +
                ", details='" + details + '\'' +
                ", dateCreation=" + dateCreation +
                ", etat=" + status +
              //  ", client=" + client +
                ", type=" + type +
                '}';
    }
}

