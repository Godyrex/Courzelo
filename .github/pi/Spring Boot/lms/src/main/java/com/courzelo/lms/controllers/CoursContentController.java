
package com.courzelo.lms.controllers;

import com.courzelo.lms.entities.Course;
import com.courzelo.lms.entities.CourseContent;
import com.courzelo.lms.services.CoursContentService;
import com.courzelo.lms.services.CoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coursContet")
@CrossOrigin(origins = "*")
public class CoursContentController {

    @Autowired
    CoursContentService coursContentService;


    @PostMapping()
    public void saveCourse(@RequestBody CourseContent cours){
        coursContentService.saveCoursContent(cours);
    }
    @PutMapping()
    public void updateCourse(@RequestBody CourseContent cours){
        coursContentService.updateCoursContent(cours);
    }
    @GetMapping("/{coursId}")
    public List<CourseContent> getCourseByID(@PathVariable String coursId){
        return coursContentService.getCoursContentByID(coursId);
    }
    @GetMapping()
    public List<CourseContent> getCourses(){
        return  coursContentService.getCoursContents();
    }

    @DeleteMapping("/{id}")
    public String  DeleteCourse(@PathVariable String id){
        coursContentService.deleteCoursContent(id)
        ;
        return  "delete";
    }
}