package com.courzelo.lms.entities.user;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Document(collection = "passwordResetTokens")
@Data
public class PasswordResetToken {
    private static final int EXPIRATION = 1;

    @Id
    private String id;

    private String token;

    @DBRef
    private User user;

    private Instant expiryDate;

    public PasswordResetToken(String token, User user) {
        this.token = token;
        this.user = user;
        this.expiryDate = calculateExpiryDate();
    }

    private Instant calculateExpiryDate() {
        return Instant.now().plus(PasswordResetToken.EXPIRATION, ChronoUnit.MINUTES);
    }
}
