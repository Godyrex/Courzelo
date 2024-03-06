package com.courzelo.lms.entities;


import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "courseContent")
public class Post {
    @Id
   private String id ;
    private String description ;
    private String userId ;
}
