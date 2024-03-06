package com.courzelo.lms.services;


import com.courzelo.lms.entities.Commentaire;
import com.courzelo.lms.entities.Post;
import com.courzelo.lms.repositories.CommentaireRepository;
import com.courzelo.lms.services.IService.ICommentaireService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentaireService implements ICommentaireService {
    @Autowired
    private  final CommentaireRepository commentaireRepository;
    @Autowired
    private PostService postService;

    @Override
    public void saveCommentaire(Commentaire commentaire, String idPost) {
        List<Commentaire> comments ;
        Commentaire c =commentaireRepository.save(commentaire);
        Post p =postService.getPostByID(idPost);
        if (p.getComments() == null) {
            comments = new ArrayList<>();
        }
        else{
            comments = p.getComments();
        }
        comments.add(c);
        p.setComments(comments);
        postService.savePost(p);

    }

    @Override
    public void deleteCommentaire(String commentaireID,String idPost) {
        Post p =postService.getPostByID(idPost);
        Commentaire c =getCommentaireByID(commentaireID);
        System.out.println("remove 123"+c.toString());

        System.out.println("remove"+p.getComments().remove(c));

        p.setComments(p.getComments());
        postService.savePost(p);
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
