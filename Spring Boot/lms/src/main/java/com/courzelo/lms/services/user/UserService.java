package com.courzelo.lms.services.user;

import com.courzelo.lms.dto.user.*;
import com.courzelo.lms.entities.institution.Class;
import com.courzelo.lms.entities.institution.Institution;
import com.courzelo.lms.entities.user.*;
import com.courzelo.lms.exceptions.ClassNotFoundException;
import com.courzelo.lms.exceptions.*;
import com.courzelo.lms.repositories.ClassRepository;
import com.courzelo.lms.repositories.InstitutionRepository;
import com.courzelo.lms.repositories.UserRepository;
import com.courzelo.lms.repositories.VerificationTokenRepository;
import com.courzelo.lms.security.JwtResponse;
import com.courzelo.lms.security.Response;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Random;

import static com.courzelo.lms.entities.user.Role.TEACHER;

@Service
@Slf4j
public class UserService implements UserDetailsService {
    public static final String USER_NOT_FOUND = "User not found with id : ";
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final EmailService emailService;
    private final IPhotoService iPhotoService;
    private final IAuthService iAuthService;
    private final VerificationTokenRepository verificationTokenRepository;
    private final ClassRepository classRepository;
    private final InstitutionRepository institutionRepository;

    public UserService(UserRepository userRepository, @Lazy PasswordEncoder encoder, EmailService emailService, IPhotoService iPhotoService, @Lazy IAuthService iAuthService, VerificationTokenRepository verificationTokenRepository, ClassRepository classRepository, InstitutionRepository institutionRepository) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.emailService = emailService;
        this.iPhotoService = iPhotoService;
        this.iAuthService = iAuthService;
        this.verificationTokenRepository = verificationTokenRepository;
        this.classRepository = classRepository;
        this.institutionRepository = institutionRepository;
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
            user.getProfile().setName(profileDTO.getName());
            log.info("updateUserProfile :Name set to " + user.getProfile().getName());
        }
        if (profileDTO.getLastName() != null && !profileDTO.getLastName().isEmpty()) {
            log.info("updateUserProfile :Setting lastname to " + profileDTO.getLastName());
            user.getProfile().setLastName(profileDTO.getLastName());
            log.info("updateUserProfile :Lastname set to " + user.getProfile().getLastName());
        }
        user.getActivity().setUpdatedAt(Instant.now());
        user.getActivity().setLastProfileChange(Instant.now());
        userRepository.save(user);
        log.info("updateUserProfile :Profile Updated!");
        return ResponseEntity.ok().body(new Response("Profile Updated!"));
    }

    public User getUserByID(String userID) {
        return userRepository.findById(userID)
                .orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND + userID));
    }

    public JwtResponse getMyInfo(String email) {
        log.info("getMyInfo :Getting user " + email + " info...");
        User user = userRepository.findUserByEmail(email);
        List<String> roles = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        Institution institution = null;
        Class institutionClass = null;
        if (user.getEducation().getInstitution() != null) {
            institution = institutionRepository.findById(user.getEducation().getInstitution().getId())
                    .orElseThrow(() -> new InstitutionNotFoundException("Institution not found"));
        }
        if (user.getEducation().getStclass() != null) {
            institutionClass = classRepository.findById(user.getEducation().getStclass().getId())
                    .orElseThrow(() -> new ClassNotFoundException("Class not found"));
        }
        return new JwtResponse(
                user.getEmail(),
                user.getProfile().getName(),
                user.getProfile().getLastName(),
                roles,
                user.getProfile().getPhoto() != null ? user.getProfile().getPhoto().getId() : null,
                institution != null ? institution.getName() : null,
                institutionClass != null ? institutionClass.getName() : null,
                user.getSecurity().isTwoFactorAuthEnabled()
        );
    }
    public UserContactDTO getMyContactInfo(String email){
        User user = userRepository.findUserByEmail(email);
        return new UserContactDTO(
                user.getContact().getAddress(),
                user.getContact().getPhoneNumber(),
                user.getContact().getWebsite(),
                user.getContact().getLinkedin(),
                user.getContact().getFacebook(),
                user.getContact().getGithub()
        );
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
        user.getActivity().setUpdatedAt(Instant.now());
        user.getActivity().setLastPasswordChange(Instant.now());
        userRepository.save(user);
        log.info("changePassword :Password Changed!");
        return ResponseEntity.ok().body(new Response("Password updated!"));
    }

    public boolean ValidUser(String email) {
        User user = userRepository.findUserByEmail(email);
        return !user.getSecurity().getBan() && user.isEnabled();
    }


    public ResponseEntity<HttpStatus> sendVerificationCode(Principal principal) {
        User user = userRepository.findUserByEmail(principal.getName());
        try {
            Random random = new Random();
            int verificationCode = random.nextInt(9000) + 1000;
            VerificationToken verificationToken = new VerificationToken(
                    String.valueOf(verificationCode),
                    user,
                    VerificationTokenType.UPDATE_EMAIL
            );
            verificationTokenRepository.save(verificationToken);
            emailService.sendVerificationCode(user, verificationToken);
            return ResponseEntity.ok().build();
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<HttpStatus> updateEmail(UpdateEmailDTO updateEmailDTO, Principal principal) {
        User user = userRepository.findUserByEmail(principal.getName());
        VerificationToken verificationToken = verificationTokenRepository.findByToken(String.valueOf(updateEmailDTO.getCode()));
        if (verificationToken == null) {
            throw new PasswordResetTokenNotFoundException("PasswordResetToken Not Found " + updateEmailDTO.getCode());
        }
        if (!verificationToken.getVerificationTokenType().equals(VerificationTokenType.UPDATE_EMAIL)) {
            return ResponseEntity.badRequest().build();
        }
        if (verificationToken.getExpiryDate().isBefore(Instant.now())) {
            throw new PasswordResetTokenExpiredException("PasswordResetToken Expired " + verificationToken.getExpiryDate());
        }
        if (Objects.equals(user.getId(), verificationToken.getUser().getId())) {
            user.setEmail(updateEmailDTO.getEmail());
            user.getActivity().setUpdatedAt(Instant.now());
            user.getActivity().setLastEmailChange(Instant.now());
            userRepository.save(user);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    public ResponseEntity<HttpStatus> updatePhoto(MultipartFile file, Principal principal) throws IOException {
        User user = userRepository.findUserByEmail(principal.getName());
        user.getProfile().setPhoto(iPhotoService.addPhoto(file));
        user.getActivity().setUpdatedAt(Instant.now());
        user.getActivity().setLastProfileChange(Instant.now());
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
    public User getProfById(String id) {
        return  userRepository.findById(id).orElseThrow(() -> new RuntimeException("Teacher with id " + id + " doesn't exist!"));
    }
    public List<Role> getUserRoles(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User with id " + userId + " doesn't exist!"));
        return user.getRoles();
    }
    public List<User> getProfsByRole() {
        return  userRepository.findUsersByRoles(Collections.singletonList(TEACHER));
    }
    public List<User> findTeachersByNameAndRole(String id,String name, Role role) {
        return userRepository.findUsersByIdAndRolesContainsAndProfileName(id,TEACHER, name);
    }
    public User findTeacherByNameAndRole(String id,String name, Role role) {
        return userRepository.findUserByIdAndRolesContainsAndProfileName(id,TEACHER, name);
    }


    public User addTeacher(User user) {
        // Check if the user is a teacher
        if (!user.getRoles().contains(Role.TEACHER)) {
            throw new IllegalArgumentException("User must be a teacher");
        }
        // Check if the password is null
        /*if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null");
        }
        // Encode the password
        user.setPassword(encoder.encode(user.getPassword()));*/
        // Save the user in the database
        return userRepository.save(user);
    }


   /* public User addTeacher(User teacher) {
        return userRepository.save(teacher);
    }*/
    public List<User> getTeachers() {
        return userRepository.findByRolesContains(Role.TEACHER);
    }


    public ResponseEntity<HttpStatus> updateUserContact(String name, UserContactDTO userUpdateDTO) {
        log.info("updateUserDetails :Updating details of user " + name + "...");
        User user = userRepository.findUserByEmail(name);
         user.getContact().setAddress(userUpdateDTO.getUserAddress());
            user.getContact().setPhoneNumber(userUpdateDTO.getPhoneNumber());
            user.getContact().setWebsite(userUpdateDTO.getWebsite());
            user.getContact().setLinkedin(userUpdateDTO.getLinkedin());
            user.getContact().setFacebook(userUpdateDTO.getFacebook());
            user.getContact().setGithub(userUpdateDTO.getGithub());
        user.getActivity().setUpdatedAt(Instant.now());
        user.getActivity().setLastContactChange(Instant.now());
        userRepository.save(user);
        log.info("updateUserDetails :User details Updated!");
        return ResponseEntity.ok().build();
    }
}
