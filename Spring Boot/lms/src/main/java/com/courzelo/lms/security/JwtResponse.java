package com.courzelo.lms.security;

import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private String email;
    private String name;
    private String lastname;
    private List<String> roles;

    public JwtResponse( String email, String name, String lastname , List<String> roles) {
        this.email = email;
        this.name = name;
        this.lastname = lastname;
        this.roles = roles;
    }
}
