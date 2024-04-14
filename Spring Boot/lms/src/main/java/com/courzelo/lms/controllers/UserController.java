package com.courzelo.lms.controllers;


import com.courzelo.lms.dto.user.*;
import com.courzelo.lms.entities.user.Role;
import com.courzelo.lms.entities.user.User;
import com.courzelo.lms.entities.user.UserAddress;
import com.courzelo.lms.security.JwtResponse;
import com.courzelo.lms.security.Response;
import com.courzelo.lms.services.user.IDeviceMetadataService;
import com.courzelo.lms.services.user.IPhotoService;
import com.courzelo.lms.services.user.UserService;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/v1/user")
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('SUPERADMIN')")
@RateLimiter(name = "backend")
public class UserController {
    private final UserService userService;
    private final IPhotoService photoService;
    private final IDeviceMetadataService iDeviceMetadataService;
    @Autowired
    private ModelMapper modelMapper;

    @PreAuthorize("isAuthenticated()")
    @PatchMapping("/update/profile")
    @CacheEvict(value = {"UsersList", "MyInfo", "AnotherCache"}, allEntries = true)
    public ResponseEntity<Response> updateUserProfile(@Valid @RequestBody ProfileDTO user, Principal principal) {
        return userService.updateUserProfile(user, principal.getName());
    }
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/search")
    public ResponseEntity<List<UserDTO>> searchByKeyword(@RequestParam String keyword ,@RequestParam String page){
        List<User> users = userService.searchByKeyword(keyword , Integer.parseInt(page));
        List<UserDTO> userDTOS = users.stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getEmail(),
                        user.getRoles().stream().map(Role::name).toList(),
                        user.getSecurity(),
                        user.getProfile(),
                        user.getEducation(),
                        user.getContact(),
                        user.getActivity(),
                        user.getSettings()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTOS);
    }
    @PutMapping("/update/showPhone")
    @CacheEvict(value = {"UsersList", "MyInfo", "AnotherCache"}, allEntries = true)
    public ResponseEntity<Response> updateShowPhone(Principal principal) {
        return userService.updateShowPhone(principal.getName());
    }
    @PutMapping("/update/showAddress")
    @CacheEvict(value = {"UsersList", "MyInfo", "AnotherCache"}, allEntries = true)
    public ResponseEntity<Response> updateShowAddress(Principal principal) {
        return userService.updateShowAddress(principal.getName());
    }
    @PutMapping("/update/showBirthDate")
    @CacheEvict(value = {"UsersList", "MyInfo", "AnotherCache"}, allEntries = true)
    public ResponseEntity<Response> updateShowBirthDate(Principal principal) {
        return userService.updateShowBirthDate(principal.getName());
    }

    @GetMapping("/{userID}")
    public UserDTO getUserByID(@PathVariable String userID) {
        return modelMapper.map(userService.getUserByID(userID), UserDTO.class);
    }
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/myInfo")
    @Cacheable(value = "MyInfo", key = "#principal.name")
    public ResponseEntity<UserDTO> getMyInfo(Principal principal) {
        return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(2, TimeUnit.SECONDS).cachePrivate())
                .body(userService.getMyInfo(principal.getName()));
    }
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/myContactInfo")
    public ResponseEntity<UserContactDTO> getMyContactInfo(Principal principal) {
        return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(2, TimeUnit.SECONDS).cachePrivate())
                .body(userService.getMyContactInfo(principal.getName()));
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
    @CacheEvict(value = {"UsersList", "MyInfo", "AnotherCache"}, allEntries = true)
    public ResponseEntity<HttpStatus> changeEmail(@Valid @RequestBody UpdateEmailDTO updateEmailDTO, Principal principal) {
        return userService.updateEmail(updateEmailDTO, principal);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/update/photo")
    @CacheEvict(value = {"UsersList", "MyInfo", "MyPhoto"}, allEntries = true)
    public ResponseEntity<HttpStatus> changePhoto(@RequestParam("file") MultipartFile file, Principal principal) throws IOException {
        return userService.updatePhoto(file, principal);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/photo/{photoId}")
    @Cacheable(value = "MyPhoto", key = "#photoId")
    public ResponseEntity<byte[]> getPhoto(@PathVariable String photoId) {
        return photoService.getPhoto(photoId);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/delete")
    @CacheEvict(value = {"UsersList", "MyInfo", "AnotherCache"}, allEntries = true)
    public ResponseEntity<HttpStatus> deleteAccount(@Valid @RequestBody DeleteAccountDTO dto, Principal principal, HttpServletRequest request, HttpServletResponse response) {
        return userService.deleteAccount(dto, principal, request, response);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/delete/device")
    @CacheEvict(value = "Devices", allEntries = true)
    public ResponseEntity<HttpStatus> deleteDevice(@RequestParam String id) {
        return iDeviceMetadataService.deleteDevice(id);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/devices")
    @Cacheable(value = "Devices", key = "#page + '-' + #sizePerPage")
    public ResponseEntity<DeviceListDTO> getDevices(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "2") int sizePerPage,
                                                    Principal principal
    ) {
        return iDeviceMetadataService.getDevices(page, sizePerPage, principal);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/update/contact")
    @CacheEvict(value = {"UsersList", "MyInfo", "AnotherCache"}, allEntries = true)
    public ResponseEntity<HttpStatus> updateUserContact(@Valid @RequestBody UserContactDTO userContactDTO, Principal principal) {
        return userService.updateUserContact(principal.getName(), userContactDTO);
    }
}
