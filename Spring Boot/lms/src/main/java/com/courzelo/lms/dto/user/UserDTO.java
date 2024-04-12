package com.courzelo.lms.dto.user;

import com.courzelo.lms.entities.user.Role;
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
}
