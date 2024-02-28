package com.courzelo.lms.utils;

import com.courzelo.lms.exceptions.RefreshTokenNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Slf4j
public class CookieUtil {
    public ResponseCookie createAccessTokenCookie(String accessToken, Long duration) {
        return ResponseCookie.from("accessToken", accessToken)
                .maxAge(duration / 1000)
                .httpOnly(true)
                .path("/")
                .build();
    }

    public ResponseCookie createRefreshTokenCookie(String refreshToken, Long duration) {
        return ResponseCookie.from("refreshToken", refreshToken)
                .maxAge(duration / 1000)
                .httpOnly(true)
                .path("/")
                .build();
    }

    public String getAccessTokenFromCookies(HttpServletRequest request) {
        log.info("getAccessTokenFromCookies : Getting token...");
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("accessToken")) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    public String getRefreshTokenFromCookies(HttpServletRequest request) {
        log.info("getRefreshTokenFromCookies : Getting token...");
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("refreshToken")) {
                    log.info("getRefreshTokenFromCookies : Cookie found : " + cookie.getValue());
                    return cookie.getValue();
                } else {
                    log.error("getRefreshTokenFromCookies : cookie.getName().equals(\"refreshToken\") is null");
                    throw new RefreshTokenNotFoundException("Refresh Token not found");
                }
            }
        }
        log.error("getRefreshTokenFromCookies : request.getCookies() is null");
        throw new RefreshTokenNotFoundException("Refresh Token not found");
    }

}
