package com.courzelo.lms.services;


import com.courzelo.lms.dto.LoginDTO;
import com.courzelo.lms.dto.RefreshTokenRequestDTO;
import com.courzelo.lms.entities.RefreshToken;
import com.courzelo.lms.entities.Role;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.exceptions.RefreshTokenNotFoundException;
import com.courzelo.lms.repositories.UserRepository;
import com.courzelo.lms.security.JwtResponse;
import com.courzelo.lms.security.Response;
import com.courzelo.lms.security.jwt.JWTUtils;
import lombok.RequiredArgsConstructor;
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
public class AuthService implements IAuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final IRefreshTokenService iRefreshTokenService;
    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;
    public ResponseEntity<?> authenticateUser(LoginDTO loginDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            if(authentication.isAuthenticated()){
            String jwt = jwtUtils.generateJwtToken(authentication.getName());
            RefreshToken refreshToken = iRefreshTokenService.createRefreshToken(loginDTO.getEmail());
            User userDetails = (User) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            return ResponseEntity.ok(new JwtResponse(jwt,
                    refreshToken.getToken(),
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response("Incorrect email or password"));
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
    public void logout(){
        SecurityContextHolder.clearContext();
    }
    public ResponseEntity<JwtResponse> refreshToken(RefreshTokenRequestDTO refreshTokenRequestDTO){
        RefreshToken refreshToken = iRefreshTokenService.findByToken(refreshTokenRequestDTO.getToken());
        if (refreshToken != null) {
            iRefreshTokenService.verifyExpiration(refreshToken);
            String jwt = jwtUtils.generateJwtToken(refreshToken.getUser().getEmail());
            User userDetails = userRepository.findUserByEmail(refreshToken.getUser().getEmail());
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            return ResponseEntity.ok(new JwtResponse(jwt,
                    refreshToken.getToken(),
                    userDetails.getEmail(),
                    userDetails.getName(),
                    userDetails.getLastName(),
                    roles
            ));
        }else {
            throw new RefreshTokenNotFoundException("Refresh token not found");
        }

    }

}
