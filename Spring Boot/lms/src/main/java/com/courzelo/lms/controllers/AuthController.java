package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.LoginDTO;
import com.courzelo.lms.dto.RegisterDTO;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.security.JwtResponse;
import com.courzelo.lms.security.Response;
import com.courzelo.lms.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders ="*",allowCredentials = "true" )
@RequestMapping("/api/v1/auth")
@RestController
@RequiredArgsConstructor
@PreAuthorize("permitAll()")
public class AuthController {
    @Autowired
    private ModelMapper modelMapper;
    private final AuthService userService;
    @PostMapping("/signing")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginDTO loginDTO,HttpServletResponse response) {
        return userService.authenticateUser(loginDTO,response);
    }
    @PostMapping("/signup")
    public ResponseEntity<Response> signup(@Valid @RequestBody RegisterDTO user){
        return userService.saveUser(modelMapper.map(user, User.class));
    }
    @PostMapping("/logout")
    public void logout(HttpServletRequest request,HttpServletResponse response){
         userService.logout(request,response);
    }
    @PostMapping("/refreshToken")
    public ResponseEntity<JwtResponse> refreshToken(HttpServletRequest request,HttpServletResponse response){
    return userService.refreshToken(request,response);
    }
}
