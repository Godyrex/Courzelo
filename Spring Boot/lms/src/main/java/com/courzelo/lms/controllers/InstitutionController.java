package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.program.CalendarDTO;
import com.courzelo.lms.dto.program.InstitutionDTO;
import com.courzelo.lms.dto.program.InstitutionListDTO;
import com.courzelo.lms.dto.program.InstitutionUsersCountDTO;
import com.courzelo.lms.dto.user.UserListDTO;
import com.courzelo.lms.services.program.IInstitutionService;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/v1/institution")
@RestController
@RequiredArgsConstructor
@RateLimiter(name = "backend")
public class InstitutionController {
    private final IInstitutionService iInstitutionService;

    @PreAuthorize("hasRole('SUPERADMIN')")
    @GetMapping("/all")
    @Cacheable(value = "InstitutionList", key = "#page + '-' + #sizePerPage")
    public ResponseEntity<InstitutionListDTO> getInstitutions(@RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "2") int sizePerPage) {
        return iInstitutionService.getInstitutions(page, sizePerPage);
    }

    @PreAuthorize("hasRole('SUPERADMIN')")
    @PostMapping("/add")
    @CacheEvict(value = "InstitutionList", allEntries = true)
    public ResponseEntity<Boolean> addInstitution(@RequestBody InstitutionDTO institutionDTO) {
        return iInstitutionService.addInstitution(institutionDTO);
    }

    @PreAuthorize("hasRole('SUPERADMIN')")
    @GetMapping("/get/{institutionID}")
    public ResponseEntity<InstitutionDTO> getInstitutionByID(@PathVariable String institutionID) {
        return iInstitutionService.getInstitutionByID(institutionID);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getMyInstitution")
    @Cacheable(value = "MyInstitution", key = "#principal.name")
    public ResponseEntity<InstitutionDTO> getMyInstitution(Principal principal) {
        return iInstitutionService.getMyInstitution(principal);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/")
    public ResponseEntity<InstitutionDTO> getInstitutionForAdmin(Principal principal) {
        return iInstitutionService.getInstitution(principal.getName());
    }

    @PreAuthorize("hasRole('SUPERADMIN')")
    @DeleteMapping("/{institutionID}")
    @CacheEvict(value = "InstitutionList", allEntries = true)
    public ResponseEntity<Boolean> deleteInstitution(@PathVariable String institutionID) {
        return iInstitutionService.deleteInstitution(institutionID);
    }

    @PostMapping("/update")
    @CacheEvict(value = {"InstitutionList"}, allEntries = true)
    public ResponseEntity<Boolean> updateInstitution(@RequestBody InstitutionDTO institutionDTO) {
        return iInstitutionService.updateInstitution(institutionDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/updateMine")
    @CacheEvict(value = "MyInstitution", key = "#principal.name")
    public ResponseEntity<Boolean> updateMyInstitution(@RequestBody InstitutionDTO institutionDTO, Principal principal) {
        return iInstitutionService.updateMyInstitution(institutionDTO, principal);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getInstitutionUsers/{role}")
    @Cacheable(value = "InstitutionUsers", key = "#page + '-' + #sizePerPage + '-' + #role")
    public ResponseEntity<UserListDTO> getInstitutionUsers(@RequestParam(required = false) String institutionID,
                                                           Principal principal,
                                                           @PathVariable String role,
                                                           @RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "2") int sizePerPage) {

        return iInstitutionService.getInstitutionUsers(institutionID, principal, role, page, sizePerPage);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERADMIN')")
    @PostMapping("/add/user/{userEmail}/{role}")
    @CacheEvict(value = {"InstitutionUsers"}, allEntries = true)
    public ResponseEntity<Boolean> addUserToInstitution(@RequestParam(required = false) String institutionID, @PathVariable String userEmail, @PathVariable String role, Principal principal) {
        return iInstitutionService.addUserToInstitution(institutionID, userEmail, role, principal);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERADMIN')")
    @PostMapping("/remove/user/{institutionID}/{userEmail}")
    @CacheEvict(value = {"InstitutionUsers"}, allEntries = true)
    public ResponseEntity<Boolean> removeUser(@PathVariable String institutionID, @PathVariable String userEmail, Principal principal) {
        return iInstitutionService.removeUser(institutionID, userEmail, principal);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERADMIN')")
    @PostMapping("/remove/user/{userEmail}")
    @CacheEvict(value = {"InstitutionUsers"}, allEntries = true)
    public ResponseEntity<Boolean> removeUserFromInstitution(@RequestParam(required = false) String institutionID, @PathVariable String userEmail, Principal principal) {
        return iInstitutionService.removeUser(institutionID, userEmail, principal);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/countUsers")
    public ResponseEntity<InstitutionUsersCountDTO> countUsers(Principal principal) {
        return iInstitutionService.countUsers(principal);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/generateExcel")
    public ResponseEntity<HttpStatus> generateExcel(@RequestBody List<CalendarDTO> events) {
        return iInstitutionService.generateExcel(events);
    }
}
