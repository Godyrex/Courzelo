package com.courzelo.lms.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String email;
    private String password;
    private boolean rememberMe;
}
