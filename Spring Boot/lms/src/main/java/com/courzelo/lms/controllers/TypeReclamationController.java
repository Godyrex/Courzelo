package com.courzelo.lms.controllers;

import com.courzelo.lms.entities.TypeReclamation;
import com.courzelo.lms.services.ITypeReclamationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/typereclamation")
@RestController
@RequiredArgsConstructor
public class TypeReclamationController {
    private final ITypeReclamationService ITypeReclamationService;

    @PostMapping("/add")
    public void addTypeReclamation(@RequestBody TypeReclamation type) {
        ITypeReclamationService.addTypeReclamation(type);
    }

    @GetMapping("/all")
    public List<TypeReclamation> getReclamations() {
        return ITypeReclamationService.getTypeReclamations();
    }

    @DeleteMapping("/delete/{ID}")
    public void deleteClass(@PathVariable String ID) {
        ITypeReclamationService.getTypeReclamation(ID);
    }

    @PostMapping("/update")
    public void updateClass(@RequestBody TypeReclamation type) {
        ITypeReclamationService.updateTypeReclamation(type);
    }
}
