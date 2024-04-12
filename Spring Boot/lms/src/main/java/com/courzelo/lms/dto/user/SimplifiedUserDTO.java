package com.courzelo.lms.dto.user;

import com.courzelo.lms.entities.user.Role;
import lombok.Data;

import java.util.List;

@Data
public class SimplifiedUserDTO {
    private String id;
    private String email;
    private List<Role> roles;
    private UserProfileDTO profile;
    private UserEducationDTO education;
    private UserContactDTO contact;
}
