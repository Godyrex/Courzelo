package com.courzelo.lms.services.user;


import com.courzelo.lms.dto.user.LoginDTO;
import com.courzelo.lms.dto.user.RecoverPasswordDTO;
import com.courzelo.lms.entities.user.Role;
import com.courzelo.lms.entities.user.User;
import com.courzelo.lms.security.Response;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;

import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.util.List;

public interface IAuthService {
    ResponseEntity<Response> saveUser(User user, String userAgent);

    ResponseEntity<?> confirmDevice(String userAgent, HttpServletResponse response, LoginDTO loginDTO, Integer code);

    ResponseEntity<?> loginUser(LoginDTO loginDTO, HttpServletResponse response, HttpServletRequest request, String userAgent);
    ResponseEntity<?> loginTFA(LoginDTO loginDTO,HttpServletResponse response, int verificationCode);

    void logout(HttpServletResponse response);

    ResponseEntity<Response> verifyAccount(String code);

    ResponseEntity<Boolean> isAuthenticated(Principal principal);

    ResponseEntity<List<Role>> getRole(Principal principal);

    ResponseEntity<Response> forgotPassword(String email) throws MessagingException, UnsupportedEncodingException;

    ResponseEntity<Response> recoverPassword(String token, RecoverPasswordDTO passwordDTO);

    void disableTwoFactorAuth(String email);

    ResponseEntity<?> enableTwoFactorAuth(String email, String verificationCode);

    ResponseEntity<?> generateTwoFactorAuthQrCode(String email);

    boolean verifyTwoFactorAuth(String email, int verificationCode);
}
