package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.Commentaire;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentaireRepository extends MongoRepository<Commentaire,String>
{
}
