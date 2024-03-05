package com.courzelo.lms.services.user;

import com.courzelo.lms.dto.user.DeleteAccountDTO;
import com.courzelo.lms.dto.user.PasswordDTO;
import com.courzelo.lms.dto.user.ProfileDTO;
import com.courzelo.lms.dto.user.UpdateEmailDTO;
import com.courzelo.lms.entities.user.User;
import com.courzelo.lms.exceptions.UserNotFoundException;
import com.courzelo.lms.repositories.UserRepository;
import com.courzelo.lms.security.Response;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.Principal;

@Service
@Slf4j
public class UserService implements UserDetailsService {
    public static final String USER_NOT_FOUND = "User not found with id : ";
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final EmailService emailService;
    private final IPhotoService iPhotoService;
    private final IAuthService iAuthService;

    public UserService(UserRepository userRepository, @Lazy PasswordEncoder encoder, EmailService emailService, IPhotoService iPhotoService, @Lazy IAuthService iAuthService) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.emailService = emailService;
        this.iPhotoService = iPhotoService;
        this.iAuthService = iAuthService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(email);
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(email);
    }

    public ResponseEntity<Response> deleteUser(User user) {
        log.info("deleteUser :Deleting user " + user.getEmail() + "....");
        if (!userRepository.existsById(user.getId())) {
            throw new UserNotFoundException(USER_NOT_FOUND + user.getId());
        }
        userRepository.delete(user);
        log.info("deleteUser :User Deleted!");
        return ResponseEntity.ok().body(new Response("Account Deleted!"));
    }

    public ResponseEntity<Response> updateUserProfile(ProfileDTO profileDTO, String email) {
        log.info("updateUserProfile :Updating user " + email + " profile...");
        User user = userRepository.findUserByEmail(email);
        if (profileDTO.getName() != null && !profileDTO.getName().isEmpty()) {
            log.info("updateUserProfile :Setting name to " + profileDTO.getName());
            user.setName(profileDTO.getName());
            log.info("updateUserProfile :Name set to " + user.getName());
        }
        if (profileDTO.getLastName() != null && !profileDTO.getLastName().isEmpty()) {
            log.info("updateUserProfile :Setting lastname to " + profileDTO.getLastName());
            user.setLastName(profileDTO.getLastName());
            log.info("updateUserProfile :Lastname set to " + user.getLastName());
        }
        userRepository.save(user);
        log.info("updateUserProfile :Profile Updated!");
        return ResponseEntity.ok().body(new Response("Profile Updated!"));
    }

    public User getUserByID(String userID) {
        return userRepository.findById(userID)
                .orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND + userID));
    }

    public ResponseEntity<Response> changePassword(PasswordDTO passwordDTO, String email) {
        log.info("changePassword :Changing user " + email + " password...");
        log.info("changePassword :Given Password :" + encoder.encode(passwordDTO.getPassword()));
        User user = userRepository.findUserByEmail(email);
        log.info("changePassword :Actual Password :" + user.getPassword());
        if (!encoder.matches(passwordDTO.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body(new Response("Password is wrong!"));
        }
        log.info("changePassword :Setting password to " + passwordDTO.getNewPassword());
        user.setPassword(encoder.encode(passwordDTO.getNewPassword()));
        log.info("changePassword :Encoded password set to " + user.getPassword());

        userRepository.save(user);
        log.info("changePassword :Password Changed!");
        return ResponseEntity.ok().body(new Response("Password updated!"));
    }

    public boolean ValidUser(String email) {
        User user = userRepository.findUserByEmail(email);
        return !user.getBan() && user.isEnabled();
    }


    public ResponseEntity<HttpStatus> sendVerificationCode(Principal principal) {
        User user = userRepository.findUserByEmail(principal.getName());
        try {
            emailService.sendVerificationCode(user, emailService.generateVerificationCode(user));
            return ResponseEntity.ok().build();
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<HttpStatus> updateEmail(UpdateEmailDTO updateEmailDTO, Principal principal) {
        User user = userRepository.findUserByEmail(principal.getName());
        if (user.getVerificationCode() == updateEmailDTO.getCode()) {
            user.setEmail(updateEmailDTO.getEmail());
            user.setVerificationCode(null);
            userRepository.save(user);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    public ResponseEntity<HttpStatus> updatePhoto(MultipartFile file, Principal principal) throws IOException {
        User user = userRepository.findUserByEmail(principal.getName());
        user.setPhoto(iPhotoService.addPhoto(file));
        userRepository.save(user);
        log.info("finish update photo");
        return ResponseEntity.ok().build();
    }

    public ResponseEntity<HttpStatus> deleteAccount(DeleteAccountDTO dto, Principal principal, HttpServletRequest request, HttpServletResponse response) {
        User user = userRepository.findUserByEmail(principal.getName());
        if (user != null && dto.getPassword() != null) {
            if (encoder.matches(dto.getPassword(), user.getPassword())) {
                deleteUser(user);
                iAuthService.logout(response);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.badRequest().build();

        }
        return ResponseEntity.badRequest().build();
    }

}
