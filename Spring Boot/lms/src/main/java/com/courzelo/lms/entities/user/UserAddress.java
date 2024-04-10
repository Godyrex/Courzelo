package com.courzelo.lms.entities.user;

import lombok.Data;

@Data
public class UserAddress {
    private String address;
    private String city;
    private String state;
    private String country;
    private String zipCode;
}
