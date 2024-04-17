package com.courzelo.lms.controllers;


import com.courzelo.lms.entities.Post;
import com.courzelo.lms.entities.user.User;
import com.courzelo.lms.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    PostService postService;


    @PostMapping()
    public Post savePost(@RequestBody Post p){
        return postService.savePost(p);
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

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable String id){
        return postService.findUserById(id);
    }

    @DeleteMapping("/{id}")
    public String  DeletePost(@PathVariable String id){
        postService.deletePost(id);
        return  "delete";
    }
    @PutMapping("/img/{postId}")
    public void updatePost(@PathVariable String postId, @RequestParam("img") MultipartFile img) throws IOException {
        postService.saveImg(img,postId);
    }
}
