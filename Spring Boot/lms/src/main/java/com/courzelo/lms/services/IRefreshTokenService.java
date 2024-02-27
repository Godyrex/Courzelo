package com.courzelo.lms.services;

import com.courzelo.lms.entities.RefreshToken;
import com.courzelo.lms.entities.User;

public interface IRefreshTokenService {
     RefreshToken createRefreshToken(String email,long exp);
     RefreshToken findByToken(String token);
     void verifyExpiration(RefreshToken token);
     void deleteTokenByToken(String token);
     void deleteToken(RefreshToken token);
     void deleteAllUserToken(User user);
     void deleteAllUserTokenByEmail(String email);


}
