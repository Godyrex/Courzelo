package com.courzelo.lms.services.user;

import com.courzelo.lms.entities.user.RefreshToken;
import com.courzelo.lms.entities.user.User;

public interface IRefreshTokenService {
    RefreshToken createRefreshToken(String email, long exp);

    RefreshToken findByToken(String token);

    void verifyExpiration(RefreshToken token);

    void deleteTokenByToken(String token);

    void deleteToken(RefreshToken token);

    void deleteAllUserToken(User user);

    void deleteAllUserTokenByEmail(String email);


}
