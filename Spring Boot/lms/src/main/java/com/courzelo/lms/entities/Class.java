package com.courzelo.lms.entities;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "classes")
@Data
public class Class {

    @Id
    private String id;
    private String name;
    private Long capacity;
    @DBRef
    private List<Program> programs;
    @DBRef
    private List<User> users;

}
