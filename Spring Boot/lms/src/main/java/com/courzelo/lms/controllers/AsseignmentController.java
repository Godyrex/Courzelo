package com.courzelo.lms.controllers;

import com.courzelo.lms.entities.Assignment;
import com.courzelo.lms.services.AssignmentService;
import com.courzelo.lms.services.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/asseignment")
@CrossOrigin(origins = "*")
public class AsseignmentController {

    @Autowired
    AssignmentService assignmentService;


    @PostMapping()
    public void saveAssignment(@RequestBody Assignment assignment){
        assignmentService.saveAssignment(assignment);
    }
    @PutMapping()
    public void updateAssignment(@RequestBody Assignment question){
        assignmentService.updateAsseignment(question);
    }
    @GetMapping("/{id}")
    public Assignment getAssignmentByID(@PathVariable String id){
        return assignmentService.getAsseignmentByID(id);
    }
    @GetMapping()
    public List<Assignment> getAssignments(){
        return  assignmentService.getAsseignments();
    }
    @DeleteMapping("/{id}")
    public String  DeleteAssignments(@PathVariable String id){
        assignmentService.deleteAsseignment(id);
        return  "delete";
    }

    @GetMapping("/Bycourse/{id}")
    public List<Assignment>  getAssignmentByCours(@PathVariable String id){
        return assignmentService.getAsseignmentByIDCours(id);
    }
}
