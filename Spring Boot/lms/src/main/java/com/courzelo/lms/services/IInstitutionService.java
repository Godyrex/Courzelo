package com.courzelo.lms.services;


import com.courzelo.lms.dto.InstitutionDTO;
import com.courzelo.lms.dto.InstitutionListDTO;
import com.courzelo.lms.dto.InstitutionUsersCountDTO;
import com.courzelo.lms.dto.UserListDTO;
import org.springframework.http.ResponseEntity;

import java.security.Principal;

public interface IInstitutionService {
    ResponseEntity<InstitutionListDTO> getInstitutions(int page, int sizePerPage);

    ResponseEntity<InstitutionDTO> getInstitutionByID(String institutionID);

    ResponseEntity<InstitutionDTO> getInstitution(String email);

    ResponseEntity<Boolean> deleteInstitution(String institutionID);

    ResponseEntity<Boolean> addInstitution(InstitutionDTO institutionDTO);

    ResponseEntity<Boolean> updateInstitution(InstitutionDTO institutionDTO);

    ResponseEntity<Boolean> addUserToInstitution(String institutionID, String userEmail, String role, Principal principal);

    ResponseEntity<Boolean> removeUser(String institutionID, String userEmail, Principal principal);

    ResponseEntity<Boolean> updateMyInstitution(InstitutionDTO institutionDTO, Principal principal);

    ResponseEntity<InstitutionUsersCountDTO> countUsers(Principal principal);

    ResponseEntity<UserListDTO> getInstitutionUsers(String institutionID, Principal principal, String role, int page, int sizePerPage);

    ResponseEntity<InstitutionDTO> getMyInstitution(Principal principal);
}
