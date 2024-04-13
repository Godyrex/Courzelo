package com.courzelo.lms.entities.user;

import lombok.Data;

import java.time.Instant;

@Data
public class UserActivity {
    private Instant CreatedAt;
    private Instant updatedAt;
    private Instant lastLogin;
    private Instant lastLogout;
    private int loginCount;

}
