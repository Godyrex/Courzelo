package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    User findUserByVerificationCode(String code);
    User findUserByEmail(String email);
    Boolean existsByEmail(String email);
}
