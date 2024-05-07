package com.courzelo.lms.entities;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "Question")
public class Question {

    @Id
    private String id ;

    private String description ;

    private String sugg1 ,sugg2,sugg3 ;

    private String wrSugg ;

    private float note ;

    private String idExamen ;
}
