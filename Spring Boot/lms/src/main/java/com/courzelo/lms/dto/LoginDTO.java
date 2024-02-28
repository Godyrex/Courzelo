package com.courzelo.lms.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class LoginDTO {
    private String email;
    private String password;
    private boolean rememberMe;
    public void setEmail(String email) {
        this.email = (email != null) ? email.toLowerCase() : null;
    }
}
