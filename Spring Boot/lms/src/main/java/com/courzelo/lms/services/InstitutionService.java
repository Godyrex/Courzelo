package com.courzelo.lms.services;


import com.courzelo.lms.dto.*;
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

import java.security.Principal;
import java.util.List;
import java.util.Objects;

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
        Pageable pageable = PageRequest.of(page, sizePerPage);
        long totalItems = institutionRepository.count();
        log.info("total institutions : " + String.valueOf(totalItems));
        int totalPages = (int) Math.ceil((double) totalItems / sizePerPage);
        log.info("total pages : " + String.valueOf(totalPages));
        List<InstitutionDTO> institutionDTO = institutionRepository.findAll(pageable)
                .stream()
                .map(institution -> modelMapper.map(institution, InstitutionDTO.class))
                .toList();
        log.info("institutions in page: " + String.valueOf(page) + " " + institutionDTO);
        InstitutionListDTO institutionListDTO = new InstitutionListDTO(institutionDTO, totalPages);
        return ResponseEntity
                .ok()
                .body(institutionListDTO);
    }

    @Override
    public ResponseEntity<InstitutionDTO> getInstitutionByID(String institutionID) {
        log.info("Get institution by id :" + institutionID);
        Institution institution = institutionRepository.findById(institutionID)
                .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionID + " not found"));
        return ResponseEntity
                .ok()
                .body(modelMapper.map(institution, InstitutionDTO.class));
    }

    @Override
    public ResponseEntity<InstitutionDTO> getInstitution(String email) {
        log.info("Get institution for user :" + email);
        User user = userRepository.findUserByEmail(email);
        if (user != null && user.getInstitution() != null) {
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
        log.info("Delete institution :" + institutionID);
        Institution institution = institutionRepository.findById(institutionID)
                .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionID + " not found"));
        if (institution != null) {
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
        log.info("Update institution :" + institutionDTO.getId());
        institutionRepository.findById(institutionDTO.getId())
                .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionDTO.getId() + " not found"));
        Institution institution = modelMapper.map(institutionDTO, Institution.class);
        Institution savedInstitution = institutionRepository.save(institution);

        if (savedInstitution.getId() != null) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }


    @Override
    public ResponseEntity<Boolean> addUserToInstitution(String institutionID, String userEmail, String role, Principal principal) {
        User user = userRepository.findUserByEmail(principal.getName());
        if (user.getInstitution() == null) {
            return ResponseEntity.badRequest().body(false);
        }

        User target = userRepository.findUserByEmail(userEmail);
        if (user.getRoles().contains(Role.SUPERADMIN) && institutionID != null) {
            Institution institution = institutionRepository.findById(institutionID)
                    .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionID + " not found"));
            if (!isAdminInInstitution(principal, institutionID)) {
                log.info("Not authorized to manage this institution");
                return ResponseEntity.badRequest().body(false);
            }
            return getResponseEntity(role, target, institution);
        } else {
            Institution institution = institutionRepository.findById(user.getInstitution().getId())
                    .orElseThrow(() -> new InstitutionNotFoundException("Institution " + user.getInstitution().getId() + " not found"));
            if (!isAdminInInstitution(principal, institution.getId())) {
                log.info("Not authorized to manage this institution");
                return ResponseEntity.badRequest().body(false);
            }
            return getResponseEntity(role, target, institution);
        }
    }

    private ResponseEntity<Boolean> getResponseEntity(String role, User target, Institution institution) {
        if (target != null) {
            switch (role) {
                case "Admins":
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
                case "Teachers":
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
                case "Students":
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

        User user = userRepository.findUserByEmail(userEmail);
        if (user == null) {
            return ResponseEntity.badRequest().body(false);
        }
        Institution institution;
        if (user.getRoles().contains(Role.SUPERADMIN) && institutionID != null) {
            institution = institutionRepository.findById(institutionID)
                    .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionID + " not found"));
            if (!isAdminInInstitution(principal, institutionID)) {
                log.info("Not authorized to manage this institution");
                return ResponseEntity.badRequest().body(false);
            }
        } else {
            institution = institutionRepository.findById(user.getInstitution().getId())
                    .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionID + " not found"));
            if (!isAdminInInstitution(principal, institution.getId())) {
                log.info("Not authorized to manage this institution");
                return ResponseEntity.badRequest().body(false);
            }
        }

        if (institution.getAdmins().contains(user)) {
            institution.getAdmins().remove(user);
            user.setInstitution(null);
            user.getRoles().remove(Role.ADMIN);
            institutionRepository.save(institution);
            userRepository.save(user);
            return ResponseEntity.ok().body(true);
        }
        if (institution.getTeachers().contains(user)) {
            institution.getTeachers().remove(user);
            user.setInstitution(null);
            user.getRoles().remove(Role.TEACHER);
            institutionRepository.save(institution);
            userRepository.save(user);
            return ResponseEntity.ok().body(true);
        }
        if (institution.getStudents().contains(user)) {
            institution.getStudents().remove(user);
            user.setInstitution(null);
            user.getRoles().remove(Role.STUDENT);
            institutionRepository.save(institution);
            userRepository.save(user);
            return ResponseEntity.ok().body(true);
        }

        return ResponseEntity.badRequest().body(false);
    }

    @Override
    public ResponseEntity<Boolean> updateMyInstitution(InstitutionDTO institutionDTO, Principal principal) {
        log.info("Update institution :" + institutionDTO.getId());
        User user = userRepository.findUserByEmail(principal.getName());
        if (user != null && user.getInstitution() != null) {

            Institution institution = institutionRepository.findById(user.getInstitution().getId())
                    .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionDTO.getId() + " not found"));
            isAdminInInstitution(principal, institution.getId());
            institution.setDescription(institutionDTO.getDescription());
            institution.setName(institutionDTO.getName());
            institution.setLocation(institutionDTO.getLocation());
            institution.setWebsite(institutionDTO.getWebsite());
            Institution savedInstitution = institutionRepository.save(institution);

            if (savedInstitution.getId() != null) {
                return ResponseEntity.ok().body(true);
            } else {
                return ResponseEntity.badRequest().body(false);
            }
        }
        return ResponseEntity.badRequest().body(false);
    }

    @Override
    public ResponseEntity<InstitutionUsersCountDTO> countUsers(Principal principal) {
        log.info("counting users");
        User user = userRepository.findUserByEmail(principal.getName());
        if (user != null && user.getInstitution() != null) {
            Institution institution = institutionRepository.findById(user.getInstitution().getId())
                    .orElseThrow(() -> new InstitutionNotFoundException("Institution " + user.getInstitution().getId() + " not found"));
            isAdminInInstitution(principal, institution.getId());
            InstitutionUsersCountDTO institutionUsersCountDTO = new InstitutionUsersCountDTO(
                    institution.getAdmins().size(),
                    institution.getTeachers().size(),
                    institution.getStudents().size());
            log.info(String.valueOf(institutionUsersCountDTO));
            return ResponseEntity.ok().body(institutionUsersCountDTO);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @Override
    public ResponseEntity<UserListDTO> getInstitutionUsers(String institutionID, Principal principal, String role, int page, int sizePerPage) {
        log.info("role = " + role);
        log.info("page = " + page);
        log.info("sizeperpage = " + sizePerPage);

        User userr = userRepository.findUserByEmail(principal.getName());
        if (userr.getRoles().contains(Role.SUPERADMIN) && institutionID != null) {
            Institution institution = institutionRepository.findById(institutionID)
                    .orElseThrow(() -> new InstitutionNotFoundException("Institution " + userr.getInstitution().getId() + " not found"));
            return getUserListDTOResponseEntity(institution, principal, role, page, sizePerPage);
        } else if (userr.getInstitution() != null) {
            Institution institution = institutionRepository.findById(userr.getInstitution().getId())
                    .orElseThrow(() -> new InstitutionNotFoundException("Institution " + userr.getInstitution().getId() + " not found"));
            return getUserListDTOResponseEntity(institution, principal, role, page, sizePerPage);
        }

        return ResponseEntity.badRequest().body(null);
    }

    @Override
    public ResponseEntity<InstitutionDTO> getMyInstitution(Principal principal) {
        User user = userRepository.findUserByEmail(principal.getName());
        if (user.getInstitution() != null) {
            log.info("Getting institution ");
            Institution institution = institutionRepository.findById(user.getInstitution().getId())
                    .orElseThrow(() -> new InstitutionNotFoundException("Institution " + user.getInstitution().getId() + " not found"));
            return ResponseEntity
                    .ok()
                    .body(modelMapper.map(institution, InstitutionDTO.class));
        }
        return ResponseEntity.badRequest().body(null);
    }

    private ResponseEntity<UserListDTO> getUserListDTOResponseEntity(Institution institution, Principal principal, String role, int page, int sizePerPage) {

        isAdminInInstitution(principal, institution.getId());
        log.info("Getting institution Users: " + institution.getId());
        List<User> users;
        if (Objects.equals(role, "Admins")) {
            users = institution.getAdmins();
        } else if (Objects.equals(role, "Teachers")) {
            users = institution.getTeachers();
        } else {
            users = institution.getStudents();
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

    private boolean isAdminInInstitution(Principal principal, String institutionID) {
        User user = userRepository.findUserByEmail(principal.getName());
        Institution institution = institutionRepository.findById(institutionID)
                .orElseThrow(() -> new InstitutionNotFoundException("Institution " + institutionID + " not found"));
        return institution.getAdmins().contains(user) || user.getRoles().contains(Role.SUPERADMIN);
    }


}
