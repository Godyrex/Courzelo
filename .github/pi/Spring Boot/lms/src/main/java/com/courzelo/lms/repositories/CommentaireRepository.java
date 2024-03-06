package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Commentaire;
import com.courzelo.lms.entities.Grades;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentaireRepository extends MongoRepository<Commentaire,String>
{
    List<Commentaire> findByIdPost(String idPost);
}
