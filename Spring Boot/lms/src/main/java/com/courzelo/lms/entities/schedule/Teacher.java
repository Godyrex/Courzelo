package com.courzelo.lms.entities.schedule;

import com.courzelo.lms.entities.user.User;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Teacher")
@Getter
@Setter
public class Teacher extends User {
    private List<ElementModule>elementModules;
    private List<NonDisponibility>nonDisponibilities;

}
