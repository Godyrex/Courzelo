package com.courzelo.lms.services.user;

import com.courzelo.lms.dto.user.UserListDTO;
import com.courzelo.lms.security.Response;
import org.springframework.http.ResponseEntity;

public interface IAdminService {
    ResponseEntity<Response> toggleBan(String userID);

    ResponseEntity<Response> addRole(String role, String userID);

    ResponseEntity<Response> removeRole(String role, String userID);

    ResponseEntity<UserListDTO> getUsers(int page, int sizePerPage);

    ResponseEntity<Response> toggleEnable(String userID);
}
