package com.courzelo.lms.services;


import com.courzelo.lms.dto.InstitutionDTO;
import com.courzelo.lms.dto.InstitutionListDTO;
import com.courzelo.lms.dto.UserDTO;
import com.courzelo.lms.dto.UserListDTO;
import com.courzelo.lms.entities.Institution;
import com.courzelo.lms.entities.Role;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.exceptions.InstitutionNotFoundException;
import com.courzelo.lms.repositories.InstitutionRepository;
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
import org.springframework.web.util.pattern.PathPattern;

import java.security.Principal;
import java.util.List;
@Service
@RequiredArgsConstructor
@Slf4j
public class InstitutionService implements IInstitutionService {
    private final InstitutionRepository institutionRepository;
    private final UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ResponseEntity<InstitutionListDTO> getInstitutions(int page, int sizePerPage) {
        log.info("Getting all institutions");
        Pageable pageable = PageRequest.of(page,sizePerPage);
        long totalItems = institutionRepository.count();
        log.info("total institutions : "+String.valueOf(totalItems));
        int totalPages = (int) Math.ceil((double) totalItems / sizePerPage);
        log.info("total pages : "+String.valueOf(totalPages));
        List<InstitutionDTO> institutionDTO = institutionRepository.findAll(pageable)
                .stream()
                .map(institution -> modelMapper.map(institution, InstitutionDTO.class))
                        .toList();
        log.info("institutions in page: "+String.valueOf(page) +" "+institutionDTO);
        InstitutionListDTO institutionListDTO = new InstitutionListDTO(institutionDTO,totalPages);
        return ResponseEntity
                .ok()
                .body(institutionListDTO);
    }

    @Override
    public ResponseEntity<InstitutionDTO> getInstitutionByID(String institutionID) {
        log.info("Get institution by id :"+institutionID);
        Institution institution = institutionRepository.findById(institutionID)
                .orElseThrow(()-> new InstitutionNotFoundException("Institution "+institutionID+" not found"));
        return ResponseEntity
                .ok()
                .body(modelMapper.map(institution,InstitutionDTO.class));
    }

    @Override
    public ResponseEntity<InstitutionDTO> getInstitution(String email) {
        log.info("Get institution for user :"+email);
        User user = userRepository.findUserByEmail(email);
        if(user != null && user.getInstitution()!= null){
            if (user.getRoles().contains(Role.ADMIN)) {
                return ResponseEntity.ok().body(modelMapper.map(user.getInstitution(), InstitutionDTO.class));
            } else {
                InstitutionDTO simplifiedDTO = new InstitutionDTO();
                simplifiedDTO.setId(user.getInstitution().getId());
                simplifiedDTO.setName(user.getInstitution().getName());
                simplifiedDTO.setDescription(user.getInstitution().getDescription());
                simplifiedDTO.setLocation(user.getInstitution().getLocation());
                simplifiedDTO.setWebsite(user.getInstitution().getWebsite());
                return ResponseEntity.ok().body(simplifiedDTO);
            }
        }
        return null;
    }

    @Override
    public ResponseEntity<Boolean> deleteInstitution(String institutionID) {
        log.info("Delete institution :"+institutionID);
        Institution institution = institutionRepository.findById(institutionID)
                .orElseThrow(()-> new InstitutionNotFoundException("Institution "+institutionID+" not found"));
        if(institution != null) {
            institutionRepository.deleteById(institutionID);
            return ResponseEntity.ok().body(true);
        }
        return ResponseEntity.badRequest().body(false);
    }

    @Override
    public ResponseEntity<Boolean> addInstitution(InstitutionDTO institutionDTO) {
        log.info("Adding institution ");
        Institution institution = modelMapper.map(institutionDTO, Institution.class);
        Institution savedInstitution = institutionRepository.save(institution);

        if (savedInstitution.getId() != null) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @Override
    public ResponseEntity<Boolean> updateInstitution(InstitutionDTO institutionDTO) {
        log.info("Update institution :"+institutionDTO.getId());
        institutionRepository.findById(institutionDTO.getId())
                .orElseThrow(()-> new InstitutionNotFoundException("Institution "+institutionDTO.getId()+" not found"));
        Institution institution = modelMapper.map(institutionDTO, Institution.class);
        Institution savedInstitution = institutionRepository.save(institution);

        if (savedInstitution.getId() != null) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @Override
    public ResponseEntity<UserListDTO> getInstitutionAdmins(String institutionID,int page, int sizePerPage) {
        log.info("Getting institution Admins: " + institutionID);

        Institution institution = institutionRepository.findById(institutionID)
                .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionID + " not found"));

        List<User> admins = institution.getAdmins();

        int start = page * sizePerPage;
        int end = Math.min((start + sizePerPage), admins.size());
        List<User> paginatedAdmins = admins.subList(start, end);

        List<UserDTO> userDTOs = paginatedAdmins.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();

        Page<UserDTO> pageResult = new PageImpl<>(userDTOs, PageRequest.of(page, sizePerPage), admins.size());

        UserListDTO userListDTO = new UserListDTO(userDTOs, pageResult.getTotalPages());
        return ResponseEntity.ok().body(userListDTO);
    }

    @Override
    public ResponseEntity<UserListDTO> getInstitutionTeacher(String institutionID,int page, int sizePerPage) {
        log.info("Getting institution teachers: " + institutionID);

        Institution institution = institutionRepository.findById(institutionID)
                .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionID + " not found"));

        List<User> teachers = institution.getTeachers();

        int start = page * sizePerPage;
        int end = Math.min((start + sizePerPage), teachers.size());
        List<User> paginatedTeachers = teachers.subList(start, end);

        List<UserDTO> userDTOs = paginatedTeachers.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();

        Page<UserDTO> pageResult = new PageImpl<>(userDTOs, PageRequest.of(page, sizePerPage), teachers.size());

        UserListDTO userListDTO = new UserListDTO(userDTOs, pageResult.getTotalPages());
        return ResponseEntity.ok().body(userListDTO);
    }

    @Override
    public ResponseEntity<UserListDTO> getInstitutionStudents(String institutionID,int page, int sizePerPage) {
        log.info("Getting institution Students: " + institutionID);

        Institution institution = institutionRepository.findById(institutionID)
                .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionID + " not found"));

        List<User> students = institution.getStudents();

        int start = page * sizePerPage;
        int end = Math.min((start + sizePerPage), students.size());
        List<User> paginatedStudents = students.subList(start, end);

        List<UserDTO> userDTOs = paginatedStudents.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();
        log.info("Students in page : "+page+" " + userDTOs);

        Page<UserDTO> pageResult = new PageImpl<>(userDTOs, PageRequest.of(page, sizePerPage), students.size());
        log.info("Students total pages : "+pageResult.getTotalPages());

        UserListDTO userListDTO = new UserListDTO(userDTOs, pageResult.getTotalPages());
        return ResponseEntity.ok().body(userListDTO);
    }

    @Override
    public ResponseEntity<Boolean> addAdmin(String institutionID, String userEmail, Principal principal) {
        log.info("Adding Admin: " + institutionID + " " + userEmail);
        if(!isAdminInInstitution(principal,institutionID)){
            log.info("Not authorized to manage this institution");
            return ResponseEntity.badRequest().body(false);
        }
        Institution institution = institutionRepository.findById(institutionID)
                .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionID + " not found"));

        User user = userRepository.findUserByEmail(userEmail);

        if (user != null && institution != null) {
            if (!user.getRoles().contains(Role.ADMIN)) {
                user.getRoles().add(Role.ADMIN);
            }
            if (!institution.getAdmins().contains(user) && user.getInstitution() == null) {
                institution.getAdmins().add(user);
                user.setInstitution(institution);
                userRepository.save(user);
                institutionRepository.save(institution);
                log.info("Admin added !");
                return ResponseEntity.ok().body(true);
            } else if (institution.getAdmins().contains(user)) {
                log.info("Admin already added !");
                return ResponseEntity.ok().body(true);
            } else {
                log.warn("Error adding admin!");
                return ResponseEntity.badRequest().body(false);
            }
        } else {
            log.warn("Error adding admin!");
            return ResponseEntity.badRequest().body(false);
        }
    }


    @Override
    public ResponseEntity<Boolean> addTeacher(String institutionID, String userEmail, Principal principal) {
        log.info("Adding Teacher: " + institutionID + " " + userEmail);
        if(!isAdminInInstitution(principal,institutionID)){
            log.info("Not authorized to manage this institution");
            return ResponseEntity.badRequest().body(false);
        }

        Institution institution = institutionRepository.findById(institutionID)
                .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionID + " not found"));

        User user = userRepository.findUserByEmail(userEmail);

        if (user != null && institution != null) {
            if (!user.getRoles().contains(Role.TEACHER)) {
                user.getRoles().add(Role.TEACHER);
            }
            if (!institution.getTeachers().contains(user) && user.getInstitution() == null) {
                institution.getTeachers().add(user);
                user.setInstitution(institution);
                userRepository.save(user);
                institutionRepository.save(institution);
                log.info("Teacher added !");
                return ResponseEntity.ok().body(true);
            } else if (institution.getTeachers().contains(user)) {
                log.info("Teacher already added !");
                return ResponseEntity.ok().body(true);
            } else {
                log.warn("Error adding teacher!");
                return ResponseEntity.badRequest().body(false);
            }
        } else {
            log.warn("Error adding teacher!");
            return ResponseEntity.badRequest().body(false);
        }
    }


    @Override
    public ResponseEntity<Boolean> addStudent(String institutionID, String userEmail, Principal principal) {
        log.info("Adding Student: " + institutionID + " " + userEmail);
        if(!isAdminInInstitution(principal,institutionID)){
            log.info("Not authorized to manage this institution");
            return ResponseEntity.badRequest().body(false);
        }
        Institution institution = institutionRepository.findById(institutionID)
                .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionID + " not found"));

        User user = userRepository.findUserByEmail(userEmail);

        if (user != null && institution != null) {
            if (!user.getRoles().contains(Role.STUDENT)) {
                user.getRoles().add(Role.STUDENT);
            }
            if (!institution.getStudents().contains(user) && user.getInstitution() == null) {
                institution.getStudents().add(user);
                user.setInstitution(institution);
                userRepository.save(user);
                institutionRepository.save(institution);
                log.info("Student added !");
                return ResponseEntity.ok().body(true);
            } else if (institution.getStudents().contains(user)) {
                log.info("Student already added !");
                return ResponseEntity.ok().body(true);
            } else {
                log.warn("Error adding student!");
                return ResponseEntity.badRequest().body(false);
            }
        } else {
            log.warn("Error adding student!");
            return ResponseEntity.badRequest().body(false);
        }
    }

    @Override
    public ResponseEntity<Boolean> addUserToMyInstitution(String userEmail, String role, Principal principal) {
        User user = userRepository.findUserByEmail(principal.getName());
        if( user.getInstitution() == null){
            return ResponseEntity.badRequest().body(false);
        }
        if(!isAdminInInstitution(principal,user.getInstitution().getId())){
            log.info("Not authorized to manage this institution");
            return ResponseEntity.badRequest().body(false);
        }
        Institution institution = institutionRepository.findById(user.getId())
                .orElseThrow(()->new InstitutionNotFoundException("Institution " + user.getInstitution() + " not found"));
        User target = userRepository.findUserByEmail(userEmail);
        if(target != null) {
            switch (role) {
                case "ADMIN":
                    if (!institution.getAdmins().contains(target) && target.getInstitution() == null) {
                        institution.getAdmins().add(target);
                        target.setInstitution(institution);
                        target.getRoles().add(Role.ADMIN);
                        userRepository.save(target);
                        institutionRepository.save(institution);
                        log.info("Admin added !");
                        return ResponseEntity.ok().body(true);
                    } else if (institution.getAdmins().contains(target)) {
                        log.info("Admin already added !");
                        return ResponseEntity.ok().body(true);
                    }
                    break;
                case "TEACHER":
                    if (!institution.getTeachers().contains(target) && target.getInstitution() == null) {
                        institution.getTeachers().add(target);
                        target.setInstitution(institution);
                        target.getRoles().add(Role.TEACHER);
                        userRepository.save(target);
                        institutionRepository.save(institution);
                        log.info("teacher added !");
                        return ResponseEntity.ok().body(true);
                    } else if (institution.getTeachers().contains(target)) {
                        log.info("teacher already added !");
                        return ResponseEntity.ok().body(true);
                    }
                    break;
                case "STUDENT":
                    if (!institution.getStudents().contains(target) && target.getInstitution() == null) {
                        institution.getStudents().add(target);
                        target.setInstitution(institution);
                        target.getRoles().add(Role.STUDENT);
                        userRepository.save(target);
                        institutionRepository.save(institution);
                        log.info("Student added !");
                        return ResponseEntity.ok().body(true);
                    } else if (institution.getStudents().contains(target)) {
                        log.info("Student already added !");
                        return ResponseEntity.ok().body(true);
                    }
                    break;
                default:
                    ResponseEntity.badRequest().body(false);
                    break;
            }

        }
        return ResponseEntity.badRequest().body(false);
    }

    @Override
    public ResponseEntity<Boolean> removeUser(String institutionID, String userEmail, Principal principal) {
        if(!isAdminInInstitution(principal,institutionID)){
            log.info("Not authorized to manage this institution");
            return ResponseEntity.badRequest().body(false);
        }
        User user = userRepository.findUserByEmail(userEmail);
        Institution institution = institutionRepository.findById(institutionID)
                .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionID + " not found"));
                if(user!= null){
                    if(institution.getAdmins().contains(user)){
                        institution.getAdmins().remove(user);
                        user.setInstitution(null);
                        user.getRoles().remove(Role.ADMIN);
                        institutionRepository.save(institution);
                        userRepository.save(user);
                        return ResponseEntity.ok().body(true);
                    }
                    if(institution.getTeachers().contains(user)){
                        institution.getTeachers().remove(user);
                        user.setInstitution(null);
                        user.getRoles().remove(Role.TEACHER);
                        institutionRepository.save(institution);
                        userRepository.save(user);
                        return ResponseEntity.ok().body(true);
                    }
                    if(institution.getStudents().contains(user)){
                        institution.getStudents().remove(user);
                        user.setInstitution(null);
                        user.getRoles().remove(Role.STUDENT);
                        institutionRepository.save(institution);
                        userRepository.save(user);
                        return ResponseEntity.ok().body(true);
                    }
                };
                return ResponseEntity.badRequest().body(false);
    }

    private boolean isAdminInInstitution(Principal principal,String institutionID){
        User user = userRepository.findUserByEmail(principal.getName());
        Institution institution = institutionRepository.findById(institutionID)
                .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionID + " not found"));
        return institution.getAdmins().contains(user) || user.getRoles().contains(Role.SUPERADMIN);
    }


}
