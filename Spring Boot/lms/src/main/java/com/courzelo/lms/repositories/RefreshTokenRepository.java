package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.RefreshToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends MongoRepository<RefreshToken,String> {
    RefreshToken findByToken(String token);
}
