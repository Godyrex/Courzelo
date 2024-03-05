package com.courzelo.lms.services;

import com.courzelo.lms.dto.UserDTO;
import com.courzelo.lms.dto.UserListDTO;
import com.courzelo.lms.security.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface IAdminService {
    ResponseEntity<Response> toggleBan(String userID);

    ResponseEntity<Response> addRole(String role, String userID);

    ResponseEntity<Response> removeRole(String role, String userID);

    ResponseEntity<UserListDTO> getUsers(int page, int sizePerPage);

    ResponseEntity<Response> toggleEnable(String userID);
}
