package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.program.ClassDTO;
import com.courzelo.lms.dto.program.ClassListDTO;
import com.courzelo.lms.dto.program.ProgramDTO;
import com.courzelo.lms.dto.program.ProgramListDTO;
import com.courzelo.lms.services.program.IProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/v1/program")
@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class ProgramController {
    private final IProgramService iProgramService;

    @PostMapping("/add")
    public ResponseEntity<Boolean> addProgram(Principal principal, @RequestBody ProgramDTO programDTO) {
        return iProgramService.addProgram(principal, programDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<ProgramListDTO> getPrograms(Principal principal, @RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "2") int sizePerPage) {
        return iProgramService.getPrograms(principal, page, sizePerPage);
    }

    @DeleteMapping("/delete/{programID}")
    public ResponseEntity<Boolean> deleteProgram(Principal principal, @PathVariable String programID) {
        return iProgramService.deleteProgram(principal, programID);
    }

    @PostMapping("/update")
    public ResponseEntity<Boolean> updateProgram(Principal principal, @RequestBody ProgramDTO programDTO) {
        return iProgramService.updateProgram(principal, programDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getProgramClasses")
    public ResponseEntity<ClassListDTO> getProgramClasses(Principal principal,
                                                          @RequestParam() String program,
                                                          @RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "2") int sizePerPage) {

        return iProgramService.getProgramClasses(principal, program, page, sizePerPage);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add/class")
    public ResponseEntity<Boolean> addUserToInstitution(@RequestParam() String program, @RequestBody ClassDTO classe, Principal principal) {
        return iProgramService.addClassToProgram(program, classe, principal);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/remove/class/{classID}")
    public ResponseEntity<Boolean> removeClass(@PathVariable String classID, Principal principal) {
        return iProgramService.removeClass(classID, principal);
    }
}
