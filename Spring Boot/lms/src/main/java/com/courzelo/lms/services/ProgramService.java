package com.courzelo.lms.services;

import com.courzelo.lms.dto.*;
import com.courzelo.lms.entities.Class;
import com.courzelo.lms.entities.Institution;
import com.courzelo.lms.entities.Program;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.exceptions.ClassNotFoundException;
import com.courzelo.lms.exceptions.ProgramNotFoundException;
import com.courzelo.lms.repositories.ClassRepository;
import com.courzelo.lms.repositories.InstitutionRepository;
import com.courzelo.lms.repositories.ProgramRepository;
import com.courzelo.lms.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProgramService implements IProgramService {
    private final ProgramRepository programRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;
    private final InstitutionRepository institutionRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ResponseEntity<ProgramListDTO> getPrograms(Principal principal,int page, int sizePerPage) {
        log.info("Getting all programs");
        User user = userRepository.findUserByEmail(principal.getName());
        Pageable pageable = PageRequest.of(page, sizePerPage);
        long totalItems = programRepository.count();
        log.info("total programs : " + totalItems);
        int totalPages = (int) Math.ceil((double) totalItems / sizePerPage);
        log.info("total pages : " + totalPages);
        List<ProgramDTO> programDTOS = programRepository.findAllByInstitution(user.getInstitution(),pageable)
                .stream()
                .map(program -> modelMapper.map(program, ProgramDTO.class))
                .toList();
        log.info("programs in page: " + page + " " + programDTOS);
        ProgramListDTO programListDTO = new ProgramListDTO(programDTOS, totalPages);
        return ResponseEntity
                .ok()
                .body(programListDTO);
    }

    @Override
    public ResponseEntity<Boolean> deleteProgram(Principal principal,String programID) {
        log.info("Delete program :" + programID);
        if(isPartOfInstitution(principal,programID)){
            return ResponseEntity.badRequest().body(null);
        }
        Program program = programRepository.findById(programID)
                .orElseThrow(() -> new ProgramNotFoundException("Program " + programID + " not found"));
        if (program != null) {
            Institution institution = program.getInstitution();
            institution.getPrograms().remove(program);
            institutionRepository.save(institution);
            programRepository.deleteById(programID);
            return ResponseEntity.ok().body(true);
        }
        return ResponseEntity.badRequest().body(false);
    }

    @Override
    public ResponseEntity<Boolean> addProgram(Principal principal,ProgramDTO programDTO) {
        log.info("Adding program ");
        User user = userRepository.findUserByEmail(principal.getName());

        Program program = modelMapper.map(programDTO, Program.class);
        program.setInstitution(user.getInstitution());
        Program savedProgram = programRepository.save(program);
        if (savedProgram.getId() != null) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @Override
    public ResponseEntity<Boolean> updateProgram(Principal principal,ProgramDTO programDTO) {
        log.info("Update program :" + programDTO.getId());
        if(isPartOfInstitution(principal,programDTO.getId())){
            return ResponseEntity.badRequest().body(null);
        }
        programRepository.findById(programDTO.getId())
                .orElseThrow(() -> new ProgramNotFoundException("Program " + programDTO.getId() + " not found"));
        Program program = modelMapper.map(programDTO, Program.class);
        Program savedProgram = programRepository.save(program);
        if (savedProgram.getId() != null) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @Override
    public ResponseEntity<ClassListDTO> getProgramClasses(Principal principal,String programID, int page, int sizePerPage) {
        if(isPartOfInstitution(principal,programID)){
            log.info("Not part of institution");
            return ResponseEntity.badRequest().body(null);
        }
         Program program = programRepository.findById(programID)
                 .orElseThrow(()-> new ProgramNotFoundException("Program "+programID+" not found"));

         List<Class> classes = program.getClasses();
        int start = page * sizePerPage;
        int end = Math.min((start + sizePerPage), classes.size());
        List<Class> paginatedClasses = classes.subList(start, end);

        List<ClassDTO> classDTOS = paginatedClasses.stream()
                .map(objClass -> modelMapper.map(objClass, ClassDTO.class))
                .toList();
        log.info("classes in page : " + page + " " + classDTOS);

        Page<ClassDTO> pageResult = new PageImpl<>(classDTOS, PageRequest.of(page, sizePerPage), classDTOS.size());
        log.info("classes total pages : " + pageResult.getTotalPages());

        ClassListDTO classListDTO = new ClassListDTO(classDTOS, pageResult.getTotalPages());
        return ResponseEntity.ok().body(classListDTO);
    }

    @Override
    public ResponseEntity<Boolean> removeClass( String classID, Principal principal) {
        Class classe = classRepository.findById(classID)
                .orElseThrow(()-> new ClassNotFoundException("Class "+classID+" not found"));
        List<User> users = userRepository.findByAClass(classe);
        for (User user : users) {
            user.setAClass(null);
            userRepository.save(user);
        }
        classRepository.delete(classe);
        return ResponseEntity.ok().body(true);
    }

    @Override
    public ResponseEntity<Boolean> addClassToProgram(String program, ClassDTO classe, Principal principal) {
        Program program1 = programRepository.findById(program)
                .orElseThrow(()-> new ProgramNotFoundException("Program "+program+" not found"));
        Class newClass = modelMapper.map(classe, Class.class);
        newClass.setProgram(program1);
        classRepository.save(newClass);
        program1.getClasses().add(newClass);
        programRepository.save(program1);
        return ResponseEntity.ok().body(true);
    }

    private boolean isPartOfInstitution(Principal principal,String programID){
        User user = userRepository.findUserByEmail(principal.getName());
        Program program = programRepository.findById(programID)
                .orElseThrow(()-> new ProgramNotFoundException("Program "+programID+" not found"));
        return user.getInstitution() == program.getInstitution();
    }
}
