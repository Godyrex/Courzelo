package com.courzelo.lms.repositories;

import com.courzelo.lms.dto.user.UserDTO;
import com.courzelo.lms.entities.institution.Class;
import com.courzelo.lms.entities.institution.Institution;
import com.courzelo.lms.entities.schedule.Teacher;
import com.courzelo.lms.entities.user.Role;
import com.courzelo.lms.entities.user.User;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findUserById(String id);
    List<User> findByStclass(Class classe);
    List<User> findByInstitution(Institution institution);
    User findUserByEmail(String email);
    Boolean existsByEmail(String email);
    List<User> findUsersByRoles(List<Role> roles);
    List<User> findByRolesIs(@NotNull List<Role> roles);
    List<User> findUsersByIdAndRolesIsAndName(String id, @NotNull List<Role> roles, @NotNull String name);
    User findUserByIdAndRolesIsAndName(String id, @NotNull List<Role> roles, @NotNull String name);

}
