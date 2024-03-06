package com.courzelo.lms.controllers;


import com.courzelo.lms.entities.Course;
import com.courzelo.lms.services.CoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cours")
@CrossOrigin(origins = "*")
public class CoursController {

    @Autowired
    CoursService coursService;


    @PostMapping()
    public void saveCourse(@RequestBody Course cours){
        coursService.saveCourse(cours);
    }
    @PutMapping()
    public void updateCourse(@RequestBody Course cours){
        coursService.updateCourse(cours);
    }
    @GetMapping("/{coursId}")
    public Course getCourseByID(@PathVariable String coursId){
        return coursService.getCourseByID(coursId);
    }
    @GetMapping()
    public List<Course> getCourses(){
        return  coursService.getCourses();
    }

    @DeleteMapping("/{id}")
    public String  DeleteCourse(String id){
        coursService.deleteCourse(id);
        return  "delete";
    }
}
