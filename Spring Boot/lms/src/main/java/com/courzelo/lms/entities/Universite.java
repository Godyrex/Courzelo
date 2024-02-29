package com.courzelo.lms.entities;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "universities")

public class Universite {
    @Id
    private String id;
    private String name;
    private String location;

}
