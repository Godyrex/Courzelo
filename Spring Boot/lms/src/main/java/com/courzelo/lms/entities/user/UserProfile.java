package com.courzelo.lms.entities.user;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;

@Data
public class UserProfile {
    private String name;
    private String lastName;
    @DBRef
    private Photo photo;
    private String speciality;
    private Date birthDate;
    private String bio;

}
