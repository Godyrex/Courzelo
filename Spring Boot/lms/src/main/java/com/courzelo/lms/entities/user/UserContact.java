package com.courzelo.lms.entities.user;

import lombok.Data;

@Data
public class UserContact {
    private String phoneNumber;
    private UserAddress address;
    private String website;
    private String linkedin;
    private String facebook;
    private String github;
}