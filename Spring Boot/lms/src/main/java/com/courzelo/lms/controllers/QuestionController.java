package com.courzelo.lms.controllers;


import com.courzelo.lms.entities.Question;
import com.courzelo.lms.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
@CrossOrigin(origins = "*")
public class QuestionController {

    @Autowired
    QuestionService questionService;


    @PostMapping()
    public void saveQuestion(@RequestBody Question question){
        questionService.saveQuestion(question);
    }
    @PutMapping()
    public void updateQuestion(@RequestBody Question question){
        questionService.updateQuestion(question);
    }
    @GetMapping("/{id}")
    public Question getQuestionByID(@PathVariable String id){
        return questionService.getQuestionByID(id);
    }
    @GetMapping()
    public List<Question> getQuestions(){
        return  questionService.getQuestions();
    }
    @DeleteMapping("/{id}")
    public String  DeleteQuestions(@PathVariable String id){
        questionService.deleteQuestion(id);
        return  "delete";
    }
}
