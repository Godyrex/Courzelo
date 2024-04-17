package com.courzelo.lms.entities;


import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document(collection = "Post")
public class Post {
    @Id
    private String id ;
    private String description ;
    private String userId ;

    private byte[] img ;
    private List<Commentaire> comments ;
}
