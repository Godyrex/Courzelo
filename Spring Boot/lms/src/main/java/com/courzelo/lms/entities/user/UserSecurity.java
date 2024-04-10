package com.courzelo.lms.entities.user;

import lombok.Data;

@Data
public class UserSecurity {
    private String twoFactorAuthKey;
    private boolean twoFactorAuthEnabled;
    private boolean enabled;
    private Boolean ban;
    private boolean rememberMe;
}
