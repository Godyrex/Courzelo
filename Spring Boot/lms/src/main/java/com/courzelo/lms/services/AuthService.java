package com.courzelo.lms.services;


import com.courzelo.lms.dto.DeviceDTO;
import com.courzelo.lms.dto.LoginDTO;
import com.courzelo.lms.entities.RefreshToken;
import com.courzelo.lms.entities.Role;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.repositories.UserRepository;
import com.courzelo.lms.security.JwtResponse;
import com.courzelo.lms.security.Response;
import com.courzelo.lms.security.jwt.JWTUtils;
import com.courzelo.lms.utils.CookieUtil;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.utility.RandomString;
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

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Objects;

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
    private final EmailService emailService;
    private final IDeviceMetadataService iDeviceMetadataService;
    @Value("${Security.app.jwtExpirationMs}")
    private long jwtExpirationMs;
    @Value("${Security.app.refreshExpirationMs}")
    private long refreshExpirationMs;
    @Value("${Security.app.refreshRememberMeExpirationMs}")
    private long refreshRememberMeExpirationMs;

    public ResponseEntity<?> loginUser(LoginDTO loginDTO, @NonNull HttpServletResponse response, String userAgent) {
        log.info("Starting Logging in...");
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
            User checkUser = userRepository.findUserByEmail(loginDTO.getEmail());
            if (!iDeviceMetadataService.isNewDevice(userAgent, checkUser)) {
                log.info("Finished Logging in...");
                return authenticateUser(authentication, response, loginDTO);
            } else {
                try {
                    emailService.sendVerificationCode(checkUser, emailService.generateVerificationCode(checkUser));
                } catch (MessagingException | UnsupportedEncodingException e) {
                    throw new RuntimeException(e);
                }
                log.info("Finished Logging in...");
                return ResponseEntity.status(HttpStatus.OK).body(new DeviceDTO(true));
            }
        } catch (DisabledException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response("Please verify your email"));
        } catch (LockedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response("Your account has been banned"));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response("Incorrect email or password"));
        }
    }

    private ResponseEntity<?> authenticateUser(Authentication authentication, @NonNull HttpServletResponse response, LoginDTO loginDTO) {
        log.info("Starting Authentication...");
        log.info("Email :" + loginDTO.getEmail());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtUtils.generateJwtToken(authentication.getName());
        response.addHeader(HttpHeaders.SET_COOKIE, cookieUtil.createAccessTokenCookie(accessToken, jwtExpirationMs).toString());
        User userDetails = (User) authentication.getPrincipal();
        if (loginDTO.isRememberMe()) {
            RefreshToken refreshToken = iRefreshTokenService.createRefreshToken(loginDTO.getEmail(), refreshRememberMeExpirationMs);
            response.addHeader(HttpHeaders.SET_COOKIE, cookieUtil.createRefreshTokenCookie(refreshToken.getToken(), refreshRememberMeExpirationMs).toString());
            userDetails.setRememberMe(true);
            log.info("RememberMe : On");
        } else {
            RefreshToken refreshToken = iRefreshTokenService.createRefreshToken(loginDTO.getEmail(), refreshExpirationMs);
            response.addHeader(HttpHeaders.SET_COOKIE, cookieUtil.createRefreshTokenCookie(refreshToken.getToken(), refreshExpirationMs).toString());
            userDetails.setRememberMe(false);
            log.info("RememberMe : Off");
        }
        userRepository.save(userDetails);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        log.info("Authentication finished!");
        if(userDetails.getPhoto()!=null){
        return ResponseEntity.ok(new JwtResponse(
                userDetails.getEmail(),
                userDetails.getName(),
                userDetails.getLastName(),
                roles,
                userDetails.getPhoto().getId()
        ));
        }else{
            return ResponseEntity.ok(new JwtResponse(
                    userDetails.getEmail(),
                    userDetails.getName(),
                    userDetails.getLastName(),
                    roles
            ));
        }
    }

    public ResponseEntity<?> confirmDevice(String userAgent, @NonNull HttpServletResponse response, LoginDTO loginDTO, Integer code) {
        log.info("Started Confirming Device...");
        User user = userRepository.findUserByEmail(loginDTO.getEmail());
        if (Objects.equals(code, user.getVerificationCode())) {
            try {
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
                ResponseEntity<?> response1 = authenticateUser(authentication, response, loginDTO);
                User checkUser = userRepository.findUserByEmail(loginDTO.getEmail());
                iDeviceMetadataService.saveDeviceDetails(userAgent, checkUser);
                log.info("Finished Confirming Device...");
                return response1;
            } catch (DisabledException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response("Please verify your email"));
            } catch (LockedException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response("Your account has been banned"));
            } catch (AuthenticationException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response("Incorrect email or password"));
            }
        }
        log.info("Started Confirming Device...");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response("Wrong Verification Code"));
    }


    public ResponseEntity<Response> verifyAccount(String code) {
        log.info("Started Verifying...");
        log.info(code);
        User user = userRepository.findUserByEmailVerificationCode(code);
        if (user != null) {
            log.info(user.getEmail());
            user.setEnabled(true);
            user.setVerificationCode(null);
            userRepository.save(user);
            log.info("Finished Verifying...");
            return ResponseEntity.status(HttpStatus.OK).body(new Response("Account Verified"));
        }
        log.info("Finished Verifying...");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response("Verification Failed"));
    }

    @Override
    public ResponseEntity<Boolean> isAuthenticated(@NonNull HttpServletRequest request) {
        String accessToken = cookieUtil.getAccessTokenFromCookies(request);
        if (accessToken != null && jwtUtils.validateJwtToken(accessToken)) {
            return ResponseEntity.ok().body(true);
        }
        return ResponseEntity.ok().body(false);
    }

    @Override
    public ResponseEntity<List<Role>> getRole(@NonNull HttpServletRequest request) {
        User user = userRepository.findUserByEmail(jwtUtils.getEmailFromJwtToken(cookieUtil.getAccessTokenFromCookies(request)));
        if (user != null) {
            return ResponseEntity.ok().body(user.getRoles());
        }
        return null;
    }

    public ResponseEntity<Response> saveUser(User user, String userAgent) {
        log.info("Started Signing up...");
        if (Boolean.TRUE.equals(userRepository.existsByEmail(user.getEmail()))) {
            return ResponseEntity
                    .badRequest()
                    .body(new Response("Email is already in use!"));
        }
        user.setPassword(encoder.encode(user.getPassword()));
        user.getRoles().add(Role.STUDENT);
        user.setEnabled(false);
        user.setBan(false);
        String randomCode = RandomString.make(64);
        user.setEmailVerificationCode(randomCode);
        userRepository.save(user);
        iDeviceMetadataService.saveDeviceDetails(userAgent, user);
        try {
            emailService.sendVerificationEmail(user);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        log.info("Finished Signing up...");
        return ResponseEntity
                .ok()
                .body(new Response("Account Created!"));
    }

    public void logout(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response) {
        log.info("Logout :Logging out...");
        String accessToken = cookieUtil.getAccessTokenFromCookies(request);
        String refreshToken = cookieUtil.getRefreshTokenFromCookies(request);
        if (accessToken != null) {
            String email = jwtUtils.getEmailFromJwtToken(accessToken);
            if (email != null) {
                iRefreshTokenService.deleteAllUserTokenByEmail(email);
                response.addHeader(HttpHeaders.SET_COOKIE, cookieUtil.createAccessTokenCookie(accessToken, 0L).toString());
                log.info("Logout: Access Token removed");
            } else {
                log.error("Failed to extract email from JWT token");
            }
        }
        if (refreshToken != null) {
            response.addHeader(HttpHeaders.SET_COOKIE, cookieUtil.createRefreshTokenCookie(refreshToken, 0L).toString());
            log.info("Logout :Refresh Token removed");
        }

        SecurityContextHolder.clearContext();
        log.info("Logout :Security context cleared!");
        log.info("Logout :Logout Finished!");
    }

    public void refreshToken(@NonNull HttpServletResponse response, String email) {
        log.info("refreshToken :Refreshing Token...");
        response.addHeader(HttpHeaders.SET_COOKIE, cookieUtil.createAccessTokenCookie(jwtUtils.generateJwtToken(email), jwtExpirationMs).toString());
        log.info("refreshToken :Access token created!");
        log.info("refreshToken :Refreshing token DONE!");
    }

}
