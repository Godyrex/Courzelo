package com.courzelo.lms.services;

import com.courzelo.lms.dto.*;
import com.courzelo.lms.entities.Program;
import org.springframework.http.ResponseEntity;

import java.security.Principal;
import java.util.List;

public interface IProgramService {
    ResponseEntity<ProgramListDTO> getPrograms(Principal principal,int page, int sizePerPage);

    ResponseEntity<Boolean> deleteProgram(Principal principal,String programID);

    ResponseEntity<Boolean> addProgram(Principal principal, ProgramDTO programDTO);
    void deleteProgramChain( Program program);

    ResponseEntity<Boolean> updateProgram(Principal principal,ProgramDTO programDTO);

    ResponseEntity<ClassListDTO> getProgramClasses(Principal principal,String programID, int page, int sizePerPage);

    ResponseEntity<Boolean> removeClass( String classID, Principal principal);

    ResponseEntity<Boolean> addClassToProgram(String program, ClassDTO classe, Principal principal);
}
