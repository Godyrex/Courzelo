package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.ProgramDTO;
import com.courzelo.lms.services.IProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/v1/program")
@RestController
@RequiredArgsConstructor
public class ProgramController {
    private final IProgramService iProgramService;

    @PostMapping("/add")
    public ResponseEntity<Boolean> addProgram(ProgramDTO programDTO) {
        return iProgramService.addProgram(programDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProgramDTO>> getPrograms() {
        return iProgramService.getPrograms();
    }

    @DeleteMapping("/delete/{institutionID}")
    public ResponseEntity<Boolean> deleteProgram(@PathVariable String institutionID) {
        return iProgramService.deleteProgram(institutionID);
    }

    @PostMapping("/update")
    public ResponseEntity<Boolean> updateProgram(ProgramDTO programDTO) {
        return iProgramService.updateProgram(programDTO);
    }
}
