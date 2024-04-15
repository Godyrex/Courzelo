package com.courzelo.lms.entities.user;

import lombok.Data;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;

@Data
public class UserProfile {
    @TextIndexed(weight = 1)
    private String name;
    @TextIndexed(weight = 1)
    private String lastName;
    @DBRef
    private Photo photo;
    private String speciality;
    private Date birthDate;
    @TextIndexed(weight = 4)
    private String title;
    @TextIndexed(weight = 4)
    private String bio;

}
