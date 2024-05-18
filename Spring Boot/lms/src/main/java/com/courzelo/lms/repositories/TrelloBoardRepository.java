package com.courzelo.lms.repositories;

import com.courzelo.lms.entities.reclamation.ReclamationType;
import com.courzelo.lms.entities.reclamation.TrelloBoard;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TrelloBoardRepository extends MongoRepository<TrelloBoard,String> {
    TrelloBoard findByType(ReclamationType r);

}
