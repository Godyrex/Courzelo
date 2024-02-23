package com.courzelo.lms.services;

import com.courzelo.lms.entities.RefreshToken;

public interface IRefreshTokenService {
     RefreshToken createRefreshToken(String email);



     RefreshToken findByToken(String token);

     void verifyExpiration(RefreshToken token);
}
