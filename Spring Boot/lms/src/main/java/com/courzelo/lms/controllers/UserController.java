package com.courzelo.lms.controllers;


import com.courzelo.lms.entities.User;
import com.courzelo.lms.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders ="*" )
@RequestMapping("/api/v1/user")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;
    @PostMapping()
    public void saveUser(@RequestBody User user){
     userService.saveUser(user);
    }
    @PutMapping()
    public void updateUser(@RequestBody User user){
        userService.updateUser(user);
    }
    @GetMapping("/{userID}")
    public User getUserByID(@PathVariable String userID){
        return userService.getUserByID(userID);
    }
    @GetMapping()
    public List<User> getUsers(){
        return  userService.getUsers();
    }
    @PostMapping("/{userID}/{studentID}")
    public void assignStudentToUser(@PathVariable String studentID ,@PathVariable String userID){
        userService.assignStudentToUser(studentID, userID);
    }
}
