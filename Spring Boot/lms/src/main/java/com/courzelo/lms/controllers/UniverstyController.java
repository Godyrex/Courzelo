package com.courzelo.lms.controllers;


import com.courzelo.lms.entities.Program;
import com.courzelo.lms.entities.Universite;
import com.courzelo.lms.repositories.ProgamRepository;
import com.courzelo.lms.services.ProgramService;
import com.courzelo.lms.services.UniversiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/university")
@CrossOrigin(origins = "*")
public class UniverstyController {

    @Autowired
    UniversiteService universiteService;
    @Autowired
    private ProgamRepository progamRepository;


    @PostMapping()
    public void saveUniversity(@RequestBody Universite prog){
        universiteService.saveUniversite(prog);
    }
    @PutMapping()
    public void updateUniversity(@RequestBody Universite prog){
        universiteService.updateUniversite(prog);
    }
    @GetMapping("/{unvirsty}")
    public Universite getUniversityByID(@PathVariable String unvirsty){
        return universiteService.getUniversiteByID(unvirsty);
    }
    @GetMapping()
    public List<Universite> getUniversity(){
        return  universiteService.getUniversite();
    }

    @DeleteMapping("/{id}")
    public String  DeleteProg(@PathVariable String id){
        universiteService.deleteUniversite(id);
        return  "delete";
    }
}
