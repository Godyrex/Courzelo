package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.schedule.ModulDTO;
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
    public ResponseEntity<?> createModul(@RequestBody @Valid final ModulDTO modulDTO) {
        if (modulDTO.getAClass() == null) {
            return new ResponseEntity<>("ClassDTO is null", HttpStatus.BAD_REQUEST);
        }
        final Modul createdModul = modulService.createModul(modulDTO);
        return new ResponseEntity<>(createdModul, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateModul(@PathVariable(name = "id") final String id,
                                              @RequestBody @Valid final ModulDTO modulDTO) {
        modulService.update(id, modulDTO);
        return ResponseEntity.ok('"' + id + '"');
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteModul(@PathVariable(name = "id") final String id) {
        modulService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
