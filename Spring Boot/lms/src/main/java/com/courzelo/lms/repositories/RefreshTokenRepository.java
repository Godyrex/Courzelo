package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.RefreshToken;
import com.courzelo.lms.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RefreshTokenRepository extends MongoRepository<RefreshToken,String> {
    RefreshToken findByToken(String token);
    List<RefreshToken> findAllByUser(User user);
}
