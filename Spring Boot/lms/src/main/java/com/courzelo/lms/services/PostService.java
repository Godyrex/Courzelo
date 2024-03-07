package com.courzelo.lms.services;

import com.courzelo.lms.entities.Post;
import com.courzelo.lms.repositories.PostRepository;
import com.courzelo.lms.services.IService.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService implements IPostService {

    @Autowired
    PostRepository postRepository ;
    @Override
    public Post savePost(Post p) {
        return postRepository.save(p);
    }

    @Override
    public void deletePost(String p) {
        postRepository.deleteById(p);
    }

    @Override
    public Post updatePost(Post p) {
        return postRepository.save(p);
    }

    @Override
    public Post getPostByID(String classID) {
        return postRepository.findById(classID).get();
    }

    @Override
    public List<Post> getPost() {
        return postRepository.findAll();
    }



}