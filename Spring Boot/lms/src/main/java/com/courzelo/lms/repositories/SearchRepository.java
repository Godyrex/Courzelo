package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.user.Search;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SearchRepository extends MongoRepository<Search, String> {

    @Query("{ 'query' : { $regex: ?0 } }")
    List<Search> findByQueryRegex(String regex);
    Search findByQuery(String query);
}
