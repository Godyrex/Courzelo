package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.LoginDTO;
import com.courzelo.lms.dto.RegisterDTO;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.security.Response;
import com.courzelo.lms.services.IAuthService;
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
    private final IAuthService iAuthService;
    @PostMapping("/confirmDevice/{code}")
    public ResponseEntity<?> confirmDevice(@Valid @RequestBody LoginDTO loginDTO,@PathVariable Integer code,HttpServletResponse response,@RequestHeader(value = "User-Agent") String userAgent) {
        return iAuthService.confirmDevice(userAgent,response,loginDTO,code);
    }
    @PostMapping("/signing")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginDTO loginDTO,HttpServletResponse response,@RequestHeader(value = "User-Agent") String userAgent) {
        return iAuthService.loginUser(loginDTO,response,userAgent);
    }
    @PostMapping("/signup")
    public ResponseEntity<Response> signup(@Valid @RequestBody RegisterDTO user,@RequestHeader(value = "User-Agent") String userAgent){
        return iAuthService.saveUser(modelMapper.map(user, User.class),userAgent);
    }
    @PostMapping("/logout")
    public void logout(HttpServletRequest request,HttpServletResponse response){
         iAuthService.logout(request,response);
    }
    @GetMapping("/verify")
    public ResponseEntity<Response> verifyAccount(@RequestParam("code") String code) {
          return iAuthService.verifyAccount(code);
    }
}
