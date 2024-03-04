package com.courzelo.lms.services;

import com.courzelo.lms.dto.ClassDTO;
import com.courzelo.lms.dto.UserListDTO;
import com.courzelo.lms.entities.Institution;
import com.courzelo.lms.entities.User;
import org.springframework.http.ResponseEntity;

import java.security.Principal;
import java.util.List;

public interface IClassService {
    ResponseEntity<List<ClassDTO>> getClasses();

    ResponseEntity<Boolean> deleteClass(String classID);
    void removeUsersInClass(String classID);

    ResponseEntity<Boolean> addClass(ClassDTO classDTO);

    ResponseEntity<Boolean> updateClass(ClassDTO classDTO);

    ResponseEntity<UserListDTO> getClassUsers(String classID, Principal principal, String role, int page, int sizePerPage);

    ResponseEntity<Boolean> addUserToClass(String classID, String userEmail, String role);

    ResponseEntity<Boolean> removeUser(String classID, String userEmail);
    boolean userInInstitution(User user, Institution institution);
}
