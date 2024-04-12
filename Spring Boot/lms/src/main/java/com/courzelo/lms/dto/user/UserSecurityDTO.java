package com.courzelo.lms.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserSecurityDTO {
    private boolean twoFactorAuthEnabled;
    private boolean enabled;
    private Boolean ban;
    private boolean rememberMe;

}
