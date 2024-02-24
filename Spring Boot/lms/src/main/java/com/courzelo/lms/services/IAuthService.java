package com.courzelo.lms.services;




import com.courzelo.lms.dto.LoginDTO;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.security.Response;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface IAuthService {
    ResponseEntity<Response> saveUser(User user);
    ResponseEntity<?> authenticateUser(LoginDTO loginDTO, HttpServletResponse response);


}
