package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.institution.Class;
import com.courzelo.lms.entities.institution.Institution;
import com.courzelo.lms.entities.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findUserByVerificationCode(int code);

    User findUserById(String id);

    List<User> findByStclass(Class classe);

    List<User> findByInstitution(Institution institution);

    User findUserByEmailVerificationCode(String code);

    User findUserByEmail(String email);

    Boolean existsByEmail(String email);
}
