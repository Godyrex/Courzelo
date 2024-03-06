package com.courzelo.lms.services;


import com.courzelo.lms.entities.Commentaire;
import com.courzelo.lms.repositories.CommentaireRepository;
import com.courzelo.lms.services.IService.ICommentaireService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentaireService implements ICommentaireService {
    private  final CommentaireRepository commentaireRepository;
    @Override
    public void saveCommentaire(Commentaire commentaire) {
        commentaireRepository.save(commentaire);
    }

    @Override
    public void deleteCommentaire(String commentaireID) {
        commentaireRepository.deleteById(commentaireID);
    }

    @Override
    public void updateCommentaire(Commentaire commentaire) {
        commentaireRepository.save(commentaire);
    }

    @Override
    public Commentaire getCommentaireByID(String commentaireID) {
        return commentaireRepository.findById(commentaireID).orElseThrow(()-> new RuntimeException("Commentaire Not Found!"));
    }

    @Override
    public List<Commentaire> getCommentaires() {
        return commentaireRepository.findAll();
    }
}
