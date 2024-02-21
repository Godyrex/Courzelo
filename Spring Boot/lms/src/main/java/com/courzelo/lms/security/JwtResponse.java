package com.courzelo.lms.security;

import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String id;
    private String email;
    private String name;
    private String lastname;
    private List<String> roles;

    public JwtResponse(String token, String id, String email, String name, String lastname , List<String> roles) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.name = name;
        this.lastname = lastname;
        this.roles = roles;
    }
}
