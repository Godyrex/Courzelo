package com.courzelo.lms.services;


import com.courzelo.lms.dto.LoginDTO;
import com.courzelo.lms.entities.Role;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.security.Response;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.security.Principal;
import java.util.List;

public interface IAuthService {
    ResponseEntity<Response> saveUser(User user, String userAgent);

    ResponseEntity<?> confirmDevice(String userAgent, HttpServletResponse response, LoginDTO loginDTO, Integer code);

    ResponseEntity<?> loginUser(LoginDTO loginDTO, HttpServletResponse response, String userAgent);

    void logout(HttpServletResponse response);

    ResponseEntity<Response> verifyAccount(String code);

    ResponseEntity<Boolean> isAuthenticated(HttpServletRequest request);

    ResponseEntity<List<Role>> getRole(Principal principal);

}
