package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.DepartementDTO;

import com.courzelo.lms.services.DepartementService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/departements", produces = MediaType.APPLICATION_JSON_VALUE)
public class DepartementController {
    private final DepartementService departementService;

    public DepartementController(final DepartementService departementService) {
        this.departementService = departementService;
    }

    @GetMapping
    public ResponseEntity<List<DepartementDTO>> getAllDepartements() {
        return ResponseEntity.ok(departementService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartementDTO> getDepartement(@PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(departementService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<String> createDepartement(
            @RequestBody @Valid final DepartementDTO departementDTO) {
        final String createdId = departementService.create(departementDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateDepartement(@PathVariable(name = "id") final String id,
                                                  @RequestBody @Valid final DepartementDTO departementDTO) {
        departementService.update(id, departementDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteDepartement(@PathVariable(name = "id") final String id) {
        departementService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
