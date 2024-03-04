package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.InstitutionDTO;
import com.courzelo.lms.dto.InstitutionListDTO;
import com.courzelo.lms.dto.InstitutionUsersCountDTO;
import com.courzelo.lms.dto.UserListDTO;
import com.courzelo.lms.services.IInstitutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/v1/institution")
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('SUPERADMIN')")
public class InstitutionController {
    private final IInstitutionService iInstitutionService;

    @GetMapping("/all")
    public ResponseEntity<InstitutionListDTO> getInstitutions(@RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "2") int sizePerPage) {
        return iInstitutionService.getInstitutions(page, sizePerPage);
    }

    @PostMapping("/add")
    public ResponseEntity<Boolean> addInstitution(@RequestBody InstitutionDTO institutionDTO) {
        return iInstitutionService.addInstitution(institutionDTO);
    }

    @GetMapping("/get/{institutionID}")
    public ResponseEntity<InstitutionDTO> getInstitutionByID(@PathVariable String institutionID) {
        return iInstitutionService.getInstitutionByID(institutionID);
    }

    @GetMapping("/getMyInstitution")
    public ResponseEntity<InstitutionDTO> getMyInstitution(Principal principal) {
        return iInstitutionService.getMyInstitution(principal);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/")
    public ResponseEntity<InstitutionDTO> getInstitutionForAdmin(Principal principal) {
        return iInstitutionService.getInstitution(principal.getName());
    }

    @DeleteMapping("/{institutionID}")
    public ResponseEntity<Boolean> deleteInstitution(@PathVariable String institutionID) {
        return iInstitutionService.deleteInstitution(institutionID);
    }

    @PostMapping("/update")
    public ResponseEntity<Boolean> updateInstitution(@RequestBody InstitutionDTO institutionDTO) {
        return iInstitutionService.updateInstitution(institutionDTO);
    }

    @PostMapping("/updateMine")
    public ResponseEntity<Boolean> updateMyInstitution(@RequestBody InstitutionDTO institutionDTO, Principal principal) {
        return iInstitutionService.updateMyInstitution(institutionDTO, principal);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getInstitutionUsers/{role}")
    public ResponseEntity<UserListDTO> getInstitutionUsers(@RequestParam(required = false) String institutionID,
                                                           Principal principal,
                                                           @PathVariable String role,
                                                           @RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "2") int sizePerPage) {

        return iInstitutionService.getInstitutionUsers(institutionID, principal, role, page, sizePerPage);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add/user/{userEmail}/{role}")
    public ResponseEntity<Boolean> addUserToInstitution(@RequestParam(required = false) String institutionID, @PathVariable String userEmail, @PathVariable String role, Principal principal) {
        return iInstitutionService.addUserToInstitution(institutionID, userEmail, role, principal);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/remove/user/{institutionID}/{userEmail}")
    public ResponseEntity<Boolean> removeUser(@PathVariable String institutionID, @PathVariable String userEmail, Principal principal) {
        return iInstitutionService.removeUser(institutionID, userEmail, principal);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/remove/user/{userEmail}")
    public ResponseEntity<Boolean> removeUserFromInstitution(@RequestParam(required = false) String institutionID, @PathVariable String userEmail, Principal principal) {
        return iInstitutionService.removeUser(institutionID, userEmail, principal);
    }

    @GetMapping("/countUsers")
    public ResponseEntity<InstitutionUsersCountDTO> countUsers(Principal principal) {
        return iInstitutionService.countUsers(principal);
    }
}
