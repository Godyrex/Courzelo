package com.courzelo.lms.controllers;


import com.courzelo.lms.entities.Exam;
import com.courzelo.lms.services.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exam")
@CrossOrigin(origins = "*")
public class ExamController {

    @Autowired
    ExamService examService;


    @PostMapping()
    public void saveExam(@RequestBody Exam exam){
        System.out.println("hello"+exam);
        examService.saveExam(exam);
    }
    @PutMapping()
    public void updateExam(@RequestBody Exam exam){
        examService.updateExam(exam);
    }
    @GetMapping("/{id}")
    public Exam getExamByID(@PathVariable String id){
        return examService.getExamByID(id);
    }
    @GetMapping()
    public List<Exam> getExams(){
        return  examService.getExams();
    }
    @DeleteMapping("/{id}")
    public String  DeleteExams(@PathVariable String id){
        examService.deleteExam(id);
        return  "delete";
    }
}
