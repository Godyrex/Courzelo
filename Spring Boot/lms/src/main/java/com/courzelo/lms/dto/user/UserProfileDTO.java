package com.courzelo.lms.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO {
    private String name;
    private String lastName;
    private String photo;
    private String speciality;
    private Date birthDate;
    private String title;
    private String bio;
}
