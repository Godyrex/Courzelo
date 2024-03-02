package com.courzelo.lms.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "programs")
@Data
public class Program {
    @Id
    String id;
    String name;
    String description;
    ProgramType programType;
    @DBRef
    Institution institution;

}
