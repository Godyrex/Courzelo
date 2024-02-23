package com.courzelo.lms.security;

import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private String accessToken;
    private String token;
    private String type = "Bearer";
    private String email;
    private String name;
    private String lastname;
    private List<String> roles;

    public JwtResponse(String accessToken,String token, String email, String name, String lastname , List<String> roles) {
        this.accessToken = accessToken;
        this.token = token;
        this.email = email;
        this.name = name;
        this.lastname = lastname;
        this.roles = roles;
    }
}
