package com.courzelo.lms.services;




import com.courzelo.lms.dto.LoginDTO;
import com.courzelo.lms.dto.PasswordDTO;
import com.courzelo.lms.dto.ProfileDTO;
import com.courzelo.lms.entities.Role;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.security.JwtResponse;
import com.courzelo.lms.security.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUserService {
    ResponseEntity<Response> saveUser(User user);
    ResponseEntity<Response> deleteUser(User user);
    ResponseEntity<Response> updateUserProfile (ProfileDTO user,String email);
    User getUserByID(String userID);
    List<User> getUsers();
    ResponseEntity<Response> addRole (Role role,String userID);
    ResponseEntity<Response> removeRole (Role role,String userID);
    ResponseEntity<Response> changePassword(PasswordDTO passwordDTO,String email);
    ResponseEntity<JwtResponse> authenticateUser(LoginDTO loginDTO);
    ResponseEntity<Response> ban(String userID);
    ResponseEntity<Response> unban(String userID);


}
