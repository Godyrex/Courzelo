package com.courzelo.lms.controllers;

import com.courzelo.lms.entities.Student;
import com.courzelo.lms.services.IStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders ="*" )
@RequestMapping("/api/v1/student")
@RestController
@RequiredArgsConstructor
public class StudentController {
    private final IStudentService studentService;
    @PostMapping()
    public void saveStudent(@RequestBody Student student){
        studentService.saveStudent(student);
    }
    @PutMapping()
    public void updateStudent(@RequestBody Student student){
        studentService.updateStudent(student);
    }
    @GetMapping("/{studentID}")
    public Student getStudentByID(@PathVariable String studentID){
        return studentService.getStudentByID(studentID);
    }
    @GetMapping()
    public List<Student> getStudents(){
        return  studentService.getStudents();
    }
}
