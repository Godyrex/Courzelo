package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.user.UserListDTO;
import com.courzelo.lms.security.Response;
import com.courzelo.lms.services.user.IAdminService;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/v1/admin")
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('SUPERADMIN')")
@RateLimiter(name = "backend")
public class AdminController {
    private final IAdminService iAdminService;

    @GetMapping("/users")
    @Cacheable(value = "UsersList", key = "#page + '-' + #sizePerPage")
    public ResponseEntity<UserListDTO> getUsers(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "2") int sizePerPage) {
        return iAdminService.getUsers(page, sizePerPage);
    }

    @PostMapping("/add/{userID}/{role}")
    @CacheEvict(value = "UsersList", allEntries = true)
    public ResponseEntity<Response> addRole(@PathVariable String userID, @PathVariable String role) {
        return iAdminService.addRole(role, userID);
    }

    @PostMapping("/remove/{userID}/{role}")
    @CacheEvict(value = "UsersList", allEntries = true)
    public ResponseEntity<Response> removeRole(@PathVariable String userID, @PathVariable String role) {
        return iAdminService.removeRole(role, userID);
    }

    @PostMapping("/ban/{userID}")
    @CacheEvict(value = "UsersList", allEntries = true)
    public ResponseEntity<Response> toggleBan(@PathVariable String userID) {
        return iAdminService.toggleBan(userID);
    }

    @PostMapping("/enable/{userID}")
    @CacheEvict(value = "UsersList", allEntries = true)
    public ResponseEntity<Response> toggleEnable(@PathVariable String userID) {
        return iAdminService.toggleEnable(userID);
    }
}
