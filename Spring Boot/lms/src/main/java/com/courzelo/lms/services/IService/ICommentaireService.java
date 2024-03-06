package com.courzelo.lms.services.IService;


import com.courzelo.lms.entities.Commentaire;

import java.util.List;

public interface ICommentaireService {
    void saveCommentaire(Commentaire commentaire);
    void deleteCommentaire(String commentaire);
    void updateCommentaire (Commentaire commentaire);
    Commentaire getCommentaireByID(String commentaireID);
    List<Commentaire> getCommentaires();
}
