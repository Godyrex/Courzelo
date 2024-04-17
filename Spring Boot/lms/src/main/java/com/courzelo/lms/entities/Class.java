package com.courzelo.lms.entities;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document(collection = "Question")
public class Class {

    @Id
    private String id;
    private String name ;
    private Long capacity ;

    private List<Program> programs ;

}