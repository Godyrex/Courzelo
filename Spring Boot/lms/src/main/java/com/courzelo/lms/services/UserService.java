package com.courzelo.lms.services;

import com.courzelo.lms.dto.PasswordDTO;
import com.courzelo.lms.dto.ProfileDTO;
import com.courzelo.lms.entities.Role;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.exceptions.UserNotFoundException;
import com.courzelo.lms.exceptions.UserRoleNotFoundException;
import com.courzelo.lms.repositories.UserRepository;
import com.courzelo.lms.security.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public UserService(UserRepository userRepository,@Lazy PasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    private static final String USER_NOT_FOUND = "User not found with id : ";
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findUserByEmail(email);
    }
    public UserDetails loadUserByEmail(String email) throws  UsernameNotFoundException{
        return userRepository.findUserByEmail(email);
    }
    public ResponseEntity<Response> deleteUser(User user) {
        if(!userRepository.existsById(user.getId())){
            throw new UserNotFoundException(USER_NOT_FOUND+user.getId());
        }
        userRepository.delete(user);
        return ResponseEntity.ok().body(new Response("Account Deleted!"));
    }

    public ResponseEntity<Response> updateUserProfile(ProfileDTO profileDTO, String email) {
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

    public User getUserByID(String userID) {
        return userRepository.findById(userID)
                .orElseThrow(()-> new UserNotFoundException(USER_NOT_FOUND+userID));
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

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

    public ResponseEntity<Response> changePassword(PasswordDTO passwordDTO, String email) {
        User user = userRepository.findUserByEmail(email);
        if(!encoder.matches(passwordDTO.getPassword(), user.getPassword())){
            return ResponseEntity.badRequest().body(new Response("Password is wrong!"));
        }
        user.setPassword(encoder.encode(passwordDTO.getNewPassword()));
        userRepository.save(user);
        return ResponseEntity.ok().body(new Response("Password updated!"));
    }


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
