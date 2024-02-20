package com.courzelo.lms.services;




import com.courzelo.lms.dto.ProfileDTO;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.security.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUserService {
    ResponseEntity<Response> saveUser(User user);
    ResponseEntity<Response> deleteUser(User user);
    ResponseEntity<Response> updateUserProfile (ProfileDTO user);
    User getUserByID(String userID);
    List<User> getUsers();
}
