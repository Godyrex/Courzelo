package com.courzelo.lms.services;

import com.courzelo.lms.dto.ClassDTO;
import com.courzelo.lms.dto.UserDTO;
import com.courzelo.lms.dto.UserListDTO;
import com.courzelo.lms.entities.*;
import com.courzelo.lms.entities.Class;
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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClassService implements IClassService {
    private final ClassRepository classRepository;
    private final UserRepository userRepository;
    private final InstitutionRepository institutionRepository;
    private final ProgramRepository programRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ResponseEntity<List<ClassDTO>> getClasses() {
        log.info("Getting all classes");
        return ResponseEntity
                .ok()
                .body(classRepository.findAll()
                        .stream()
                        .map(classes -> modelMapper.map(classes, ClassDTO.class))
                        .toList());
    }

    @Override
    public ResponseEntity<Boolean> deleteClass(String classID) {
        log.info("Delete CLASS :" + classID);
        Class aClass = classRepository.findById(classID)
                .orElseThrow(() -> new ClassNotFoundException("Class " + classID + " not found"));
        if (aClass != null) {
            removeUsersInClass(classID);
            classRepository.deleteById(classID);
            return ResponseEntity.ok().body(true);
        }
        return ResponseEntity.badRequest().body(false);
    }

    public void removeUsersInClass(String classID) {
        Class aClass = classRepository.findById(classID)
                .orElseThrow(()-> new ClassNotFoundException("Class not found"));
            List<User> users = userRepository.findByStclass(aClass);
            if (!users.isEmpty()) {
                for (User user : users) {
                    user.setStclass(null);
                    userRepository.save(user);
                }
            }
    }

    @Override
    public ResponseEntity<Boolean> addClass(ClassDTO classDTO) {
        log.info("Adding class ");
        Class aClass = modelMapper.map(classDTO, Class.class);
        Class savedClass = classRepository.save(aClass);
        if (savedClass.getId() != null) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @Override
    public ResponseEntity<Boolean> updateClass(ClassDTO classDTO) {
        log.info("Update class :" + classDTO.getId());
        Class aClass =  classRepository.findById(classDTO.getId())
                .orElseThrow(() -> new ClassNotFoundException("Class " + classDTO.getId() + " not found"));
        aClass.setName(classDTO.getName());
        aClass.setCapacity(classDTO.getCapacity());
        Class savedClass = classRepository.save(aClass);
        if (savedClass.getId() != null) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @Override
    public ResponseEntity<UserListDTO> getClassUsers(String classID, Principal principal, String role, int page, int sizePerPage) {
        log.info("role = " + role);
        log.info("page = " + page);
        log.info("sizeperpage = " + sizePerPage);

        User userr = userRepository.findUserByEmail(principal.getName());
        if (userr.getRoles().contains(Role.SUPERADMIN) && classID != null) {
            Class aClass = classRepository.findById(classID)
                    .orElseThrow(() -> new InstitutionNotFoundException("Institution " + userr.getInstitution().getId() + " not found"));
            return getUserListDTOResponseEntity(aClass, principal, role, page, sizePerPage);
        } else if (userr.getInstitution() != null) {
            Class aClass = classRepository.findById(userr.getStclass().getId())
                    .orElseThrow(() -> new InstitutionNotFoundException("Institution " + userr.getInstitution().getId() + " not found"));
            return getUserListDTOResponseEntity(aClass, principal, role, page, sizePerPage);
        }

        return ResponseEntity.badRequest().body(null);
    }

    @Override
    public ResponseEntity<Boolean> addUserToClass(String classID, String userEmail, String role) {
        log.info("Adding user!");

        Class aClass = classRepository.findById(classID)
                .orElseThrow(() -> new ClassNotFoundException("Class " + classID + " not found"));

        User target = userRepository.findUserByEmail(userEmail);
        if (target == null) {
            log.info("User not found!");
            return ResponseEntity.badRequest().body(false);
        }

        Program program = programRepository.findById(aClass.getProgram().getId())
                .orElseThrow(()-> new ProgramNotFoundException("Program Not Found"));

        Institution institution = institutionRepository.findById(program.getInstitution().getId())
                .orElseThrow(()-> new InstitutionNotFoundException("Institution Not found"));

        if (!userInInstitution(target, institution)) {
            log.info("User is not part of the institution!");
            return ResponseEntity.badRequest().body(false);
        }
        if (Objects.equals(role, "Teachers")) {
            if (aClass.getTeachers().contains(target)) {
                log.info("Teacher already added to the class!");
                return ResponseEntity.ok().body(true);
            }
            aClass.getTeachers().add(target);
            target.setStclass(aClass);
            if(!target.getRoles().contains(Role.TEACHER)) {
                target.getRoles().add(Role.TEACHER);
            }
            if(!institution.getTeachers().contains(target)) {
                institution.getTeachers().add(target);
            }
        } else if (Objects.equals(role, "Students")) {
            if (aClass.getStudents().contains(target)) {
                log.info("Student already added to the class!");
                return ResponseEntity.ok().body(true);
            }
            aClass.getStudents().add(target);
            target.setStclass(aClass);
            if(!target.getRoles().contains(Role.STUDENT)) {
                target.getRoles().add(Role.STUDENT);
            }
            if(!institution.getStudents().contains(target)) {
                institution.getStudents().add(target);
            }
        }
        userRepository.save(target);
        institutionRepository.save(institution);
        classRepository.save(aClass);

        log.info("User added to the class!");
        return ResponseEntity.ok().body(true);
    }



    @Override
    public ResponseEntity<Boolean> removeUser(String classID, String userEmail) {
        log.info("removing user !");
        User user = userRepository.findUserByEmail(userEmail);
        if (user == null) {
            return ResponseEntity.badRequest().body(false);
        }
        Class aClass = classRepository.findById(classID)
                .orElseThrow(() -> new ClassNotFoundException("Class " + classID + " not found"));
        if (aClass.getTeachers().contains(user)) {
            aClass.getTeachers().remove(user);
            user.setStclass(null);
            user.getRoles().remove(Role.TEACHER);
            classRepository.save(aClass);
            userRepository.save(user);
            return ResponseEntity.ok().body(true);
        }
        if (aClass.getStudents().contains(user)) {
            aClass.getStudents().remove(user);
            user.setStclass(null);
            user.getRoles().remove(Role.STUDENT);
            classRepository.save(aClass);
            userRepository.save(user);
            return ResponseEntity.ok().body(true);
        }

        return ResponseEntity.badRequest().body(false);
    }

    @Override
    public boolean userInInstitution(User user, Institution institution) {
        if(user.getInstitution()!= null) {
            log.info("user institution id = " + user.getInstitution().getId());
            log.info("institution id = " + institution.getId());

            return Objects.equals(user.getInstitution().getId(), institution.getId());
        }
        return false;
    }

    private ResponseEntity<UserListDTO> getUserListDTOResponseEntity(Class aClass, Principal principal, String role, int page, int sizePerPage) {

        log.info("Getting aClass Users: " + aClass.getId());
        List<User> users;
        if (Objects.equals(role, "Students")) {
            users = aClass.getStudents();
        } else {
            users = aClass.getTeachers();
        }

        int start = page * sizePerPage;
        int end = Math.min((start + sizePerPage), users.size());
        List<User> paginatedUsers = users.subList(start, end);

        List<UserDTO> userDTOs = paginatedUsers.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();
        log.info("users in page : " + page + " " + userDTOs);

        Page<UserDTO> pageResult = new PageImpl<>(userDTOs, PageRequest.of(page, sizePerPage), users.size());
        log.info("users total pages : " + pageResult.getTotalPages());

        UserListDTO userListDTO = new UserListDTO(userDTOs, pageResult.getTotalPages());
        return ResponseEntity.ok().body(userListDTO);
    }
}
