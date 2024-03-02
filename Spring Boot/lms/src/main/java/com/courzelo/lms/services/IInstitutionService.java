package com.courzelo.lms.services;


import com.courzelo.lms.dto.InstitutionDTO;
import com.courzelo.lms.dto.InstitutionListDTO;
import com.courzelo.lms.dto.UserDTO;
import com.courzelo.lms.dto.UserListDTO;
import org.springframework.http.ResponseEntity;

import java.security.Principal;
import java.util.List;

public interface IInstitutionService {
     ResponseEntity<InstitutionListDTO> getInstitutions(int page, int sizePerPage);
     ResponseEntity<InstitutionDTO> getInstitutionByID(String institutionID);
     ResponseEntity<InstitutionDTO> getInstitution(String email);

     ResponseEntity<Boolean> deleteInstitution(String institutionID);
     ResponseEntity<Boolean> addInstitution(InstitutionDTO institutionDTO);
     ResponseEntity<Boolean> updateInstitution(InstitutionDTO institutionDTO);


    ResponseEntity<UserListDTO> getInstitutionAdmins(String institutionID, int page, int sizePerPage);


     ResponseEntity<UserListDTO> getInstitutionTeacher(String institutionID,int page, int sizePerPage);

     ResponseEntity<UserListDTO> getInstitutionStudents(String institutionID,int page, int sizePerPage);

    ResponseEntity<Boolean> addAdmin(String institutionID, String userEmail, Principal principal);

    ResponseEntity<Boolean> addTeacher(String institutionID, String userEmail, Principal principal);

    ResponseEntity<Boolean> addStudent(String institutionID, String userEmail, Principal principal);

    ResponseEntity<Boolean> addUserToMyInstitution(String userEmail, String role, Principal principal);

    ResponseEntity<Boolean> removeUser(String institutionID, String userEmail, Principal principal);
}
