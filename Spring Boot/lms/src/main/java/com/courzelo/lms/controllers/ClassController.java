package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.ClassDTO;
import com.courzelo.lms.dto.UserListDTO;
import com.courzelo.lms.services.IClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/v1/class")
@RestController
@RequiredArgsConstructor
public class ClassController {
    private final IClassService iClassService;

    @PostMapping("/add")
    public ResponseEntity<Boolean> addClass(ClassDTO classDTO) {
        return iClassService.addClass(classDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ClassDTO>> getClasses() {
        return iClassService.getClasses();
    }

    @DeleteMapping("/delete/{classID}")
    public ResponseEntity<Boolean> deleteClass(@PathVariable String classID) {
        return iClassService.deleteClass(classID);
    }

    @PostMapping("/update")
    public ResponseEntity<Boolean> updateClass(@RequestBody ClassDTO classDTO) {
        return iClassService.updateClass(classDTO);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getClassUsers/{role}")
    public ResponseEntity<UserListDTO> getClassUsers(@RequestParam(required = false) String classID,
                                                           Principal principal,
                                                           @PathVariable String role,
                                                           @RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "2") int sizePerPage) {
        return iClassService.getClassUsers(classID, principal, role, page, sizePerPage);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add/user/{userEmail}/{role}")
    public ResponseEntity<Boolean> addUserToClass(@RequestParam String id, @PathVariable String userEmail, @PathVariable String role) {
        return iClassService.addUserToClass(id, userEmail, role);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/remove/user/{userEmail}")
    public ResponseEntity<Boolean> removeUser(@RequestParam String classID, @PathVariable String userEmail) {
        return iClassService.removeUser(classID, userEmail);
    }
}
