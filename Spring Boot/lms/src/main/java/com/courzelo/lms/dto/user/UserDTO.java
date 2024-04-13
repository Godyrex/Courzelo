package com.courzelo.lms.dto.user;

import com.courzelo.lms.entities.user.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String id;
    private String email;
    private List<String> roles;
    private UserSecurityDTO security;
    private UserProfileDTO profile;
    private UserEducationDTO education;
    private UserContactDTO contact;
    private UserActivityDTO activity;

    public UserDTO(
            String id,
            String email,
            List<String> list,
            UserSecurity security,
            UserProfile profile,
            UserEducationalDetails education,
            UserContact contact,
            UserActivity activity)
    {
        this.id = id;
        this.email = email;
        this.roles = list;
        this.security = new UserSecurityDTO(security);
        this.profile = new UserProfileDTO(profile);
        this.education = new UserEducationDTO(education);
        this.contact = new UserContactDTO(contact);
        this.activity = new UserActivityDTO(activity);

    }
}
