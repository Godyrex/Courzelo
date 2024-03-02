package com.courzelo.lms.services;

import com.courzelo.lms.dto.ProgramDTO;
import com.courzelo.lms.entities.Institution;
import com.courzelo.lms.entities.Program;
import com.courzelo.lms.exceptions.InstitutionNotFoundException;
import com.courzelo.lms.exceptions.ProgramNotFoundException;
import com.courzelo.lms.repositories.ProgramRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProgramService implements IProgramService{
    private final ProgramRepository programRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ResponseEntity<List<ProgramDTO>> getPrograms() {
        log.info("Getting all programs");
        return ResponseEntity
                .ok()
                .body(programRepository.findAll()
                        .stream()
                        .map(programs -> modelMapper.map(programs, ProgramDTO.class))
                        .toList());
    }

    @Override
    public ResponseEntity<Boolean> deleteProgram(String programID) {
        log.info("Delete program :"+programID);
        Program program = programRepository.findById(programID)
                .orElseThrow(()->new ProgramNotFoundException("Program "+programID+" not found"));
        if(program != null) {
            programRepository.deleteById(programID);
            return ResponseEntity.ok().body(true);
        }
        return ResponseEntity.badRequest().body(false);
    }

    @Override
    public ResponseEntity<Boolean> addProgram(ProgramDTO programDTO) {
        log.info("Adding program ");
        Program program = modelMapper.map(programDTO, Program.class);
        Program savedProgram = programRepository.save(program);
        if (savedProgram.getId() != null) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @Override
    public ResponseEntity<Boolean> updateProgram(ProgramDTO programDTO) {
        log.info("Update program :"+programDTO.getId());
        programRepository.findById(programDTO.getId())
                .orElseThrow(()-> new ProgramNotFoundException("Program "+programDTO.getId()+" not found"));
        Program program = modelMapper.map(programDTO, Program.class);
        Program savedProgram = programRepository.save(program);
        if (savedProgram.getId() != null) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }
}
