package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.LoginDTO;
import com.courzelo.lms.dto.RefreshTokenRequestDTO;
import com.courzelo.lms.dto.RegisterDTO;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.security.JwtResponse;
import com.courzelo.lms.security.Response;
import com.courzelo.lms.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders ="*" )
@RequestMapping("/api/v1/auth")
@RestController
@RequiredArgsConstructor
@PreAuthorize("permitAll()")
public class AuthController {
    @Autowired
    private ModelMapper modelMapper;
    private final AuthService userService;
    @PostMapping("/signing")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginDTO loginDTO) {
        return userService.authenticateUser(loginDTO);
    }
    @PostMapping("/signup")
    public ResponseEntity<Response> signup(@Valid @RequestBody RegisterDTO user){
        return userService.saveUser(modelMapper.map(user, User.class));
    }
    @PostMapping("/logout")
    public void logout(){
         userService.logout();
    }
    @PostMapping("/refreshToken")
    public ResponseEntity<JwtResponse> refreshToken(@RequestBody RefreshTokenRequestDTO refreshTokenRequestDTO){
    return userService.refreshToken(refreshTokenRequestDTO);
    }
}
