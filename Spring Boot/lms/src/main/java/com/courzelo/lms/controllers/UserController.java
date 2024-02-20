package com.courzelo.lms.controllers;


import com.courzelo.lms.dto.ProfileDTO;
import com.courzelo.lms.dto.RegisterDTO;
import com.courzelo.lms.dto.UserDTO;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.security.Response;
import com.courzelo.lms.services.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders ="*" )
@RequestMapping("/api/v1/user")
@RestController
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private ModelMapper modelMapper;

    private final IUserService userService;
    @PostMapping()
    public ResponseEntity<Response> saveUser(@Valid @RequestBody RegisterDTO user){
     return userService.saveUser(modelMapper.map(user,User.class));
    }
    @PatchMapping()
    public ResponseEntity<Response> updateUserProfile(@Valid @RequestBody ProfileDTO user){
        return userService.updateUserProfile(user);
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

}
