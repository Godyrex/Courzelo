package com.courzelo.lms.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserActivityDTO {
    private Instant CreatedAt;
    private Instant updatedAt;
    private Instant lastLogin;
    private int loginCount;
}
