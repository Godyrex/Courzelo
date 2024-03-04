package com.courzelo.lms.controllers;

import com.courzelo.lms.entities.Reclamation;
import com.courzelo.lms.services.IReclamationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/reclamation")
@RestController
@RequiredArgsConstructor
public class ReclamationController {
    private final IReclamationService IReclamationService;

    @PostMapping("/add")
    public void addReclamation(@RequestBody Reclamation reclamation) {
         IReclamationService.saveReclamation(reclamation);
    }

    @GetMapping("/all")
    public List<Reclamation> getReclamations() {
        return IReclamationService.getAllReclamation();
    }

    @DeleteMapping("/delete/{ID}")
    public void deleteClass(@PathVariable String ID) {
         IReclamationService.deleteReclamation(ID);
    }

    @PostMapping("/update")
    public void updateClass(@RequestBody Reclamation reclamation) {
         IReclamationService.updateReclamation(reclamation);
    }

}
