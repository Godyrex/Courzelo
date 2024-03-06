package com.courzelo.lms.entities;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@Document(collection = "Commentaire")
public class Commentaire {

    @Id
    private  int id ;
    private String comment ;
    private String idUser;
    private String idPost ;
    private String idPere ;
    private Date date ;
}
