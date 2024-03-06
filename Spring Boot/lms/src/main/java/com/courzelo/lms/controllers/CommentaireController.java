package com.courzelo.lms.controllers;


import com.courzelo.lms.entities.Commentaire;
import com.courzelo.lms.services.CommentaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/commentaire")
@CrossOrigin(origins = "*")
public class CommentaireController {

    @Autowired
    CommentaireService commentaireService;


    @PostMapping({"/{idPost}"})
    public void saveCommentaire(@RequestBody Commentaire commentaire, @PathVariable String idPost){
        commentaireService.saveCommentaire(commentaire,idPost);
    }
    @PutMapping()
    public void updateCommentaire(@RequestBody Commentaire commentaire){
        commentaireService.updateCommentaire(commentaire);
    }
    @GetMapping("/{id}")
    public Commentaire getCommentaireByID(@PathVariable String id){
        return commentaireService.getCommentaireByID(id);
    }
    @GetMapping()
    public List<Commentaire> getCommentaires(){
        return  commentaireService.getCommentaires();
    }
    @DeleteMapping("/{id}/{idPost}")
    public String  DeleteCommentaires(@PathVariable String id,@PathVariable String idPost){
        commentaireService.deleteCommentaire(id,idPost);
        return  "delete";
    }
}
