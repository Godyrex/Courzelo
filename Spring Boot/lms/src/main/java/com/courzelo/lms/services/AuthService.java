package com.courzelo.lms.services;


import com.courzelo.lms.dto.LoginDTO;
import com.courzelo.lms.entities.RefreshToken;
import com.courzelo.lms.entities.Role;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.repositories.UserRepository;
import com.courzelo.lms.security.JwtResponse;
import com.courzelo.lms.security.Response;
import com.courzelo.lms.security.jwt.JWTUtils;
import com.courzelo.lms.utils.CookieUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class AuthService implements IAuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final IRefreshTokenService iRefreshTokenService;
    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;
    private final CookieUtil cookieUtil;
    @Value("${Security.app.jwtExpirationMs}")
    private long jwtExpirationMs;
    @Value("${Security.app.refreshExpirationMs}")
    private long refreshExpirationMs;
    @Value("${Security.app.refreshRememberMeExpirationMs}")
    private long refreshRememberMeExpirationMs;
    public ResponseEntity<?> authenticateUser(LoginDTO loginDTO,@NonNull HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            if(authentication.isAuthenticated()){
                String accessToken = jwtUtils.generateJwtToken(authentication.getName());
                response.addHeader(HttpHeaders.SET_COOKIE, cookieUtil.createAccessTokenCookie(accessToken,jwtExpirationMs).toString());
                RefreshToken refreshToken = iRefreshTokenService.createRefreshToken(loginDTO.getEmail());
                response.addHeader(HttpHeaders.SET_COOKIE, cookieUtil.createRefreshTokenCookie(refreshToken.getToken(),refreshExpirationMs).toString());
                User userDetails = (User) authentication.getPrincipal();
                List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            return ResponseEntity.ok(new JwtResponse(
                    userDetails.getEmail(),
                    userDetails.getName(),
                    userDetails.getLastName(),
                    roles
            ));
            }else{
                return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(new Response("An error has occurred please try again later"));
            }
        } catch (DisabledException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response("Please verify your email"));
        } catch (LockedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response("Your account has been banned"));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response("Incorrect email or password"));
        }
    }
    public ResponseEntity<Response> saveUser(User user) {
        if (Boolean.TRUE.equals(userRepository.existsByEmail(user.getEmail()))) {
            return ResponseEntity
                    .badRequest()
                    .body(new Response("Email is already in use!"));
        }
        user.setPassword(encoder.encode(user.getPassword()));
        user.getRoles().add(Role.STUDENT);
        user.setEnabled(false);
        user.setBan(false);
        userRepository.save(user);
        return ResponseEntity
                .ok()
                .body(new Response("Account Created!"));
    }
    public void logout(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response){
        log.info("Logout :Logging out...");
        if(request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("accessToken")) {
                    response.addHeader(HttpHeaders.SET_COOKIE, cookieUtil.createAccessTokenCookie(cookie.getValue(), 0L).toString());
                    log.info("Logout :Access Token removed");
                }
            }
        }
        if(request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("refreshToken")) {
                    response.addHeader(HttpHeaders.SET_COOKIE, cookieUtil.createRefreshTokenCookie(cookie.getValue(), 0L).toString());
                    log.info("Logout :Refresh Token removed");
                }
            }
        }
        SecurityContextHolder.clearContext();
        log.info("Logout :Security context cleared!");
        log.info("Logout :Logout Finished!");
    }
    public ResponseEntity<JwtResponse> refreshToken(@NonNull HttpServletRequest request,@NonNull HttpServletResponse response){
        log.info("refreshToken :Refreshing Token...");
        RefreshToken refreshToken = iRefreshTokenService.findByToken(cookieUtil.getRefreshTokenFromCookies(request));
        log.info("refreshToken :Refresh token = " + refreshToken.getToken() + "\nUser = "+refreshToken.getUser().getEmail());
        iRefreshTokenService.verifyExpiration(refreshToken);
        response.addHeader(HttpHeaders.SET_COOKIE, cookieUtil.createAccessTokenCookie(jwtUtils.generateJwtToken(refreshToken.getUser().getEmail()),jwtExpirationMs).toString());
        log.info("refreshToken :Access token created!");
        User userDetails = userRepository.findUserByEmail(refreshToken.getUser().getEmail());
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        log.info("refreshToken :Refreshing token DONE!");
        return ResponseEntity.ok(new JwtResponse(
                userDetails.getEmail(),
                userDetails.getName(),
                userDetails.getLastName(),
                roles
        ));
    }

}
