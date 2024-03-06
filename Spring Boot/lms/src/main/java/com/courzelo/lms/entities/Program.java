package com.courzelo.lms.entities;

import com.courzelo.lms.entities.enumeration.TypeProgramme;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document(collection = "program")
public class Program {

    @Id
    private String id;
    private String name ;
    private String description  ;
    private TypeProgramme type ;


    private List<Class> classes ;

}
