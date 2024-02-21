package com.courzelo.lms.controllers;


import com.courzelo.lms.dto.*;
import com.courzelo.lms.entities.Role;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.security.JwtResponse;
import com.courzelo.lms.security.Response;
import com.courzelo.lms.services.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders ="*" )
@RequestMapping("/api/v1/user")
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('SUPERADMIN')")
public class UserController {
    @Autowired
    private ModelMapper modelMapper;

    private final IUserService userService;
    @PreAuthorize("permitAll()")
    @PostMapping("/signup")
    public ResponseEntity<Response> signup(@Valid @RequestBody RegisterDTO user){
     return userService.saveUser(modelMapper.map(user,User.class));
    }
    @PreAuthorize("isAuthenticated()")
    @PatchMapping()
    public ResponseEntity<Response> updateUserProfile(@Valid @RequestBody ProfileDTO user,Principal principal){
        return userService.updateUserProfile(user,principal.getName());
    }

    @GetMapping("/{userID}")
    public UserDTO getUserByID(@PathVariable String userID){
        return modelMapper.map(userService.getUserByID(userID), UserDTO.class);
    }
    @GetMapping()
    public List<UserDTO> getUsers(){
        return  userService.getUsers().stream()
                .map(user -> modelMapper.map(user,UserDTO.class)).toList();
    }
    @DeleteMapping("/{userID}")
    public ResponseEntity<Response> deleteUser(@PathVariable String userID){
      return userService.deleteUser(userService.getUserByID(userID));
    }
    @PostMapping("/add/{userID}/{role}")
    public ResponseEntity<Response> addRole(@PathVariable String userID, @PathVariable Role role){
        return userService.addRole(role,userID);
    }
    @PostMapping("/remove/{userID}/{role}")
    public ResponseEntity<Response> removeRole(@PathVariable String userID, @PathVariable Role role){
        return userService.removeRole(role,userID);
    }
    @PreAuthorize("isAuthenticated()")
    @PatchMapping("/changePassword")
    public ResponseEntity<Response> changePassword(Principal principal, @Valid @RequestBody PasswordDTO passwordDTO){
        return userService.changePassword(passwordDTO, principal.getName());
    }
    @PreAuthorize("permitAll()")
    @PostMapping("/signing")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginDTO loginDTO) {
        return userService.authenticateUser(loginDTO);
    }
    @PostMapping("/ban/{userID}")
    public ResponseEntity<Response> ban(@PathVariable String userID){
        return userService.ban(userID);
    }
    @PostMapping("/unban/{userID}")
    public ResponseEntity<Response> unban(@PathVariable String userID){
        return userService.unban(userID);
    }

}
