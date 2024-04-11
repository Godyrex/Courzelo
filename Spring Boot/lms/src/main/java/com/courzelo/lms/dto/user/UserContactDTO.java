package com.courzelo.lms.dto.user;

import com.courzelo.lms.entities.user.UserAddress;
import lombok.Data;

@Data
public class UserContactDTO {
    private UserAddress userAddress;
    private String phoneNumber;
    private String website;
    private String linkedin;
    private String facebook;
    private String github;

    public UserContactDTO(UserAddress userAddress, String phoneNumber, String website, String linkedin, String facebook, String github) {
        this.userAddress = userAddress;
        this.phoneNumber = phoneNumber;
        this.website = website;
        this.linkedin = linkedin;
        this.facebook = facebook;
        this.github = github;
    }
}
