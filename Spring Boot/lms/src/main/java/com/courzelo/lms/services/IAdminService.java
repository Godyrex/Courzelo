package com.courzelo.lms.services;

import com.courzelo.lms.dto.UserDTO;
import com.courzelo.lms.security.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IAdminService {
    ResponseEntity<Response> toggleBan(String userID);

    ResponseEntity<Response> addRole(String role, String userID);

    ResponseEntity<Response> removeRole(String role, String userID);

    ResponseEntity<List<UserDTO>> getUsers();

    ResponseEntity<Response> toggleEnable(String userID);
}
