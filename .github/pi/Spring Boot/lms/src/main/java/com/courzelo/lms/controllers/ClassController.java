package com.courzelo.lms.controllers;


import com.courzelo.lms.entities.Class;
import com.courzelo.lms.entities.Program;
import com.courzelo.lms.services.ClassService;
import com.courzelo.lms.services.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/class")
@CrossOrigin(origins = "*")
public class ClassController {

    @Autowired
    ClassService classService;


    @PostMapping()
    public void saveClass(@RequestBody Class classe){
        classService.saveClass(classe);
    }
    @PutMapping()
    public void updateClass(@RequestBody Class classe){
        classService.updateClass(classe);
    }
    @GetMapping("/{classId}")
    public Class getClassByID(@PathVariable String classId){
        return classService.getClassByID(classId);
    }
    @GetMapping()
    public List<Class> getClasss(){
        return  classService.getClasss();
    }
    @DeleteMapping("/{id}")
    public String  DeleteClasss(@PathVariable String id){
        classService.deleteClass(id);
        return  "delete";
    }
}
