package com.courzelo.lms.dto.user;

import com.courzelo.lms.entities.user.UserActivity;
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

    public UserActivityDTO(UserActivity activity) {
        this.CreatedAt = activity.getCreatedAt();
        this.updatedAt = activity.getUpdatedAt();
        this.lastLogin = activity.getLastLogin();
        this.loginCount = activity.getLoginCount();
    }
}
