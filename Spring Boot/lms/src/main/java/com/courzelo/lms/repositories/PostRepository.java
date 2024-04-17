package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends MongoRepository<Post,String>
{
}
