package com.courzelo.lms.services;


import com.courzelo.lms.dto.ProfileDTO;
import com.courzelo.lms.entities.Role;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.exceptions.UserNotFoundException;
import com.courzelo.lms.repositories.UserRepository;
import com.courzelo.lms.security.Response;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
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
    public ResponseEntity<Response> updateUserProfile(ProfileDTO profileDTO) {
        User user = userRepository.findById(profileDTO.getId())
                .orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND+profileDTO.getId()));
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

}
