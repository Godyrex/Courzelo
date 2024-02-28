package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.UserDTO;
import com.courzelo.lms.entities.Role;
import com.courzelo.lms.security.Response;
import com.courzelo.lms.services.AdminService;
import com.courzelo.lms.services.IAdminService;
import com.courzelo.lms.services.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders ="*",allowCredentials = "true" )
@RequestMapping("/api/v1/admin")
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('SUPERADMIN')")
public class AdminController {
    private final IAdminService iAdminService;
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getUsers(){
        return  iAdminService.getUsers();
    }
    @PostMapping("/add/{userID}/{role}")
    public ResponseEntity<Response> addRole(@PathVariable String userID, @PathVariable String role){
        return iAdminService.addRole(role,userID);
    }
    @PostMapping("/remove/{userID}/{role}")
    public ResponseEntity<Response> removeRole(@PathVariable String userID, @PathVariable String role){
        return iAdminService.removeRole(role,userID);
    }
    @PostMapping("/ban/{userID}")
    public ResponseEntity<Response> toggleBan(@PathVariable String userID){
        return iAdminService.toggleBan(userID);
    }
    @PostMapping("/enable/{userID}")
    public ResponseEntity<Response> toggleEnable(@PathVariable String userID){
        return iAdminService.toggleEnable(userID);
    }
}
