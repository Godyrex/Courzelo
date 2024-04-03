package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.program.ClassDTO;
import com.courzelo.lms.dto.schedule.ModulDTO;
import com.courzelo.lms.entities.institution.Class;
import com.courzelo.lms.entities.schedule.Modul;
import com.courzelo.lms.services.schedule.ModulService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping(value = "/api/Modules", produces = MediaType.APPLICATION_JSON_VALUE)
public class ModulController {

    private final ModulService modulService;

    public ModulController(final ModulService modulService) {
        this.modulService = modulService;
    }

    @GetMapping
    public ResponseEntity<List<ModulDTO>> getAllModuls() {
        return ResponseEntity.ok(modulService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModulDTO> getModul(@PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(modulService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<ModulDTO> createModul(@RequestBody @Valid final ModulDTO modulDTO) {
        if (modulDTO.getAClass() == null) {
            Class aClass = new Class();
            // Set default values for the ClassDTO object if needed
            aClass.setName("Default Class Name");
            modulDTO.setAClass(aClass);
        }
        final ModulDTO createdModul = modulService.createModul(modulDTO);
        return new ResponseEntity<>(createdModul, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateModul(@PathVariable(name = "id") final String id,
                                              @RequestBody @Valid final ModulDTO modulDTO) {
        ModulDTO existingModul = modulService.get(id);
        if (existingModul == null) {
            return new ResponseEntity<>("Modul not found for ID: " + id, HttpStatus.NOT_FOUND);
        }
        modulService.update(id, modulDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteModul(@PathVariable(name = "id") final String id) {
        modulService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
