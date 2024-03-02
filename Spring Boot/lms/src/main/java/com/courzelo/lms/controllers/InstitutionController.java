package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.InstitutionDTO;
import com.courzelo.lms.dto.InstitutionListDTO;
import com.courzelo.lms.dto.UserDTO;
import com.courzelo.lms.dto.UserListDTO;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.services.IInstitutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

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
        return iInstitutionService.getInstitutions(page,sizePerPage);
    }
    @PostMapping("/add")
    public ResponseEntity<Boolean> addInstitution(@RequestBody InstitutionDTO institutionDTO) {
        return iInstitutionService.addInstitution(institutionDTO);
    }
    @GetMapping("/get/{institutionID}")
    public ResponseEntity<InstitutionDTO> getInstitutionByID(@PathVariable String institutionID) {
        return iInstitutionService.getInstitutionByID(institutionID);
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
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{institutionID}/admins")
    public ResponseEntity<UserListDTO> getInstitutionAdmins(@PathVariable String institutionID, @RequestParam(defaultValue = "0") int page,
                                                            @RequestParam(defaultValue = "2") int sizePerPage) {
        return iInstitutionService.getInstitutionAdmins(institutionID,page,sizePerPage);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{institutionID}/teachers")
    public ResponseEntity<UserListDTO> getInstitutionTeachers(@PathVariable String institutionID,@RequestParam(defaultValue = "0") int page,
                                                                @RequestParam(defaultValue = "2") int sizePerPage) {
        return iInstitutionService.getInstitutionTeacher(institutionID,page,sizePerPage);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{institutionID}/students")
    public ResponseEntity<UserListDTO> getInstitutionStudents(@PathVariable String institutionID,@RequestParam(defaultValue = "0") int page,
                                                                @RequestParam(defaultValue = "2") int sizePerPage) {
        return iInstitutionService.getInstitutionStudents(institutionID,page,sizePerPage);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add/admin/{institutionID}/{userEmail}")
    public ResponseEntity<Boolean> addAdmin(@PathVariable String institutionID, @PathVariable String userEmail,Principal principal) {
        return iInstitutionService.addAdmin(institutionID,userEmail, principal);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add/teacher/{institutionID}/{userEmail}")
    public ResponseEntity<Boolean> addTeacher(@PathVariable String institutionID, @PathVariable String userEmail, Principal principal) {
        return iInstitutionService.addTeacher(institutionID,userEmail, principal);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add/student/{institutionID}/{userEmail}")
    public ResponseEntity<Boolean> addStudent(@PathVariable String institutionID, @PathVariable String userEmail, Principal principal) {
        return iInstitutionService.addStudent(institutionID,userEmail,principal);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add/user/{userEmail}/{role}")
    public ResponseEntity<Boolean> addUserToMyInstitution(@PathVariable String userEmail,@PathVariable String role, Principal principal) {
        return iInstitutionService.addUserToMyInstitution(userEmail,role,principal);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/remove/user/{institutionID}/{userEmail}")
    public ResponseEntity<Boolean> removeUser(@PathVariable String institutionID, @PathVariable String userEmail, Principal principal) {
        return iInstitutionService.removeUser(institutionID,userEmail, principal);
    }
}
