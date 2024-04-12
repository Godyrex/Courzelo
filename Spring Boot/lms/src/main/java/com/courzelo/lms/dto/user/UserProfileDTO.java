package com.courzelo.lms.dto.user;

import com.courzelo.lms.entities.user.UserProfile;
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

    public UserProfileDTO(UserProfile profile) {
        this.name = profile.getName();
        this.lastName = profile.getLastName();
        this.photo = profile.getPhoto().getId();
        this.speciality = profile.getSpeciality();
        this.birthDate = profile.getBirthDate();
        this.title = profile.getTitle();
        this.bio = profile.getBio();
    }
}
