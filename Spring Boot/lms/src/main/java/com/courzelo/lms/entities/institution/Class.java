package com.courzelo.lms.entities.institution;

import com.courzelo.lms.entities.user.User;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "classes")
@Data
public class Class {

    @Id
    private String id;
    private String name;
    private Long capacity;
    @DBRef
    private Program program;
    @DBRef
    private List<User> teachers = new ArrayList<>();
    @DBRef
    private List<User> students = new ArrayList<>();

}