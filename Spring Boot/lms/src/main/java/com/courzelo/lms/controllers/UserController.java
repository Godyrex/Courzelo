package com.courzelo.lms.controllers;


import com.courzelo.lms.dto.*;
import com.courzelo.lms.entities.Photo;
import com.courzelo.lms.security.Response;
import com.courzelo.lms.services.IPhotoService;
import com.courzelo.lms.services.PhotoService;
import com.courzelo.lms.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/v1/user")
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('SUPERADMIN')")
public class UserController {
    private final UserService userService;
    private final IPhotoService photoService;
    @Autowired
    private ModelMapper modelMapper;

    @PreAuthorize("isAuthenticated()")
    @PatchMapping("/update/name")
    public ResponseEntity<Response> updateUserProfile(@Valid @RequestBody ProfileDTO user, Principal principal) {
        return userService.updateUserProfile(user, principal.getName());
    }

    @GetMapping("/{userID}")
    public UserDTO getUserByID(@PathVariable String userID) {
        return modelMapper.map(userService.getUserByID(userID), UserDTO.class);
    }

    @DeleteMapping("/{userID}")
    public ResponseEntity<Response> deleteUser(@PathVariable String userID) {
        return userService.deleteUser(userService.getUserByID(userID));
    }

    @PreAuthorize("isAuthenticated()")
    @PatchMapping("/update/password")
    public ResponseEntity<Response> changePassword(Principal principal, @Valid @RequestBody PasswordDTO passwordDTO) {
        return userService.changePassword(passwordDTO, principal.getName());
    }


    @PreAuthorize("isAuthenticated()")
    @PostMapping("/sendVerificationCode")
    public ResponseEntity<HttpStatus> sendVerificationCode(Principal principal) {
        return userService.sendVerificationCode(principal);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/update/email")
    public ResponseEntity<HttpStatus> changeEmail(@Valid @RequestBody UpdateEmailDTO updateEmailDTO, Principal principal) {
        return userService.updateEmail(updateEmailDTO, principal);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/update/photo")
    public ResponseEntity<HttpStatus> changePhoto(@RequestParam("file") MultipartFile file, Principal principal) throws IOException {
        return userService.updatePhoto(file, principal);
    }
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/photo/{photoId}")
    public ResponseEntity<byte[]> getPhoto(@PathVariable String photoId) {
    return photoService.getPhoto(photoId);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/delete")
    public ResponseEntity<HttpStatus> deleteAccount(@Valid @RequestBody DeleteAccountDTO dto, Principal principal, HttpServletRequest request, HttpServletResponse response) {
        return userService.deleteAccount(dto, principal, request, response);
    }

}
