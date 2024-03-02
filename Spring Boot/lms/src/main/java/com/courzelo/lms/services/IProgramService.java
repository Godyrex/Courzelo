package com.courzelo.lms.services;

import com.courzelo.lms.dto.ProgramDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IProgramService {
    ResponseEntity<List<ProgramDTO>> getPrograms();

    ResponseEntity<Boolean> deleteProgram(String programID);

    ResponseEntity<Boolean> addProgram(ProgramDTO programDTO);

    ResponseEntity<Boolean> updateProgram(ProgramDTO programDTO);
}
