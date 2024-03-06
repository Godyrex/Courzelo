package com.courzelo.lms.controllers;


import com.courzelo.lms.entities.Class;
import com.courzelo.lms.entities.Post;
import com.courzelo.lms.services.ClassService;
import com.courzelo.lms.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    PostService postService;


    @PostMapping()
    public void savePost(@RequestBody Post p){
        postService.savePost(p);
    }
    @PutMapping()
    public void updatePost(@RequestBody Post p){
        postService.updatePost(p);
    }
    @GetMapping("/{postId}")
    public Post getPostByID(@PathVariable String postId){
        return postService.getPostByID(postId);
    }
    @GetMapping()
    public List<Post> getPost(){

        return  postService.getPost();
    }

    @DeleteMapping("/{id}")
    public String  DeletePost(@PathVariable String id){
        postService.deletePost(id);
        return  "delete";
    }
}
