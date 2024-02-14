package com.courzelo.lms.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@Document(collection = "teachers")
public class Teacher {
    @Id
    private String id;
    private String speciality;

}
