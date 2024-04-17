package com.courzelo.lms.controllers;


import com.courzelo.lms.entities.Grades;
import com.courzelo.lms.services.GradesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grades")
@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders = "*", allowCredentials = "true")
public class GradesController {

    @Autowired
    GradesService eradesService;


    @PostMapping()
    public void saveGrades(@RequestBody Grades erades){
        eradesService.saveGrades(erades);
    }
    @PutMapping()
    public void updateGrades(@RequestBody Grades erades){
        eradesService.updateGrades(erades);
    }
    @GetMapping("/{id}")
    public Grades getGradesByID(@PathVariable String id){
        return eradesService.getGradesByID(id);
    }
    @GetMapping()
    public List<Grades> getGradess(){
        return  eradesService.getGradess();
    }
    @DeleteMapping("/{id}")
    public String  DeleteGradess(@PathVariable String id){
        eradesService.deleteGrades(id);
        return  "delete";
    }
}
