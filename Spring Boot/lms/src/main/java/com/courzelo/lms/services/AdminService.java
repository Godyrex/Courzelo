package com.courzelo.lms.services;

import com.courzelo.lms.dto.UserDTO;
import com.courzelo.lms.entities.Role;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.exceptions.UserNotFoundException;
import com.courzelo.lms.exceptions.UserRoleNotFoundException;
import com.courzelo.lms.repositories.UserRepository;
import com.courzelo.lms.security.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.courzelo.lms.services.UserService.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService implements IAdminService{
    @Autowired
    private ModelMapper modelMapper;
    private final UserRepository userRepository;
    public ResponseEntity<Response> toggleEnable(String userID) {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND + userID));
        boolean isEnabled = user.isEnabled();
        user.setEnabled(!isEnabled);
        userRepository.save(user);
        String message = isEnabled ? "User disabled!" : "User enabled!";
        return ResponseEntity.ok().body(new Response(message));
    }
    public ResponseEntity<Response> toggleBan(String userID) {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND + userID));

        boolean isBanned = user.getBan() != null && user.getBan();
        user.setBan(!isBanned);
        userRepository.save(user);
        String message = isBanned ? "User unbanned!" : "User banned!";
        return ResponseEntity.ok().body(new Response(message));
    }

    public ResponseEntity<Response> addRole(String role, String userID) {
        if(roleExist(role)) {
            User user = userRepository.findById(userID)
                    .orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND + userID));
            if (user.getRoles().contains(Role.valueOf(role))) {
                return ResponseEntity
                        .badRequest()
                        .body(new Response("Role already assigned"));
            }
            user.getRoles().add(Role.valueOf(role));
            userRepository.save(user);
            return ResponseEntity.ok().body(new Response("Role assigned!"));
        }
        return ResponseEntity
                .badRequest()
                .body(new Response("Role Doesn't Exist"));
    }

    public ResponseEntity<Response> removeRole(String role, String userID) {

        User user = userRepository.findById(userID)
                .orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND + userID));
        if(!user.getRoles().contains(Role.valueOf(role))){
            return ResponseEntity
                    .badRequest()
                    .body(new Response("Role not assigned"));
        }
        user.getRoles().remove(Role.valueOf(role));
        userRepository.save(user);
        return ResponseEntity.ok().body(new Response("Role removed!"));
    }
    private Boolean roleExist(String role) {
        boolean roleExists = false;
        for (Role r : Role.values()) {
            if (r.equals(Role.valueOf(role))) {
                roleExists = true;
                break;
            }
        }
        if(!roleExists){
            throw new UserRoleNotFoundException("Role not found");
        }
        return roleExists;
    }
    public ResponseEntity<List<UserDTO>> getUsers() {
        return ResponseEntity
                .ok()
                .body(userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList());
    }

}
