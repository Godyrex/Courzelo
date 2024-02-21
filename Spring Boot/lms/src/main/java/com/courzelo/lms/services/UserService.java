package com.courzelo.lms.services;


import com.courzelo.lms.dto.LoginDTO;
import com.courzelo.lms.dto.PasswordDTO;
import com.courzelo.lms.dto.ProfileDTO;
import com.courzelo.lms.entities.Role;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.exceptions.UserNotFoundException;
import com.courzelo.lms.exceptions.UserRoleNotFoundException;
import com.courzelo.lms.repositories.UserRepository;
import com.courzelo.lms.security.JwtResponse;
import com.courzelo.lms.security.Response;
import com.courzelo.lms.security.jwt.JWTUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;
    private static final String USER_NOT_FOUND = "User not found with id : ";
    @Override
    public ResponseEntity<Response> saveUser(User user) {
        if (Boolean.TRUE.equals(userRepository.existsByEmail(user.getEmail()))) {
            return ResponseEntity
                    .badRequest()
                    .body(new Response("Error: Email is already in use!"));
        }
        user.setPassword(encoder.encode(user.getPassword()));
        user.getRoles().add(Role.STUDENT);
        user.setBan(false);
        userRepository.save(user);
        return ResponseEntity
                .ok()
                .body(new Response("Account Created!"));
    }

    @Override
    public ResponseEntity<Response> deleteUser(User user) {
        if(!userRepository.existsById(user.getId())){
            throw new UserNotFoundException(USER_NOT_FOUND+user.getId());
        }
        userRepository.delete(user);
        return ResponseEntity.ok().body(new Response("Account Deleted!"));
    }

    @Override
    public ResponseEntity<Response> updateUserProfile(ProfileDTO profileDTO,String email) {
        User user = userRepository.findUserByEmail(email);
        if(profileDTO.getName()!=null){
            user.setName(profileDTO.getName());
        }
        if(profileDTO.getLastName()!=null){
            user.setLastName(profileDTO.getLastName());
        }
        userRepository.save(user);
        return ResponseEntity.ok().body(new Response("Profile Updated!"));
    }

    @Override
    public User getUserByID(String userID) {
        return userRepository.findById(userID)
                .orElseThrow(()-> new UserNotFoundException(USER_NOT_FOUND+userID));
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public ResponseEntity<Response> addRole(Role role, String userID) {
        User user = checkUserAndRole(role,userID);
        if(user.getRoles().contains(role)){
            return ResponseEntity
                    .badRequest()
                    .body(new Response("Role already assigned"));
        }
        user.getRoles().add(role);
        userRepository.save(user);
        return ResponseEntity.ok().body(new Response("Role assigned!"));
    }

    @Override
    public ResponseEntity<Response> removeRole(Role role, String userID) {

        User user = checkUserAndRole(role,userID);
        if(!user.getRoles().contains(role)){
            return ResponseEntity
                    .badRequest()
                    .body(new Response("Role not assigned"));
        }
        user.getRoles().remove(role);
        userRepository.save(user);
        return ResponseEntity.ok().body(new Response("Role removed!"));
    }

    @Override
    public ResponseEntity<Response> changePassword(PasswordDTO passwordDTO, String email) {
      User user = userRepository.findUserByEmail(email);
        if(!encoder.matches(passwordDTO.getPassword(), user.getPassword())){
            return ResponseEntity.badRequest().body(new Response("Password is wrong!"));
        }
        user.setPassword(encoder.encode(passwordDTO.getNewPassword()));
        userRepository.save(user);
        return ResponseEntity.ok().body(new Response("Password updated!"));
    }

    @Override
    public ResponseEntity<JwtResponse> authenticateUser(LoginDTO loginDTO) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);


        User userDetails = (User) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getEmail(),
                userDetails.getName(),
                userDetails.getLastName(),
                roles
                ));
    }

    @Override
    public ResponseEntity<Response> ban(String userID) {
        User user = userRepository.findById(userID)
                .orElseThrow(()-> new UserNotFoundException(USER_NOT_FOUND+userID));
        if(Boolean.TRUE.equals(user.getBan())){
            return ResponseEntity
                    .badRequest()
                    .body(new Response("User already banned!"));
        }
        user.setBan(true);
        userRepository.save(user);
        return ResponseEntity.ok().body(new Response("User banned!"));
    }

    @Override
    public ResponseEntity<Response> unban(String userID) {
        User user = userRepository.findById(userID)
                .orElseThrow(()-> new UserNotFoundException(USER_NOT_FOUND+userID));
        if(Boolean.FALSE.equals(user.getBan())){
            return ResponseEntity
                    .badRequest()
                    .body(new Response("User already unbanned!"));
        }
        user.setBan(false);
        userRepository.save(user);
        return ResponseEntity.ok().body(new Response("User unbanned!"));
    }


    private User checkUserAndRole(Role role,String userID) {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND+userID));
        boolean roleExists = false;
        for (Role r : Role.values()) {
            if (r.equals(role)) {
                roleExists = true;
                break;
            }
        }
        if(!roleExists){
            throw new UserRoleNotFoundException("Role not found");
        }
        return user;
    }

}
