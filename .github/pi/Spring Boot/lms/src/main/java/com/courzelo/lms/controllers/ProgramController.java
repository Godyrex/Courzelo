package com.courzelo.lms.controllers;


import com.courzelo.lms.entities.Program;
import com.courzelo.lms.services.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/progam")
@CrossOrigin(origins = "*")
public class ProgramController {

    @Autowired
    ProgramService programService;


    @PostMapping()
    public void saveProg(@RequestBody Program prog){
        programService.saveProgram(prog);
    }
    @PutMapping()
    public void updateProg(@RequestBody Program prog){
        programService.updateProgram(prog);
    }
    @GetMapping("/{progID}")
    public Program getProgByID(@PathVariable String progID){
        return programService.getProgramByID(progID);
    }
    @GetMapping()
    public List<Program> getProgs(){
        return  programService.getPrograms();
    }
    @DeleteMapping("/{id}")
    public String  DeleteProg(@PathVariable String id){
        programService.deleteProgram(id);
        return  "delete";
    }
}
