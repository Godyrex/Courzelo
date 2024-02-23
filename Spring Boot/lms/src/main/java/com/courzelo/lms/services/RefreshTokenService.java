package com.courzelo.lms.services;

import com.courzelo.lms.entities.RefreshToken;
import com.courzelo.lms.exceptions.RefreshTokenExpiredException;
import com.courzelo.lms.repositories.RefreshTokenRepository;
import com.courzelo.lms.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class RefreshTokenService implements IRefreshTokenService{
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    @Value("${Security.app.refreshExpirationMs}")
    private int refreshExpirationMs;

    @Override
    public RefreshToken createRefreshToken(String email) {
        RefreshToken refreshToken = RefreshToken.builder()
                .user(userRepository.findUserByEmail(email))
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(refreshExpirationMs)) // set expiry of refresh token to 10 minutes - you can configure it application.properties file
                .build();
        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public RefreshToken findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    @Override
    public void verifyExpiration(RefreshToken token) {
        if(token.getExpiryDate().compareTo(Instant.now())<0){
            refreshTokenRepository.delete(token);
            throw new RefreshTokenExpiredException(token.getToken() + " Refresh token is expired. Please make a new login..!");
        }
    }
}
