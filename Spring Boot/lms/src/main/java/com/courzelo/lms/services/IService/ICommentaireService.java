package com.courzelo.lms.services.IService;


import com.courzelo.lms.entities.Commentaire;

import java.util.List;

public interface ICommentaireService {
    void saveCommentaire(Commentaire commentaire, String idPost);
    void deleteCommentaire(String commentaire,String idPost);
    void updateCommentaire (Commentaire commentaire);
    Commentaire getCommentaireByID(String commentaireID);
    List<Commentaire> getCommentaires();
}
