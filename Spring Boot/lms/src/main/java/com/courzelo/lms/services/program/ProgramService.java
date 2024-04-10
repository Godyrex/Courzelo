package com.courzelo.lms.services.program;

import com.courzelo.lms.dto.program.ClassDTO;
import com.courzelo.lms.dto.program.ClassListDTO;
import com.courzelo.lms.dto.program.ProgramDTO;
import com.courzelo.lms.dto.program.ProgramListDTO;
import com.courzelo.lms.entities.institution.Class;
import com.courzelo.lms.entities.institution.Institution;
import com.courzelo.lms.entities.institution.Program;
import com.courzelo.lms.entities.institution.ProgramType;
import com.courzelo.lms.entities.user.User;
import com.courzelo.lms.exceptions.ClassNotFoundException;
import com.courzelo.lms.exceptions.InstitutionNotFoundException;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProgramService implements IProgramService {
    private final ProgramRepository programRepository;
    private final ClassRepository classRepository;
    private final UserRepository userRepository;
    private final InstitutionRepository institutionRepository;
    private final IClassService iClassService;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ResponseEntity<ProgramListDTO> getPrograms(Principal principal, int page, int sizePerPage) {
        log.info("Getting all programs");
        User user = userRepository.findUserByEmail(principal.getName());

        Pageable pageable = PageRequest.of(page, sizePerPage);

        Page<Program> programPage = programRepository.findAllByInstitution(user.getEducation().getInstitution(), pageable);

        List<ProgramDTO> programDTOS = programPage.getContent()
                .stream()
                .map(program -> modelMapper.map(program, ProgramDTO.class))
                .toList();

        int totalPages = programPage.getTotalPages();
        long totalItems = programPage.getTotalElements();

        log.info("Total programs: " + totalItems);
        log.info("Total pages: " + totalPages);
        log.info("Programs in page " + page + ": " + programDTOS);

        ProgramListDTO programListDTO = new ProgramListDTO(programDTOS, totalPages);
        return ResponseEntity.ok().body(programListDTO);
    }


    @Override
    public ResponseEntity<Boolean> deleteProgram(Principal principal, String programID) {
        log.info("Delete program :" + programID);
        if (isPartOfInstitution(principal, programID)) {
            return ResponseEntity.badRequest().body(null);
        }
        Program program = programRepository.findById(programID)
                .orElseThrow(() -> new ProgramNotFoundException("Program " + programID + " not found"));
        if (program != null) {
            deleteProgramChain(program);
            return ResponseEntity.ok().body(true);
        }
        return ResponseEntity.badRequest().body(false);
    }

    public void deleteProgramChain(Program program) {
        Institution institution = program.getInstitution();
        List<Class> classes = program.getClasses();
        if (classes != null && !classes.isEmpty()) {
            for (Class aClass : classes) {
                iClassService.deleteClass(aClass.getId());
            }
        }
        List<User> users = program.getStudents();
        if (users != null && !users.isEmpty()) {
            for (User user : users) {
                user.getEducation().getPrograms().remove(program);
                userRepository.save(user);
            }
        }
        institution.getPrograms().remove(program);
        institutionRepository.save(institution);
        programRepository.deleteById(program.getId());
    }

    @Override
    public ResponseEntity<Boolean> addProgram(Principal principal, ProgramDTO programDTO) {
        log.info("Adding program ");
        User user = userRepository.findUserByEmail(principal.getName());
        Institution institution = institutionRepository.findById(user.getEducation().getInstitution().getId())
                .orElseThrow(() -> new InstitutionNotFoundException("Institution not found"));
        Program program = modelMapper.map(programDTO, Program.class);
        program.setInstitution(user.getEducation().getInstitution());
        if(program.getProgramType().equals(ProgramType.PUBLIC)){
            program.setSecretKey(generateSecretKey());
        }
        Program savedProgram = programRepository.save(program);
        institution.getPrograms().add(program);
        institutionRepository.save(institution);
        if (savedProgram.getId() != null) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @Override
    public ResponseEntity<Boolean> updateProgram(Principal principal, ProgramDTO programDTO) {
        log.info("Update program :" + programDTO.getId());
        if (isPartOfInstitution(principal, programDTO.getId())) {
            return ResponseEntity.badRequest().body(null);
        }
        Program program = programRepository.findById(programDTO.getId())
                .orElseThrow(() -> new ProgramNotFoundException("Program " + programDTO.getId() + " not found"));
        program.setName(programDTO.getName());
        program.setProgramType(ProgramType.valueOf(programDTO.getProgramType()));
        program.setDescription(programDTO.getDescription());
        if(program.getProgramType().equals(ProgramType.PUBLIC)){
            program.setSecretKey(generateSecretKey());
        }else if(program.getProgramType().equals(ProgramType.PRIVATE)){
            program.setSecretKey(null);
        }
        Program savedProgram = programRepository.save(program);
        if (savedProgram.getId() != null) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @Override
    public ResponseEntity<ClassListDTO> getProgramClasses(Principal principal, String programID, int page, int sizePerPage) {
        if (isPartOfInstitution(principal, programID)) {
            log.info("Not part of institution");
            return ResponseEntity.badRequest().body(null);
        }

        Program program = programRepository.findById(programID)
                .orElseThrow(() -> new ProgramNotFoundException("Program " + programID + " not found"));

        List<Class> classes = program.getClasses();

        // Check if classes list is empty
        if (classes.isEmpty()) {
            log.info("No classes found for program: " + programID);
            return ResponseEntity.ok().body(new ClassListDTO(Collections.emptyList(), 0));
        }

        int totalClasses = classes.size();

        // Calculate pagination indices
        int start = page * sizePerPage;
        int end = Math.min((start + sizePerPage), totalClasses);

        List<Class> paginatedClasses = classes.subList(start, end);

        List<ClassDTO> classDTOS = paginatedClasses.stream()
                .map(objClass -> modelMapper.map(objClass, ClassDTO.class))
                .toList();
        log.info("Classes in page: " + page + " " + classDTOS);

        int totalPages = (int) Math.ceil((double) totalClasses / sizePerPage);

        Page<ClassDTO> pageResult = new PageImpl<>(classDTOS, PageRequest.of(page, sizePerPage), totalClasses);
        log.info("Total pages: " + totalPages);

        ClassListDTO classListDTO = new ClassListDTO(classDTOS, totalPages);
        return ResponseEntity.ok().body(classListDTO);
    }


    @Override
    public ResponseEntity<Boolean> removeClass(String classID, Principal principal) {
        classRepository.findById(classID)
                .orElseThrow(() -> new ClassNotFoundException("Class " + classID + " not found"));
        iClassService.deleteClass(classID);
        return ResponseEntity.ok().body(true);
    }

    @Override
    public ResponseEntity<Boolean> addClassToProgram(String program, ClassDTO classe, Principal principal) {
        Program program1 = programRepository.findById(program)
                .orElseThrow(() -> new ProgramNotFoundException("Program " + program + " not found"));
        Class newClass = modelMapper.map(classe, Class.class);
        newClass.setProgram(program1);
        classRepository.save(newClass);
        program1.getClasses().add(newClass);
        programRepository.save(program1);
        return ResponseEntity.ok().body(true);
    }

    @Override
    public ResponseEntity<HttpStatus> joinProgram(String email, String secretKey) {
        User user = userRepository.findUserByEmail(email);
        Program program = programRepository.findBySecretKey(secretKey);
        if(program==null){
            return ResponseEntity.badRequest().body(HttpStatus.BAD_REQUEST);
        }
        if(program.getProgramType().equals(ProgramType.PUBLIC)){
            if(program.getStudents().contains(user)){
                return ResponseEntity.badRequest().body(HttpStatus.BAD_REQUEST);
            }
            program.getStudents().add(user);
            programRepository.save(program);
            if(user.getEducation().getPrograms().contains(program)){
                return ResponseEntity.badRequest().body(HttpStatus.BAD_REQUEST);
            }
            user.getEducation().getPrograms().add(program);
            userRepository.save(user);
            return ResponseEntity.ok().body(HttpStatus.OK);
        }
        return ResponseEntity.badRequest().body(HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<HttpStatus> leaveProgram(String name, String programID) {
        User user = userRepository.findUserByEmail(name);
        Program program = programRepository.findById(programID)
                .orElseThrow(() -> new ProgramNotFoundException("Program " + programID + " not found"));
        if(program.getStudents().contains(user)){
            program.getStudents().remove(user);
            programRepository.save(program);
            if(user.getEducation().getPrograms().contains(program)){
                user.getEducation().getPrograms().remove(program);
                userRepository.save(user);
                return ResponseEntity.ok().body(HttpStatus.OK);
            }
        }
        return ResponseEntity.badRequest().body(HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<ProgramListDTO> getMyPrograms(String name) {
        User user = userRepository.findUserByEmail(name);
        List<Program> programs = user.getEducation().getPrograms();
        List<ProgramDTO> programDTOS = programs.stream()
                .map(program -> modelMapper.map(program, ProgramDTO.class))
                .toList();
        ProgramListDTO programListDTO = new ProgramListDTO(programDTOS, programs.size());
        return ResponseEntity.ok().body(programListDTO);
    }

    @Override
    public ResponseEntity<ProgramDTO> getProgramByClassID(String classID) {
        Class classe = classRepository.findById(classID)
                .orElseThrow(() -> new ClassNotFoundException("Class " + classID + " not found"));
        Program program = programRepository.findById(classe.getProgram().getId())
                .orElseThrow(() -> new ProgramNotFoundException("Program " + classe.getProgram().getId() + " not found"));
        ProgramDTO programDTO = modelMapper.map(program, ProgramDTO.class);
        return ResponseEntity.ok().body(programDTO);
    }

    private String generateSecretKey() {
        return UUID.randomUUID().toString().substring(0, 6);
    }
    private boolean isPartOfInstitution(Principal principal, String programID) {
        User user = userRepository.findUserByEmail(principal.getName());
        Program program = programRepository.findById(programID)
                .orElseThrow(() -> new ProgramNotFoundException("Program " + programID + " not found"));
        return user.getEducation().getInstitution() == program.getInstitution();
    }
}
